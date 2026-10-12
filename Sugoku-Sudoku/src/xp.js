// Shared level-up requirement.
export function requiredXp(level) {
  return Math.floor((100 / 1.2) * (1.2 ** level))
}

export function applyLevelUps(level = 1, totalXp = 0) {
  while (totalXp >= requiredXp(level)) {
    totalXp -= requiredXp(level)
    level += 1
  }
  return { level, totalXp }
}
