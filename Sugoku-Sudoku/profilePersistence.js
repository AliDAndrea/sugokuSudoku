import { readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'

const usernameKey = (username) => username.trim().toLowerCase()
const penNames = new Set(['Multi Pen', 'Crayon Pen', 'Brush Pen', 'Cheap Pen', 'Ink Pen', 'Marker Pen', 'Mechanical Pen', 'Pen Pen', 'Pencil Pen', 'Quill Pen', 'Stylus Pen', 'Yatate Pen'])
const packIds = new Set(['pack-E_1', 'pack-E_2', 'pack-E_3', 'pack-H_1', 'pack-H_2', 'pack-H_3', 'pack-N_1', 'pack-N_2', 'pack-N_3', 'pack-EX_1', 'pack-EX_2', 'pack-EX_3', 'pack-I_1', 'pack-I_2', 'pack-I_3'])
const publicProfile = ({ username, email, profileImage, selectedPen, ownedPens, ownedPacks, sudo, hints, level, dailyStreak, puzzlesCompleted, fastestTime }) => ({
  username,
  email,
  profileImage,
  level: Number.isFinite(level) ? level : 1,
  dailyStreak: Number.isFinite(dailyStreak) ? dailyStreak : 0,
  puzzlesCompleted: Number.isFinite(puzzlesCompleted) ? puzzlesCompleted : 0,
  fastestTime: Number.isFinite(fastestTime) ? fastestTime : 0,
  selectedPen: selectedPen || 'Pencil Pen',
  ownedPens: ownedPens || [...new Set(['Pencil Pen', selectedPen || 'Pencil Pen'])],
  ownedPacks: ownedPacks || ['pack-E_1'],
  sudo: Number.isFinite(sudo) ? sudo : 0,
  hints: Number.isFinite(hints) ? hints : 0,
})

export default function profilePersistence(userFile = new URL('./src/user.js', import.meta.url)) {
  let writes = Promise.resolve()
  return {
    name: 'local-profile-persistence',
    configureServer(server) {
      server.middlewares.use('/api', async (request, response, next) => {
        const route = request.url?.split('?')[0]
        if (!['/profile', '/account'].includes(route)) return next()
        response.setHeader('Content-Type', 'application/json')
        if (route === '/profile' && request.method === 'GET') {
          try {
            const source = await readFile(userFile, 'utf8')
            const { default: saved } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
            const { accounts: _accounts, ...current } = structuredClone(saved)
            void _accounts
            response.end(JSON.stringify({ ok: true, profile: publicProfile(current) }))
          } catch (error) {
            response.statusCode = 500
            response.end(JSON.stringify({ error: error.message }))
          }
          return
        }
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
            if (size > 4 * 1024 * 1024) throw new Error('Request is too large.')
            chunks.push(chunk)
          }
          const updates = JSON.parse(Buffer.concat(chunks).toString())
          if (!updates || typeof updates !== 'object' || Array.isArray(updates)) throw new Error('Invalid profile update.')
          if ('username' in updates) {
            if (typeof updates.username !== 'string' || !updates.username.trim() || updates.username.trim().length > 30) throw new Error('Username must contain 1?30 characters.')
            updates.username = updates.username.trim()
          }
          if ('password' in updates && (typeof updates.password !== 'string' || !updates.password.trim())) throw new Error('Password must contain at least 1 character.')
          if ('email' in updates) {
            if (typeof updates.email !== 'string' || updates.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email.trim())) throw new Error('Enter a valid email address.')
            updates.email = updates.email.trim()
          }
          if ('profileImage' in updates && updates.profileImage !== null && (typeof updates.profileImage !== 'string' || !/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(updates.profileImage))) throw new Error('Choose a PNG, JPEG, WebP, or GIF image.')
          if ('selectedPen' in updates && (typeof updates.selectedPen !== 'string' || !updates.selectedPen.trim() || updates.selectedPen.trim().length > 50)) throw new Error('Choose a valid pen.')
          if ('ownedPens' in updates && (!Array.isArray(updates.ownedPens) || updates.ownedPens.some((pen) => typeof pen !== 'string' || !penNames.has(pen)))) throw new Error('Choose valid owned pens.')
          if ('ownedPacks' in updates && (!Array.isArray(updates.ownedPacks) || updates.ownedPacks.some((pack) => typeof pack !== 'string' || !packIds.has(pack)))) throw new Error('Choose valid owned packs.')
          if ('sudo' in updates && (!Number.isSafeInteger(updates.sudo) || updates.sudo < 0)) throw new Error('Sudo must be a non-negative whole number.')
          if ('hints' in updates && (!Number.isSafeInteger(updates.hints) || updates.hints < 0)) throw new Error('Hints must be a non-negative whole number.')
          if (route === '/account' && (!['signup', 'signin'].includes(updates.action) || !updates.username || !updates.password)) throw new Error('Enter your username and password.')
          let result
          const write = writes.then(async () => {
            const source = await readFile(userFile, 'utf8')
            const { default: saved } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
            const { accounts: savedAccounts, ...current } = structuredClone(saved)
            const accounts = savedAccounts || [current]
            const currentIndex = accounts.findIndex((account) => usernameKey(account.username) === usernameKey(current.username))
            if (currentIndex >= 0) accounts[currentIndex] = current
            else accounts.push(current)
            let selected
            if (route === '/account') {
              const existing = accounts.find((account) => usernameKey(account.username) === usernameKey(updates.username))
              if (updates.action === 'signup') {
                if (existing) throw new Error('That username is already taken. Choose another username.')
                selected = { username: updates.username, password: updates.password, email: '', profileImage: null, selectedPen: 'Pencil Pen', ownedPens: ['Pencil Pen'], ownedPacks: ['pack-E_1'], sudo: 0, hints: 0, level: 1, dailyStreak: 0, puzzlesCompleted: 0, fastestTime: 0, totalXp: 0 }
                accounts.push(selected)
              } else {
                if (!existing || existing.password !== updates.password) throw new Error('Incorrect username or password.')
                selected = existing
              }
            } else {
              if ('username' in updates && accounts.some((account, index) => index !== currentIndex && usernameKey(account.username) === usernameKey(updates.username))) throw new Error('That username is already taken. Choose another username.')
              selected = { ...current }
              for (const field of ['username', 'email', 'password', 'profileImage', 'selectedPen', 'ownedPens', 'ownedPacks', 'sudo', 'hints']) {
                if (field in updates) selected[field] = updates[field]
              }
              accounts[currentIndex] = selected
            }
            await writeFile(userFile, `const user = ${JSON.stringify({ ...selected, accounts }, null, 2)}\n\nexport default user\n`, 'utf8')
            result = publicProfile(selected)
          })
          writes = write.catch(() => {})
          await write
          response.end(JSON.stringify({ ok: true, profile: result }))
        } catch (error) {
          response.statusCode = 400
          response.end(JSON.stringify({ error: error.message }))
        }
      })
    },
  }
}
