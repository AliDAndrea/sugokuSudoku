alter table public.profiles
  add column total_xp integer not null default 0 check (total_xp >= 0);

create or replace function public.prevent_client_economy_changes()
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
    or new.total_xp is distinct from old.total_xp
    or new.puzzles_completed is distinct from old.puzzles_completed
  ) then
    raise exception 'Economy and level changes must use trusted server operations.';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

create table public.puzzle_completion_rewards (
  user_id uuid not null references public.profiles(id) on delete cascade,
  board_id text not null check (length(board_id) between 1 and 100),
  primary key (user_id, board_id)
);
alter table public.puzzle_completion_rewards enable row level security;

create function public.reward_puzzle_completion(p_board_id text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  player_id uuid := auth.uid();
begin
  if player_id is null then
    raise exception 'Sign in to claim completion rewards.';
  end if;
  insert into public.puzzle_completion_rewards(user_id, board_id)
  values (player_id, p_board_id)
  on conflict do nothing;
  if found then
    update public.profiles
    set total_xp = total_xp + 5, puzzles_completed = puzzles_completed + 1
    where id = player_id;
  end if;
end;
$$;
revoke all on function public.reward_puzzle_completion(text) from public, anon;
grant execute on function public.reward_puzzle_completion(text) to authenticated;
