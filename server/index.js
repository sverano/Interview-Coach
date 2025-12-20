import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import {
  securityHeaders,
  apiLimiter,
  sanitizeBody,
  errorHandler
} from './middleware/security.js'
import sessionRouter from './routes/session.js'
import feedbackRouter from './routes/feedback.js'

const app = express()

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1)

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(securityHeaders)
app.use(express.json({ limit: '10kb' }))
app.use(sanitizeBody)
app.use('/api', apiLimiter)

app.use('/api/session', sessionRouter)
app.use('/api/feedback', feedbackRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})