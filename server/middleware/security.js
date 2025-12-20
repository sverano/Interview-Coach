import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.elevenlabs.io", "wss://api.elevenlabs.io"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false
})

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requetes, reessayez plus tard' },
  standardHeaders: true,
  legacyHeaders: false
})

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de tentatives, reessayez dans 1 heure' }
})

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/['";]/g, '')
    .trim()
    .slice(0, 1000)
}

export function sanitizeBody(req, res, next) {
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }
  next()
}

function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeInput(obj) : obj
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item))
  }
  const sanitized = {}
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = sanitizeInput(key)
    sanitized[sanitizedKey] = sanitizeObject(value)
  }
  return sanitized
}

export function validateSession(req, res, next) {
  const { jobTitle, interviewType } = req.body

  if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.length < 2 || jobTitle.length > 100) {
    return res.status(400).json({ error: 'Poste invalide' })
  }

  const validTypes = ['behavioral', 'technical', 'case', 'mixed']
  if (!interviewType || !validTypes.includes(interviewType)) {
    return res.status(400).json({ error: 'Type d\'entretien invalide' })
  }

  next()
}

export function errorHandler(err, req, res, next) {
  console.error('Error:', err)
  res.status(500).json({ error: 'Une erreur est survenue' })
}