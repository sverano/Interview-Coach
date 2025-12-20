import { useInterview } from '../hooks/useInterview'
import SetupForm from '../components/SetupForm'
import InterviewSession from '../components/InterviewSession'
import Feedback from '../components/Feedback'

export default function Home() {
  const { config, feedback, startSession, endSession, reset } = useInterview()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Interview Coach AI
        </h1>

        {!config && !feedback && (
          <SetupForm onSubmit={startSession} />
        )}

        {config && (
          <InterviewSession config={config} onEnd={endSession} />
        )}

        {feedback && (
          <Feedback data={feedback} onRestart={reset} />
        )}
      </div>
    </div>
  )
}