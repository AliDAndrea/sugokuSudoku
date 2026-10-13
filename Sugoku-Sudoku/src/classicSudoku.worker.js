import { generateChaos } from './chaosSudoku.js'
import { generateClassic } from './classicSudoku.js'

self.onmessage = ({ data }) => {
  try { self.postMessage({ puzzle: (data.type === 'chaos' ? generateChaos : generateClassic)(data.size, data.difficulty) }) }
  catch (error) { self.postMessage({ error: error.message }) }
}
