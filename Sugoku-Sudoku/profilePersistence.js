import { readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'

export default function profilePersistence(userFile = new URL('./src/user.js', import.meta.url)) {
  let writes = Promise.resolve()
  return {
    name: 'local-profile-persistence',
    configureServer(server) {
      server.middlewares.use('/api/profile', async (request, response) => {
        response.setHeader('Content-Type', 'application/json')
        if (request.method !== 'POST' || !request.headers['content-type']?.startsWith('application/json')) {
          response.statusCode = 405
          response.end(JSON.stringify({ error: 'Use a JSON POST request.' }))
          return
        }
        try {
          const chunks = []
          let size = 0
          for await (const chunk of request) {
            size += chunk.length
            if (size > 4 * 1024 * 1024) throw new Error('Please choose an image smaller than 3 MB.')
            chunks.push(chunk)
          }
          const updates = JSON.parse(Buffer.concat(chunks).toString())
          if ('username' in updates && (typeof updates.username !== 'string' || !updates.username.trim() || updates.username.trim().length > 30)) {
            throw new Error('Username must contain 1–30 characters.')
          }
          if ('profileImage' in updates && updates.profileImage !== null && (typeof updates.profileImage !== 'string' || !/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(updates.profileImage))) {
            throw new Error('Choose a PNG, JPEG, WebP, or GIF image.')
          }
          const write = writes.then(async () => {
            let source = await readFile(userFile, 'utf8')
            for (const field of ['username', 'profileImage']) {
              if (!(field in updates)) continue
              const pattern = new RegExp(`(\\b${field}:\\s*)(?:null|'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*")`)
              if (!pattern.test(source)) throw new Error(`Cannot find ${field} in user.js.`)
              const value = field === 'username' ? updates[field].trim() : updates[field]
              source = source.replace(pattern, (_, prefix) => prefix + JSON.stringify(value))
            }
            await writeFile(userFile, source, 'utf8')
          })
          writes = write.catch(() => {})
          await write
          response.end(JSON.stringify({ ok: true }))
        } catch (error) {
          response.statusCode = 400
          response.end(JSON.stringify({ error: error.message }))
        }
      })
    },
  }
}
