drop function public.reward_puzzle_completion(text);

create function public.reward_puzzle_completion(p_board_id text, p_completion_seconds integer default null)
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
  if p_completion_seconds is not null and p_completion_seconds < 1 then
    raise exception 'Invalid completion time.';
  end if;
  insert into public.puzzle_completion_rewards(user_id, board_id)
  values (player_id, p_board_id)
  on conflict do nothing;
  if found then
    update public.profiles
    set total_xp = total_xp + 5,
        puzzles_completed = puzzles_completed + 1,
        fastest_time = case
          when p_completion_seconds is not null and (fastest_time = 0 or p_completion_seconds < fastest_time)
          then p_completion_seconds else fastest_time end
    where id = player_id;
  end if;
end;
$$;
revoke all on function public.reward_puzzle_completion(text, integer) from public, anon;
grant execute on function public.reward_puzzle_completion(text, integer) to authenticated;
