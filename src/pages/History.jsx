import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Briefcase, TrendingUp, ChevronRight, Search, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function History() {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) {
      fetchInterviews()
    }
  }, [user])

  const fetchInterviews = async () => {
    const { data } = await supabase
      .from('interviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setInterviews(data || [])
    setLoading(false)
  }

  const filteredInterviews = interviews.filter(i => {
    const matchesSearch = i.job_title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || i.interview_type === filter
    return matchesSearch && matchesFilter
  })

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/app" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Historique</h1>
            <p className="text-gray-400">{interviews.length} entretiens realises</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all" className="bg-slate-800">Tous types</option>
              <option value="behavioral" className="bg-slate-800">Comportemental</option>
              <option value="technical" className="bg-slate-800">Technique</option>
              <option value="case" className="bg-slate-800">Etude de cas</option>
              <option value="mixed" className="bg-slate-800">Mixte</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucun entretien</h2>
            <p className="text-gray-400 mb-6">Lancez votre premier entretien pour commencer</p>
            <Link to="/app" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold rounded-xl">
              Commencer
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInterviews.map((interview, i) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{interview.job_title}</h3>
                      <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                        {interview.interview_type}
                      </span>
                    </div>
                    {interview.company && (
                      <p className="text-gray-400 text-sm mb-2">{interview.company}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(interview.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.round(interview.duration / 60)} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-1">Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(interview.avg_score)}`}>
                        {interview.avg_score}/10
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <TrendingUp className={`w-5 h-5 ${interview.improvement > 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                      <span className={interview.improvement > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {interview.improvement > 0 ? '+' : ''}{interview.improvement}%
                      </span>
                    </div>
                    <Link to={`/history/${interview.id}`} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}