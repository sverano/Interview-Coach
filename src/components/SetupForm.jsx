import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Building2, Users, Code, PieChart, Sparkles, ChevronRight } from 'lucide-react'

const interviewTypes = [
  { id: 'behavioral', label: 'Comportemental', icon: Users, description: 'Questions RH et soft skills' },
  { id: 'technical', label: 'Technique', icon: Code, description: 'Questions techniques et coding' },
  { id: 'case', label: 'Etude de cas', icon: PieChart, description: 'Problèmes business a résoudre' },
  { id: 'mixed', label: 'Mixte', icon: Sparkles, description: 'Combinaison de tous les types' }
]

export default function SetupForm({ onSubmit }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    interviewType: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }

  const canProceed = step === 1 ? form.jobTitle : step === 2 ? form.interviewType : true

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <motion.div
              animate={{
                scale: step === s ? 1.1 : 1,
                backgroundColor: step >= s ? 'rgb(6 182 212)' : 'rgb(51 65 85)'
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-900"
            >
              {s}
            </motion.div>
            {s < 3 && (
              <div className={`w-16 h-1 mx-2 rounded ${step > s ? 'bg-cyan-500' : 'bg-slate-700'}`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Quel poste visez-vous ?</h2>
              <p className="text-gray-400">L'entretien sera adapte a ce poste</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={form.jobTitle}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                  placeholder="Ex: Developpeur Full Stack Senior"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Entreprise (optionnel)"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Type d'entretien</h2>
              <p className="text-gray-400">Choisissez le format de l'entretien</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {interviewTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setForm({ ...form, interviewType: type.id })}
                  className={`p-6 rounded-2xl text-left transition-all border ${
                    form.interviewType === type.id
                      ? 'bg-cyan-500/20 border-cyan-500'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mb-3 ${
                    form.interviewType === type.id ? 'text-cyan-400' : 'text-gray-400'
                  }`} />
                  <h3 className="font-semibold mb-1">{type.label}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Recapitulatif</h2>
              <p className="text-gray-400">Verifiez vos choix avant de commencer</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Poste</span>
                <span className="font-medium text-cyan-400">{form.jobTitle}</span>
              </div>
              {form.company && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Entreprise</span>
                  <span className="font-medium">{form.company}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Type</span>
                <span className="font-medium">
                  {interviewTypes.find(t => t.id === form.interviewType)?.label}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="font-semibold mb-2">Conseils avant de commencer</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Installez-vous dans un endroit calme</li>
                <li>Verifiez votre microphone</li>
                <li>Preparez des exemples concrets (methode STAR)</li>
                <li>L'entretien dure environ 10-15 minutes</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between mt-12">
        {step > 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Retour
          </motion.button>
        ) : <div />}

        {step < 3 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => canProceed && setStep(step + 1)}
            disabled={!canProceed}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuer
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Preparation...' : "Lancer l'entretien"}
            <Sparkles className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  )
}