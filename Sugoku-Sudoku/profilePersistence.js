import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyLevelUps } from './src/xp.js'

const usernameKey = (username) => username.trim().toLowerCase()
const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex')
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`
}
const verifyPassword = (password, savedPassword) => {
  if (typeof savedPassword !== 'string') return false
  const [algorithm, salt, savedHash] = savedPassword.split('$')
  if (algorithm !== 'scrypt') return password === savedPassword
  if (!salt || !savedHash) return false
  if (!/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(savedHash)) return false
  const expected = Buffer.from(savedHash, 'hex')
  const actual = scryptSync(password, salt, expected.length)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
const penNames = new Set(['Multi Pen', 'Crayon Pen', 'Brush Pen', 'Cheap Pen', 'Ink Pen', 'Marker Pen', 'Mechanical Pen', 'Pen Pen', 'Pencil Pen', 'Quill Pen', 'Stylus Pen', 'Yatate Pen'])
const packIds = new Set(['pack-E_1', 'pack-E_2', 'pack-E_3', 'pack-H_1', 'pack-H_2', 'pack-H_3', 'pack-N_1', 'pack-N_2', 'pack-N_3', 'pack-EX_1', 'pack-EX_2', 'pack-EX_3', 'pack-I_1', 'pack-I_2', 'pack-I_3'])
const publicProfile = ({ username, email, profileImage, selectedPen, ownedPens, ownedPacks, sudo, hints, level, totalXp, dailyStreak, puzzlesCompleted, fastestTime }) => ({
  username,
  email,
  profileImage,
  level: Number.isFinite(level) ? level : 1,
  totalXp: Number.isFinite(totalXp) ? totalXp : 0,
  puzzlesCompleted: Number.isFinite(puzzlesCompleted) ? puzzlesCompleted : 0,
  dailyStreak: Number.isFinite(dailyStreak) ? dailyStreak : 0,
  fastestTime: Number.isFinite(fastestTime) ? fastestTime : 0,
  selectedPen: selectedPen || 'Pencil Pen',
  ownedPens: ownedPens || [...new Set(['Pencil Pen', selectedPen || 'Pencil Pen'])],
  ownedPacks: ownedPacks || ['pack-E_1'],
  sudo: Number.isFinite(sudo) ? sudo : 0,
  hints: Number.isFinite(hints) ? hints : 0,
})

const importSavedUser = async (source) => {
  const { default: saved } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
  return structuredClone(saved)
}

export default function profilePersistence(userFile = new URL('./.local/user.mjs', import.meta.url)) {
  const seedFile = new URL('./src/user.js', import.meta.url)
  let writes = Promise.resolve()
  const readUser = async () => {
    try {
      return await importSavedUser(await readFile(userFile, 'utf8'))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      const seeded = await importSavedUser(await readFile(seedFile, 'utf8'))
      await mkdir(dirname(fileURLToPath(userFile)), { recursive: true })
      await writeFile(userFile, `const user = ${JSON.stringify(seeded, null, 2)}\n\nexport default user\n`, 'utf8')
      return seeded
    }
  }
  const writeUser = async (user) => {
    await writeFile(userFile, `const user = ${JSON.stringify(user, null, 2)}\n\nexport default user\n`, 'utf8')
  }
  return {
    name: 'local-profile-persistence',
    configureServer(server) {
      server.middlewares.use('/api', async (request, response, next) => {
        const route = request.url?.split('?')[0]
        if (!['/profile', '/account', '/friends'].includes(route)) return next()
        response.setHeader('Content-Type', 'application/json')
        if (route === '/friends' && request.method === 'GET') {
          try {
            await writes
            const { accounts: savedAccounts, ...current } = await readUser()
            const accounts = savedAccounts || [current]
            const ownKey = usernameKey(current.username)
            const query = new URL(request.url, 'http://localhost').searchParams.get('search')?.trim().toLowerCase() || ''
            const row = (account) => ({ id: usernameKey(account.username), name: account.username, profileImage: account.profileImage || null })
            const friends = current.friends || []
            const requests = current.friendRequests || []
            response.end(JSON.stringify({ ok: true,
              friends: accounts.filter((account) => friends.includes(usernameKey(account.username))).map(row),
              friendRequests: accounts.filter((account) => requests.includes(usernameKey(account.username))).map(row),
              searchResults: query.length < 3 ? [] : accounts.filter((account) => {
                const key = usernameKey(account.username)
                return key !== ownKey && key.includes(query) && !friends.includes(key) && !(account.friendRequests || []).includes(ownKey)
              }).map(row),
            }))
          } catch (error) {
            response.statusCode = 500
            response.end(JSON.stringify({ error: error.message }))
          }
          return
        }
        if (route === '/profile' && request.method === 'GET') {
          try {
            const { accounts: _accounts, ...current } = await readUser()
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
            if (typeof updates.username !== 'string' || !updates.username.trim() || updates.username.trim().length > 35) throw new Error('Username must contain 1 to 35 characters.')
            updates.username = updates.username.trim()
          }
          if ('password' in updates && (typeof updates.password !== 'string' || updates.password.length > 128 || (route !== '/account' && updates.password.length < 8))) throw new Error('Use a password with 8 to 128 characters.')
          if ('email' in updates) {
            if (typeof updates.email !== 'string' || updates.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email.trim())) throw new Error('Enter a valid email address.')
            updates.email = updates.email.trim()
          }
          if ('profileImage' in updates && updates.profileImage !== null && (typeof updates.profileImage !== 'string' || !/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(updates.profileImage))) throw new Error('Choose a PNG, JPEG, WebP, or GIF image.')
          if ('selectedPen' in updates && (typeof updates.selectedPen !== 'string' || !updates.selectedPen.trim() || updates.selectedPen.trim().length > 50)) throw new Error('Choose a valid pen.')
          if ('ownedPens' in updates && (!Array.isArray(updates.ownedPens) || updates.ownedPens.some((pen) => typeof pen !== 'string' || !penNames.has(pen)))) throw new Error('Choose valid owned pens.')
          if ('ownedPacks' in updates && (!Array.isArray(updates.ownedPacks) || updates.ownedPacks.some((pack) => typeof pack !== 'string' || !packIds.has(pack)))) throw new Error('Choose valid owned packs.')
          if ('level' in updates && (!Number.isSafeInteger(updates.level) || updates.level < 1)) throw new Error('Level must be a positive whole number.')
          if ('sudo' in updates && (!Number.isSafeInteger(updates.sudo) || updates.sudo < 0)) throw new Error('Sudo must be a non-negative whole number.')
          if ('completedBoardId' in updates && (typeof updates.completedBoardId !== 'string' || !updates.completedBoardId || updates.completedBoardId.length > 100)) throw new Error('Invalid board reward.')
          if ('completionSeconds' in updates && (!updates.completedBoardId || !Number.isInteger(updates.completionSeconds) || updates.completionSeconds < 1 || updates.completionSeconds > 2147483647)) throw new Error('Invalid completion time.')
          if ('hints' in updates && (!Number.isSafeInteger(updates.hints) || updates.hints < 0)) throw new Error('Hints must be a non-negative whole number.')
          if (route === '/account' && (!['signup', 'signin'].includes(updates.action) || !updates.username || typeof updates.password !== 'string' || updates.password.length > 128)) throw new Error('Enter your username and password.')
          if (route === '/account' && updates.action === 'signup' && updates.password.length < 8) throw new Error('Use a password with at least 8 characters.')
          if (route === '/account' && updates.action === 'signup' && updates.username.length < 3) throw new Error('Username must contain at least 3 characters.')
          let result
          const write = writes.then(async () => {
            const { accounts: savedAccounts, ...current } = await readUser()
            const accounts = savedAccounts || [current]
            const currentIndex = accounts.findIndex((account) => usernameKey(account.username) === usernameKey(current.username))
            if (currentIndex >= 0) accounts[currentIndex] = current
            else accounts.push(current)
            let selected
            if (route === '/friends') {
              if (!['request', 'accept', 'remove'].includes(updates.action) || typeof updates.id !== 'string') throw new Error('Invalid friend action.')
              const ownKey = usernameKey(current.username)
              const target = accounts.find((account) => usernameKey(account.username) === updates.id)
              if (!target || updates.id === ownKey) throw new Error('Choose another player.')
              selected = accounts.find((account) => usernameKey(account.username) === ownKey)
              selected.friends ||= []
              selected.friendRequests ||= []
              target.friends ||= []
              target.friendRequests ||= []
              if (updates.action === 'request') {
                if (!selected.friends.includes(updates.id) && !target.friendRequests.includes(ownKey)) target.friendRequests.push(ownKey)
              } else if (updates.action === 'accept') {
                if (!selected.friendRequests.includes(updates.id)) throw new Error('Friend request not found.')
                if (!selected.friends.includes(updates.id)) selected.friends.push(updates.id)
                if (!target.friends.includes(ownKey)) target.friends.push(ownKey)
                selected.friendRequests = selected.friendRequests.filter((id) => id !== updates.id)
                target.friendRequests = target.friendRequests.filter((id) => id !== ownKey)
              } else {
                selected.friends = selected.friends.filter((id) => id !== updates.id)
                target.friends = target.friends.filter((id) => id !== ownKey)
              }
            } else if (route === '/account') {
              const existing = accounts.find((account) => usernameKey(account.username) === usernameKey(updates.username))
              if (updates.action === 'signup') {
                if (existing) throw new Error('That username is already taken. Choose another username.')
                selected = { username: updates.username, password: hashPassword(updates.password), email: '', profileImage: null, selectedPen: 'Pencil Pen', ownedPens: ['Pencil Pen'], ownedPacks: ['pack-E_1'], sudo: 0, hints: 0, level: 1, dailyStreak: 0, puzzlesCompleted: 0, fastestTime: 0, totalXp: 0 }
                accounts.push(selected)
              } else {
                if (!existing || !verifyPassword(updates.password, existing.password)) throw new Error('Incorrect username or password.')
                if (typeof existing.password !== 'string' || !existing.password.startsWith('scrypt$')) {
                  existing.password = hashPassword(updates.password)
                }
                selected = existing
              }
            } else {
              if ('username' in updates && accounts.some((account, index) => index !== currentIndex && usernameKey(account.username) === usernameKey(updates.username))) throw new Error('That username is already taken. Choose another username.')
              selected = { ...current }
              for (const field of ['username', 'email', 'password', 'profileImage', 'selectedPen', 'ownedPens', 'ownedPacks', 'level', 'sudo', 'hints']) {
                if (field in updates) selected[field] = field === 'password' ? hashPassword(updates.password) : updates[field]
              }
              if (updates.completedBoardId) {
                const rewardedBoards = selected.rewardedBoards || []
                if (!rewardedBoards.includes(updates.completedBoardId)) {
                  selected.totalXp = (Number.isFinite(selected.totalXp) ? selected.totalXp : 0) + 1000
                  Object.assign(selected, applyLevelUps(selected.level, selected.totalXp))
                  selected.puzzlesCompleted = (Number.isFinite(selected.puzzlesCompleted) ? selected.puzzlesCompleted : 0) + 1
                  selected.rewardedBoards = [...rewardedBoards, updates.completedBoardId]
                  if (updates.completionSeconds && (!selected.fastestTime || updates.completionSeconds < selected.fastestTime)) {
                    selected.fastestTime = updates.completionSeconds
                  }
                }
              }
              accounts[currentIndex] = selected
              if (selected.username !== current.username) {
                for (const account of accounts) {
                  for (const field of ['friends', 'friendRequests']) {
                    if (account[field]) account[field] = account[field].map((id) => id === usernameKey(current.username) ? usernameKey(selected.username) : id)
                  }
                }
              }
            }
            await writeUser({ ...selected, accounts })
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
