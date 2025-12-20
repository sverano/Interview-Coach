import { Router } from 'express'
import { analyzeFeedback } from '../services/gemini.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

function validateFeedback(req, res, next) {
  const { transcript, config } = req.body

  if (!transcript || typeof transcript !== 'string' || transcript.length < 10) {
    return res.status(400).json({ error: 'Transcript invalide' })
  }

  if (!config || typeof config !== 'object') {
    return res.status(400).json({ error: 'Configuration invalide' })
  }

  next()
}

router.post('/', verifyToken, validateFeedback, async (req, res, next) => {
  try {
    const { transcript, config } = req.body
    const feedback = await analyzeFeedback(transcript, config)
    res.json(feedback)
  } catch (error) {
    next(error)
  }
})

export default router