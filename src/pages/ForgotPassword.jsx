import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle, KeyRound, ShieldCheck, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  const steps = [
    { icon: Mail, title: 'Entrez votre email', desc: 'Utilisez l\'email de votre compte' },
    { icon: KeyRound, title: 'Recevez le lien', desc: 'Verifiez votre boite de reception' },
    { icon: Lock, title: 'Nouveau mot de passe', desc: 'Creez un mot de passe securise' },
    { icon: ShieldCheck, title: 'Compte securise', desc: 'Connectez-vous a nouveau' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Side - Description */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Interview Coach AI
            </h1>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight">
            Recuperez l'acces<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              a votre compte
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-md">
            Pas de panique ! Suivez ces etapes simples pour reinitialiser votre mot de passe en toute securite.
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 w-0.5 h-6 bg-gradient-to-b from-cyan-500/20 to-transparent -translate-x-1/2" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                      Etape {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mt-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Interview Coach AI
              </h1>
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Email envoye !</h2>
                <p className="text-gray-400 mb-6">
                  Verifiez votre boite mail et suivez les instructions pour reinitialiser votre mot de passe.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Vous n'avez pas recu l'email ? Verifiez vos spams ou{' '}
                  <button
                    onClick={() => setSent(false)}
                    className="text-cyan-400 hover:underline"
                  >
                    reessayez
                  </button>
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:underline font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour a la connexion
                </Link>
              </motion.div>
            ) : (
              <>
                <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Link>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                    <KeyRound className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Mot de passe oublie ?</h2>
                  <p className="text-gray-400">
                    Entrez votre email et nous vous enverrons un lien pour le reinitialiser.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vous@exemple.com"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl disabled:opacity-50"
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                  </motion.button>
                </form>

                <p className="mt-8 text-center text-gray-400">
                  Vous vous souvenez ?{' '}
                  <Link to="/login" className="text-cyan-400 hover:underline">
                    Se connecter
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}