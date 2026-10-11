export function formatTime(milliseconds) {
  const seconds = Math.max(0, Math.floor((milliseconds || 0) / 1000))
  const pad = (value) => String(value).padStart(2, '0')
  const hours = Math.floor(seconds / 3600)
  return `${hours ? `${pad(hours)}:` : ''}${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`
}
