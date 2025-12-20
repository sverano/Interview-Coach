import { useState, useCallback } from 'react'

export function useInterview() {
  const [config, setConfig] = useState(null)
  const [transcript, setTranscript] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const startSession = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Failed to start session')
      const data = await res.json()
      setConfig({ ...formData, ...data })
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const endSession = useCallback(async (transcriptData) => {
    setLoading(true)
    setTranscript(transcriptData)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcriptData, config })
      })
      if (!res.ok) throw new Error('Failed to get feedback')
      const data = await res.json()
      setFeedback(data)
      setConfig(null)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [config])

  const reset = useCallback(() => {
    setConfig(null)
    setTranscript([])
    setFeedback(null)
    setError(null)
  }, [])

  return {
    config,
    transcript,
    feedback,
    loading,
    error,
    startSession,
    endSession,
    reset
  }
}