import { generateChaos } from './chaosSudoku.js'
import { generateClassic } from './classicSudoku.js'
import { generateKiller } from './killerSudoku.js'

self.onmessage = ({ data }) => {
  try { self.postMessage({ puzzle: (data.type === 'killer' ? generateKiller : data.type === 'chaos' ? generateChaos : generateClassic)(data.size, data.difficulty) }) }
  catch (error) { self.postMessage({ error: error.message }) }
}
