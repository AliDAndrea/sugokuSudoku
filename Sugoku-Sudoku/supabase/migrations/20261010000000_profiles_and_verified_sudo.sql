create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  email text not null,
  profile_image text,
  level integer not null default 1 check (level >= 1),
  daily_streak integer not null default 0 check (daily_streak >= 0),
  puzzles_completed integer not null default 0 check (puzzles_completed >= 0),
  fastest_time integer not null default 0 check (fastest_time >= 0),
  sudo integer not null default 0 check (sudo >= 0),
  hints integer not null default 0 check (hints >= 0),
  selected_pen text not null default 'Pencil Pen',
  owned_pens text[] not null default array['Pencil Pen']::text[],
  owned_packs text[] not null default array['pack-E_1']::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_username_lower_unique on public.profiles (lower(username));

create table public.verified_sudo_purchases (
  event_id text primary key,
  store_transaction_id text not null unique,
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id text not null,
  sudo_amount integer not null check (sudo_amount > 0),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.verified_sudo_purchases enable row level security;

create policy "Users can read their profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "Users can update their profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

grant select, update on public.profiles to authenticated;

create function public.prevent_client_economy_changes()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  if current_user = 'authenticated' and (
    new.sudo is distinct from old.sudo
    or new.hints is distinct from old.hints
    or new.email is distinct from old.email
    or new.owned_pens is distinct from old.owned_pens
    or new.owned_packs is distinct from old.owned_packs
    or new.level is distinct from old.level
  ) then
    raise exception 'Economy and level changes must use trusted server operations.';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_prevent_client_economy_changes
  before update on public.profiles
  for each row execute function public.prevent_client_economy_changes();

create function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  requested_username text;
begin
  requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
  if requested_username is null then
    requested_username := split_part(new.email, '@', 1);
  end if;

  insert into public.profiles (id, username, email)
  values (new.id, requested_username, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_auth_user();

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function public.create_profile_for_auth_user();

create function public.purchase_with_sudo(p_kind text, p_item_id text)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_user_id uuid := auth.uid();
  current_profile public.profiles%rowtype;
  item_price integer;
  required_level integer := 0;
  hint_amount integer := 0;
  new_balance integer;
begin
  if current_user_id is null then
    raise exception 'Sign in to use Sudo.';
  end if;

  select * into current_profile
  from public.profiles
  where id = current_user_id
  for update;

  if not found then
    raise exception 'Profile not found.';
  end if;

  if p_kind = 'pen' then
    item_price := case p_item_id
      when 'Multi Pen' then 100
      when 'Crayon Pen' then 50
      when 'Brush Pen' then 75
      when 'Cheap Pen' then 25
      when 'Ink Pen' then 125
      when 'Marker Pen' then 100
      when 'Mechanical Pen' then 150
      when 'Pen Pen' then 50
      when 'Pencil Pen' then 75
      when 'Quill Pen' then 200
      when 'Stylus Pen' then 175
      when 'Yatate Pen' then 225
      else null
    end;
    if item_price is null then
      raise exception 'Unknown pen.';
    end if;
    if p_item_id = any(current_profile.owned_pens) then
      return current_profile.sudo;
    end if;
    if current_profile.sudo < item_price then
      raise exception 'Not enough Sudo.';
    end if;

    update public.profiles
    set sudo = sudo - item_price,
        owned_pens = array_append(owned_pens, p_item_id),
        selected_pen = p_item_id
    where id = current_user_id
    returning sudo into new_balance;
  elsif p_kind = 'pack' then
    item_price := case p_item_id
      when 'pack-E_1' then 100 when 'pack-E_2' then 110 when 'pack-E_3' then 120
      when 'pack-N_1' then 200 when 'pack-N_2' then 220 when 'pack-N_3' then 240
      when 'pack-H_1' then 150 when 'pack-H_2' then 160 when 'pack-H_3' then 180
      when 'pack-EX_1' then 300 when 'pack-EX_2' then 320 when 'pack-EX_3' then 350
      when 'pack-I_1' then 500 when 'pack-I_2' then 525 when 'pack-I_3' then 550
      else null
    end;
    required_level := case
      when p_item_id like 'pack-N_%' then 5
      when p_item_id like 'pack-H_%' then 10
      when p_item_id like 'pack-EX_%' then 20
      when p_item_id like 'pack-I_%' then 40
      else 0
    end;
    if item_price is null then
      raise exception 'Unknown pack.';
    end if;
    if p_item_id = any(current_profile.owned_packs) then
      return current_profile.sudo;
    end if;
    if current_profile.level < required_level then
      raise exception 'The required level for this pack has not been reached.';
    end if;
    if current_profile.sudo < item_price then
      raise exception 'Not enough Sudo.';
    end if;

    update public.profiles
    set sudo = sudo - item_price,
        owned_packs = array_append(owned_packs, p_item_id)
    where id = current_user_id
    returning sudo into new_balance;
  elsif p_kind = 'hint' then
    item_price := case p_item_id
      when 'hint-1' then 75
      when 'hint-5' then 375
      when 'hint-10' then 750
      else null
    end;
    hint_amount := case p_item_id
      when 'hint-1' then 1
      when 'hint-5' then 5
      when 'hint-10' then 10
      else 0
    end;
    if item_price is null then
      raise exception 'Unknown hint offer.';
    end if;
    if current_profile.sudo < item_price then
      raise exception 'Not enough Sudo.';
    end if;

    update public.profiles
    set sudo = sudo - item_price,
        hints = hints + hint_amount
    where id = current_user_id
    returning sudo into new_balance;
  else
    raise exception 'Unknown Sudo purchase type.';
  end if;

  return new_balance;
end;
$$;

revoke all on function public.purchase_with_sudo(text, text) from public, anon;
grant execute on function public.purchase_with_sudo(text, text) to authenticated;

create function public.credit_verified_sudo(
  p_app_user_id uuid,
  p_product_id text,
  p_event_id text,
  p_transaction_id text
)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  amount_to_credit integer;
  current_balance integer;
  inserted_event_id text;
begin
  amount_to_credit := case p_product_id
    when 'sugoku_sudo_100' then 100
    when 'sugoku_sudo_500' then 500
    when 'sugoku_sudo_1000' then 1000
    when 'sugoku_sudo_2500' then 2500
    when 'sugoku_sudo_10000' then 10000
    else null
  end;
  if amount_to_credit is null then
    raise exception 'Unrecognized Sudo product.';
  end if;

  insert into public.verified_sudo_purchases (event_id, store_transaction_id, user_id, product_id, sudo_amount)
  values (p_event_id, p_transaction_id, p_app_user_id, p_product_id, amount_to_credit)
  on conflict do nothing
  returning event_id into inserted_event_id;

  if inserted_event_id is null then
    select sudo into current_balance from public.profiles where id = p_app_user_id;
    if not found then
      raise exception 'Profile not found.';
    end if;
    return current_balance;
  end if;

  update public.profiles
  set sudo = sudo + amount_to_credit
  where id = p_app_user_id
  returning sudo into current_balance;
  if not found then
    raise exception 'Profile not found.';
  end if;

  return current_balance;
end;
$$;

revoke all on function public.credit_verified_sudo(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.credit_verified_sudo(uuid, text, text, text) to service_role;
