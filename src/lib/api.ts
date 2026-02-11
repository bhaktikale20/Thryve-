export async function getState() {
  const res = await fetch('/api/state')
  return await res.json()
}

export async function login(name: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  return await res.json()
}

export async function checkin(data: {
  mood: string
  factors: string[]
  note: string
  habits: string[]
  customHabit?: string
  preferences?: any
}) {
  const res = await fetch('/api/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return await res.json()
}

// Users
export async function createUser(payload: any) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`)
  return await res.json()
}

// Checkins
export async function createCheckin(payload: any) {
  const res = await fetch('/api/checkins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function listCheckins(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/checkins${q}`)
  return await res.json()
}

// Habits
export async function createHabit(payload: any) {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function listHabits(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/habits${q}`)
  return await res.json()
}

export async function completeHabit(habitId: string, payload: any) {
  const res = await fetch(`/api/habits/${habitId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

// Achievements
export async function listAchievements(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/achievements${q}`)
  return await res.json()
}

export async function createAchievement(payload: any) {
  const res = await fetch('/api/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

// Meditations
export async function createMeditation(payload: any) {
  const res = await fetch('/api/meditations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function listMeditations(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/meditations${q}`)
  return await res.json()
}

// Detections
export async function createDetection(payload: any) {
  const res = await fetch('/api/detections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

// Voice
export async function createVoice(payload: any) {
  const res = await fetch('/api/voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

// Chat
export async function postChatMessage(payload: any) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function listChat(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/chat${q}`)
  return await res.json()
}

// Games
export async function postGameScore(gameId: string, payload: any) {
  const res = await fetch(`/api/games/${encodeURIComponent(gameId)}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

export async function getLeaderboard(gameId: string) {
  const res = await fetch(`/api/games/${encodeURIComponent(gameId)}/leaderboard`)
  return await res.json()
}

// Settings
export async function getSettings(userId?: string) {
  const q = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  const res = await fetch(`/api/settings${q}`)
  return await res.json()
}

export async function putSettings(payload: any) {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

// Events
export async function postEvent(payload: any) {
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return await res.json()
}

