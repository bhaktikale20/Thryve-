import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kalebhakti20_db_user:Jh7S6eZL5TXNW1kD@cluster0.frav73n.mongodb.net/?appName=Cluster0'
const DB_NAME = process.env.MONGODB_DB || 'thryve'

let dbClient
let db
let stateColl

async function startServer() {
  try {
    if (!MONGODB_URI) {
      // eslint-disable-next-line no-console
      console.warn('MONGODB_URI not set. Please add it to .env')
    }

    dbClient = new MongoClient(MONGODB_URI, { connectTimeoutMS: 10000 })
    await dbClient.connect()
    db = dbClient.db(DB_NAME)
    stateColl = db.collection('state')

    // Ensure a global state document exists
    const existing = await stateColl.findOne({ _id: 'global' })
    if (!existing) {
      await stateColl.insertOne({
        _id: 'global',
        userName: '',
        habitEntries: [],
        achievements: [],
        preferences: {},
        totalPoints: 0,
        level: 1,
        streak: 0,
      })
    }

    // Endpoints
    app.post('/api/login', async (req, res) => {
      try {
        const { name } = req.body || {}
        await stateColl.updateOne({ _id: 'global' }, { $set: { userName: name || '' } })
        return res.json({ ok: true, userName: name || '' })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('login error', err)
        return res.status(500).json({ ok: false, error: 'login failed' })
      }
    })

    app.post('/api/checkin', async (req, res) => {
      try {
        const { mood, factors, note, habits, customHabit, preferences } = req.body || {}

        const entry = {
          date: new Date().toISOString(),
          habits: habits || [],
          mood: mood || '',
          factors: factors || [],
          note: note || '',
          customHabit: customHabit || null,
        }

        await stateColl.updateOne({ _id: 'global' }, {
          $push: { habitEntries: entry },
          $set: { preferences: preferences || {} },
          $inc: { totalPoints: 50 }
        })

        // Recompute level
        const s = await stateColl.findOne({ _id: 'global' })
        const totalPoints = s?.totalPoints || 0
        const level = Math.floor(totalPoints / 100) + 1
        await stateColl.updateOne({ _id: 'global' }, { $set: { level } })

        const updated = await stateColl.findOne({ _id: 'global' })
        return res.json({ ok: true, state: updated })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('checkin error', err)
        return res.status(500).json({ ok: false, error: 'checkin failed' })
      }
    })

    app.get('/api/state', async (req, res) => {
      try {
        const s = await stateColl.findOne({ _id: 'global' })
        return res.json({ ok: true, state: s })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('state error', err)
        return res.status(500).json({ ok: false, error: 'state fetch failed' })
      }
    })

    // Additional collections for app features
    const usersColl = db.collection('users')
    const checkinsColl = db.collection('checkins')
    const habitsColl = db.collection('habits')
    const habitCompletionsColl = db.collection('habit_completions')
    const achievementsColl = db.collection('achievements')
    const meditationsColl = db.collection('meditations')
    const detectionsColl = db.collection('detections')
    const voiceColl = db.collection('voice_transcripts')
    const chatColl = db.collection('chat_messages')
    const gamesColl = db.collection('game_scores')
    const settingsColl = db.collection('settings')
    const eventsColl = db.collection('events')

    // Users
    app.post('/api/users', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await usersColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create user error', err)
        return res.status(500).json({ ok: false, error: 'create user failed' })
      }
    })

    app.get('/api/users/:id', async (req, res) => {
      try {
        const { id } = req.params
        const u = await usersColl.findOne({ _id: id }) || await usersColl.findOne({ _id: id })
        return res.json({ ok: true, user: u })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('get user error', err)
        return res.status(500).json({ ok: false, error: 'get user failed' })
      }
    })

    // Checkins
    app.post('/api/checkins', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await checkinsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create checkin error', err)
        return res.status(500).json({ ok: false, error: 'create checkin failed' })
      }
    })

    app.get('/api/checkins', async (req, res) => {
      try {
        const { userId } = req.query
        const q = userId ? { userId } : {}
        const items = await checkinsColl.find(q).sort({ createdAt: -1 }).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('list checkins error', err)
        return res.status(500).json({ ok: false, error: 'list checkins failed' })
      }
    })

    // Habits
    app.post('/api/habits', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await habitsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create habit error', err)
        return res.status(500).json({ ok: false, error: 'create habit failed' })
      }
    })

    app.get('/api/habits', async (req, res) => {
      try {
        const { userId } = req.query
        const q = userId ? { userId } : {}
        const items = await habitsColl.find(q).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('list habits error', err)
        return res.status(500).json({ ok: false, error: 'list habits failed' })
      }
    })

    app.post('/api/habits/:id/complete', async (req, res) => {
      try {
        const { id } = req.params
        const payload = { habitId: id, date: new Date().toISOString(), ...req.body }
        const result = await habitCompletionsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('complete habit error', err)
        return res.status(500).json({ ok: false, error: 'complete habit failed' })
      }
    })

    // Achievements
    app.get('/api/achievements', async (req, res) => {
      try {
        const { userId } = req.query
        const q = userId ? { userId } : {}
        const items = await achievementsColl.find(q).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('list achievements error', err)
        return res.status(500).json({ ok: false, error: 'list achievements failed' })
      }
    })

    app.post('/api/achievements', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await achievementsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create achievement error', err)
        return res.status(500).json({ ok: false, error: 'create achievement failed' })
      }
    })

    // Meditations
    app.post('/api/meditations', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await meditationsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create meditation error', err)
        return res.status(500).json({ ok: false, error: 'create meditation failed' })
      }
    })

    app.get('/api/meditations', async (req, res) => {
      try {
        const { userId } = req.query
        const q = userId ? { userId } : {}
        const items = await meditationsColl.find(q).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('list meditations error', err)
        return res.status(500).json({ ok: false, error: 'list meditations failed' })
      }
    })

    // Detections (face)
    app.post('/api/detections', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await detectionsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create detection error', err)
        return res.status(500).json({ ok: false, error: 'create detection failed' })
      }
    })

    // Voice transcripts
    app.post('/api/voice', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await voiceColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create voice error', err)
        return res.status(500).json({ ok: false, error: 'create voice failed' })
      }
    })

    // Chat messages
    app.post('/api/chat', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await chatColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create chat message error', err)
        return res.status(500).json({ ok: false, error: 'create chat message failed' })
      }
    })

    app.get('/api/chat', async (req, res) => {
      try {
        const { userId } = req.query
        const q = userId ? { userId } : {}
        const items = await chatColl.find(q).sort({ createdAt: 1 }).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('list chat error', err)
        return res.status(500).json({ ok: false, error: 'list chat failed' })
      }
    })

    // Games / scores
    app.post('/api/games/:gameId/score', async (req, res) => {
      try {
        const { gameId } = req.params
        const payload = { gameId, ...req.body, createdAt: new Date().toISOString() }
        const result = await gamesColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create game score error', err)
        return res.status(500).json({ ok: false, error: 'create game score failed' })
      }
    })

    app.get('/api/games/:gameId/leaderboard', async (req, res) => {
      try {
        const { gameId } = req.params
        const items = await gamesColl.find({ gameId }).sort({ score: -1 }).limit(50).toArray()
        return res.json({ ok: true, items })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('leaderboard error', err)
        return res.status(500).json({ ok: false, error: 'leaderboard failed' })
      }
    })

    // Settings
    app.get('/api/settings', async (req, res) => {
      try {
        const { userId } = req.query
        const s = await settingsColl.findOne({ userId }) || {}
        return res.json({ ok: true, settings: s })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('get settings error', err)
        return res.status(500).json({ ok: false, error: 'get settings failed' })
      }
    })

    app.put('/api/settings', async (req, res) => {
      try {
        const payload = req.body || {}
        await settingsColl.updateOne({ userId: payload.userId }, { $set: payload }, { upsert: true })
        return res.json({ ok: true })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('put settings error', err)
        return res.status(500).json({ ok: false, error: 'put settings failed' })
      }
    })

    // Events (analytics)
    app.post('/api/events', async (req, res) => {
      try {
        const payload = req.body || {}
        payload.createdAt = new Date().toISOString()
        const result = await eventsColl.insertOne(payload)
        return res.json({ ok: true, id: result.insertedId })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('create event error', err)
        return res.status(500).json({ ok: false, error: 'create event failed' })
      }
    })

    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on http://localhost:${PORT}`)
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', e)
    process.exit(1)
  }
}

startServer()


