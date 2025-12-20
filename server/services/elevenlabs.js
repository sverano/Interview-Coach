import { generateContent } from './gemini.js'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

export async function generateFirstQuestion(systemPrompt) {
  const prompt = `${systemPrompt}\n\nGenere uniquement la premiere question d'ouverture pour cet entretien. Sois naturel et accueillant. Maximum 2 phrases.`
  return generateContent(prompt)
}

export async function createAgent(jobTitle, systemPrompt, firstQuestion) {
  const response = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      name: `Interview Coach - ${jobTitle}`,
      conversation_config: {
        agent: {
          prompt: {
            prompt: `${systemPrompt}

Instructions importantes:
- Pose une seule question a la fois
- Ecoute attentivement les reponses
- Pose des questions de suivi pertinentes
- Apres 5-7 questions, conclus l'entretien poliment
- Reste toujours professionnel et encourageant`
          },
          first_message: firstQuestion,
          language: "fr"
        },
        tts: {
          voice_id: "21m00Tcm4TlvDq8ikWAM"
        }
      }
    })
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('ElevenLabs error:', data)
    throw new Error(data.detail?.message || data.detail || 'Failed to create ElevenLabs agent')
  }

  return data
}