import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const root = fileURLToPath(new URL('../', import.meta.url))
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' })
try {
  const { ChaosBoardArtwork } = await server.ssrLoadModule('/src/ChaosBoardArtwork.jsx')
  const { ChaosBorders } = await server.ssrLoadModule('/src/ChaosBorders.jsx')
  const { generateChaos } = await server.ssrLoadModule('/src/chaosSudoku.js')
  let seed = 29
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
  const sections = []
  for (const size of [9, 6]) {
    const { regions } = generateChaos(size, 'easy', { random })
    const artwork = await readFile(new URL(`../src/figmages/Board${size}x${size}.png`, import.meta.url))
    const image = `<img alt="Original ${size} by ${size} board artwork" src="data:image/png;base64,${artwork.toString('base64')}">`
    const cards = [`<figure><figcaption>Original artwork</figcaption><div class="board">${image}</div></figure>`]
    for (const colored of [false, true]) {
      const sketch = renderToStaticMarkup(createElement(ChaosBoardArtwork, { size, regions, colored }), { identifierPrefix: `paper-${size}-${colored}-` }).replace(/href="[^"]*"/g, `href="data:image/png;base64,${artwork.toString('base64')}"`)
      const borders = renderToStaticMarkup(createElement(ChaosBorders, { size, regions, sketch: true }), { identifierPrefix: `border-${size}-${colored}-` })
      cards.push(`<figure><figcaption>${colored ? 'Chaos with region colors' : 'Chaos in the original paper colors'}</figcaption><div class="board">${image}${sketch}${borders}</div></figure>`)
    }
    sections.push(`<section><h2>${size} × ${size}</h2><div class="comparison">${cards.join('')}</div></section>`)
  }
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chaos board artwork experiment</title><style>body{margin:0;padding:32px;background:#f3e9dd;color:#30251e;font:16px system-ui}h1{font-size:26px}h2{margin-top:32px}.comparison{display:flex;gap:24px;flex-wrap:wrap}figure{margin:0}figcaption{margin-bottom:12px}.board{position:relative;width:390px;height:400px}.board>img{position:absolute;width:100%;height:400px}svg{overflow:visible}</style><h1>Chaos board artwork experiment</h1><p>The same generated regions, shown with the original paper palette and distinct region colors.</p>${sections.join('')}</html>`
  await mkdir(new URL('../previews/', import.meta.url), { recursive: true })
  await writeFile(new URL('../previews/chaos-board-artwork.html', import.meta.url), html)
  console.log('Created previews/chaos-board-artwork.html')
} finally {
  await server.close()
}
