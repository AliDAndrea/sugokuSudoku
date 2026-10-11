// Run with node scripts/generate-board-geometry.mjs when the board artwork changes.
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const boards = {}
for (const size of [6, 9]) {
  const { data, info } = await sharp(fileURLToPath(new URL(`../src/figmages/Board${size}x${size}.png`, import.meta.url))).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const seen = new Uint8Array(width * height)
  const regions = []
  const interior = (i) => data[i * 4] > 130 && data[i * 4 + 3] > 200
  for (let seed = 0; seed < seen.length; seed++) {
    if (seen[seed] || !interior(seed)) continue
    const pixels = [seed]
    seen[seed] = 1
    for (let next = 0; next < pixels.length; next++) {
      const i = pixels[next]
      const x = i % width
      const y = Math.floor(i / width)
      for (const neighbor of [x > 0 ? i - 1 : -1, x < width - 1 ? i + 1 : -1, y > 0 ? i - width : -1, y < height - 1 ? i + width : -1]) {
        if (neighbor < 0 || seen[neighbor] || !interior(neighbor)) continue
        seen[neighbor] = 1
        pixels.push(neighbor)
      }
    }
    if (pixels.length < 400 || pixels.length > 5000) continue
    const xs = pixels.map((i) => i % width)
    const ys = pixels.map((i) => Math.floor(i / width))
    const x = Math.min(...xs), y = Math.min(...ys)
    const w = Math.max(...xs) - x + 1, h = Math.max(...ys) - y + 1
    if (w > 65 || h > 65 || w < 20 || h < 20) continue
    // One continuous silhouette avoids antialiasing seams between scan lines.
    const rows = Array.from({ length: h }, () => [])
    for (const i of pixels) rows[Math.floor(i / width) - y].push(i % width - x)
    const left = rows.flatMap((row, offset) => [[Math.min(...row), offset], [Math.min(...row), offset + 1]])
    const right = rows.flatMap((row, offset) => [[Math.max(...row) + 1, offset], [Math.max(...row) + 1, offset + 1]]).reverse()
    const outline = [...left, ...right]
    const path = outline.map(([px, py], index) => `${index === 0 ? 'M' : 'L'}${px} ${py}`).join('') + 'Z'
    regions.push({ x, y, width: w, height: h, path })
  }
  if (regions.length !== size * size) throw new Error(`Expected ${size * size} interiors, found ${regions.length}`)
  regions.sort((a, b) => a.y - b.y)
  const cells = []
  for (let row = 0; row < size; row++) cells.push(...regions.slice(row * size, (row + 1) * size).sort((a, b) => a.x - b.x))
  boards[size] = { width, height, cells }
}
writeFileSync(new URL('../src/boardGeometry.js', import.meta.url), `// Generated from board artwork by scripts/generate-board-geometry.mjs.\nexport const boardGeometry = ${JSON.stringify(boards)}\n`)
console.log('Generated 36 and 81 tile interiors.')
