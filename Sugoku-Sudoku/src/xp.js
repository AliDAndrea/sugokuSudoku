// Shared level-up requirement.
export function requiredXp(level) {
  return Math.floor((100 / 1.2) * (1.2 ** level))
}

export function levelProgressPercent(level = 1, totalXp = 0) {
  const requirement = requiredXp(level)
  const xp = Number.isFinite(totalXp) ? Math.max(0, totalXp) : 0
  const progress = requirement > 0 ? Math.min(xp / requirement, 0.99) : 0
  return Math.floor(progress * 10) * 10
}

export function applyLevelUps(level = 1, totalXp = 0) {
  while (totalXp >= requiredXp(level)) {
    totalXp -= requiredXp(level)
    level += 1
  }
  return { level, totalXp }
}
