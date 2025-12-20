import { VertexAI } from '@google-cloud/vertexai'

const GCP_PROJECT = process.env.GCP_PROJECT || 'your-gcp-project'
const GCP_LOCATION = process.env.GCP_LOCATION || 'us-central1'

const vertexAI = new VertexAI({ project: GCP_PROJECT, location: GCP_LOCATION })
const gemini = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' })

export async function generateContent(prompt) {
  const result = await gemini.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  })
  return result.response.candidates[0].content.parts[0].text
}

export async function analyzeFeedback(transcript, config) {
  const transcriptText = transcript
    .map(t => `${t.role === 'agent' ? 'Interviewer' : 'Candidat'}: ${t.text}`)
    .join('\n')

  const prompt = `Analyse cet entretien d'embauche pour le poste de ${config.jobTitle}.

TRANSCRIPT:
${transcriptText}

Fournis une analyse JSON avec exactement cette structure:
{
  "clarity": <score 1-10>,
  "structure": <score 1-10>,
  "confidence": <score 1-10>,
  "relevance": <score 1-10>,
  "strengths": ["point fort 1", "point fort 2", "point fort 3"],
  "improvements": ["amelioration 1", "amelioration 2", "amelioration 3"],
  "mainAdvice": "conseil principal personnalise"
}

Sois constructif et precis dans ton analyse.`

  const result = await gemini.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' }
  })

  return JSON.parse(result.response.candidates[0].content.parts[0].text)
}