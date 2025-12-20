import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-9xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            404
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-gray-400 mb-8">
          Oups ! La page que vous recherchez n'existe pas ou a ete deplacee.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Accueil
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            Pages utiles
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/app" className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Application
            </Link>
            <Link to="/faq" className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              FAQ
            </Link>
            <Link to="/help" className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Aide
            </Link>
            <Link to="/contact" className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}