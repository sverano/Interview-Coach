import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, History, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import SetupForm from '../components/SetupForm'
import InterviewSession from '../components/InterviewSession'
import Feedback from '../components/Feedback'

export default function InterviewApp() {
  const { user, signOut } = useAuth()
  const [config, setConfig] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const startInterview = async (formData) => {
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    setConfig({ ...formData, ...data })
  }

  const endInterview = async (transcript) => {
    setSessionData(transcript)
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, config })
    })
    const data = await res.json()
    setFeedback(data)

    await supabase.from('interviews').insert({
      user_id: user.id,
      job_title: config.jobTitle,
      company: config.company,
      interview_type: config.interviewType,
      transcript,
      feedback: data,
      avg_score: (data.clarity + data.structure + data.confidence + data.relevance) / 4,
      duration: transcript.length > 0 ? (transcript[transcript.length - 1].timestamp - transcript[0].timestamp) / 1000 : 0,
      improvement: 0
    })

    setConfig(null)
  }

  const reset = () => {
    setConfig(null)
    setSessionData(null)
    setFeedback(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Interview Coach AI
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 text-gray-400 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <Link to="/history" className="p-2 text-gray-400 hover:text-white transition-colors">
              <History className="w-5 h-5" />
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
            </Link>
            <button onClick={signOut} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
        >
          {!config && !feedback && "Nouvel entretien"}
          {config && "Entretien en cours"}
          {feedback && "Resultats"}
        </motion.h1>

        {!config && !feedback && (
          <SetupForm onSubmit={startInterview} />
        )}

        {config && (
          <InterviewSession
            config={config}
            onEnd={endInterview}
          />
        )}

        {feedback && (
          <Feedback
            data={feedback}
            transcript={sessionData}
            onRestart={reset}
          />
        )}
      </main>
    </div>
  )
}