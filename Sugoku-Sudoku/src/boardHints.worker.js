import { advancedHintTiles } from './advancedHints.js'

self.onmessage = ({ data }) => {
  try { self.postMessage({ targets: advancedHintTiles(data) }) }
  catch (error) { self.postMessage({ error: error.message }) }
}
