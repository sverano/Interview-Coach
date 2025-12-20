import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, TrendingUp, Target, Clock, Award,
  BarChart3, Calendar, ChevronRight, Mic, Sparkles
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalInterviews: 0,
    avgScore: 0,
    totalTime: 0,
    improvement: 0,
    streakDays: 0
  })
  const [recentInterviews, setRecentInterviews] = useState([])
  const [scoreHistory, setScoreHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    const { data: interviews } = await supabase
      .from('interviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (interviews && interviews.length > 0) {
      const totalInterviews = interviews.length
      const avgScore = (interviews.reduce((a, b) => a + b.avg_score, 0) / totalInterviews).toFixed(1)
      const totalTime = interviews.reduce((a, b) => a + b.duration, 0)

      const firstHalf = interviews.slice(Math.floor(totalInterviews / 2))
      const secondHalf = interviews.slice(0, Math.floor(totalInterviews / 2))
      const avgFirst = firstHalf.reduce((a, b) => a + b.avg_score, 0) / firstHalf.length || 0
      const avgSecond = secondHalf.reduce((a, b) => a + b.avg_score, 0) / secondHalf.length || 0
      const improvement = avgSecond - avgFirst

      setStats({
        totalInterviews,
        avgScore,
        totalTime: Math.round(totalTime / 60),
        improvement: improvement.toFixed(1),
        streakDays: 5
      })

      setRecentInterviews(interviews.slice(0, 5))
      setScoreHistory(interviews.slice(0, 10).reverse().map(i => i.avg_score))
    }

    setLoading(false)
  }

  const StatCard = ({ icon: Icon, label, value, suffix, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl p-6 border border-white/10"
    >
      <Icon className="w-8 h-8 text-cyan-400 mb-4" />
      <p className="text-3xl font-bold mb-1">{value}{suffix}</p>
      <p className="text-gray-400 text-sm">{label}</p>
      {trend !== undefined && (
        <div className={`mt-2 text-sm ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend >= 0 ? '+' : ''}{trend}% vs mois dernier
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/app" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Suivez votre progression</p>
          </div>
          <Link to="/app">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2"
            >
              <Mic className="w-5 h-5" />
              Nouvel entretien
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Mic} label="Entretiens" value={stats.totalInterviews} />
              <StatCard icon={Target} label="Score moyen" value={stats.avgScore} suffix="/10" />
              <StatCard icon={Clock} label="Temps total" value={stats.totalTime} suffix=" min" />
              <StatCard icon={TrendingUp} label="Progression" value={stats.improvement} suffix="%" trend={parseFloat(stats.improvement)} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Evolution des scores</h2>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-48 flex items-end gap-2">
                  {scoreHistory.map((score, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${score * 10}%` }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {score}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Objectifs</h2>
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Score moyen 8+</span>
                      <span className="text-gray-400">{Math.min(100, (stats.avgScore / 8) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (stats.avgScore / 8) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>10 entretiens</span>
                      <span className="text-gray-400">{Math.min(100, (stats.totalInterviews / 10) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (stats.totalInterviews / 10) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Serie 7 jours</span>
                      <span className="text-gray-400">{Math.round((stats.streakDays / 7) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        style={{ width: `${(stats.streakDays / 7) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Entretiens recents</h2>
                <Link to="/history" className="text-cyan-400 hover:underline text-sm flex items-center gap-1">
                  Voir tout
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {recentInterviews.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Aucun entretien pour le moment</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Mic className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium">{interview.job_title}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(interview.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-lg font-bold ${interview.avg_score >= 7 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                          {interview.avg_score}/10
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}