import { Router } from 'express'
import { generateFirstQuestion } from '../services/elevenlabs.js'
import { buildPrompt } from '../services/prompts.js'
import { validateSession } from '../middleware/security.js'

const router = Router()

const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID

router.post('/', validateSession, async (req, res, next) => {
  try {
    const { jobTitle, company, interviewType } = req.body

    const systemPrompt = buildPrompt(interviewType, jobTitle, company)
    const firstQuestion = await generateFirstQuestion(systemPrompt)

    res.json({
      agentId: ELEVENLABS_AGENT_ID,
      firstQuestion,
      jobTitle,
      company,
      interviewType
    })
  } catch (error) {
    next(error)
  }
})

export default router