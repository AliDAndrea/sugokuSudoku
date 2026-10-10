// Shared level-up requirement. This does not award XP or change a player's level.
export function requiredXp(level) {
  return Math.floor((100 / 1.2) * (1.2 ** level))
}
