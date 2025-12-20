const API_BASE = '/api'

export async function createSession(formData) {
  const res = await fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to create session')
  }
  return res.json()
}

export async function getFeedback(transcript, config) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, config })
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to get feedback')
  }
  return res.json()
}