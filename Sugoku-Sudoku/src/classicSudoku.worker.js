import { generateClassic } from './classicSudoku.js'

self.onmessage = ({ data }) => {
  try { self.postMessage({ puzzle: generateClassic(data.size, data.difficulty) }) }
  catch (error) { self.postMessage({ error: error.message }) }
}
