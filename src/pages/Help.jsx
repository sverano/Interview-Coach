import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Video, Mic, Settings, CreditCard, Shield, ExternalLink } from 'lucide-react'

const guides = [
  { icon: Mic, title: 'Demarrer un entretien', description: 'Apprenez a lancer votre premiere simulation', link: '#' },
  { icon: BookOpen, title: 'Comprendre les feedbacks', description: "Decouvrez comment interpreter vos scores et conseils", link: '#' },
  { icon: Video, title: 'Optimiser votre micro', description: 'Conseils pour une meilleure qualite audio', link: '#' },
  { icon: Settings, title: 'Gerer votre compte', description: 'Parametres, preferences et notifications', link: '#' },
  { icon: CreditCard, title: 'Facturation et abonnements', description: 'Gerez vos paiements et changez de plan', link: '#' },
  { icon: Shield, title: 'Securite et confidentialite', description: 'Vos donnees sont protegees', link: '#' }
]

const popularArticles = [
  'Comment preparer un entretien technique ?',
  "La methode STAR : guide complet",
  'Questions comportementales les plus courantes',
  'Erreurs a eviter en entretien',
  'Comment gerer le stress en entretien'
]

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Centre d'aide</h1>
          <p className="text-gray-400 mb-8">Comment pouvons-nous vous aider ?</p>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Guides populaires</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <motion.a
                key={i}
                href={guide.link}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <guide.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{guide.title}</h3>
                <p className="text-gray-400 text-sm">{guide.description}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Articles populaires</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 divide-y divide-white/10">
            {popularArticles.map((article, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
              >
                <span>{article}</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Besoin d'aide ?</h3>
            <p className="text-gray-400 mb-6">Consultez notre FAQ pour des reponses rapides</p>
            <Link to="/faq" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
              Voir la FAQ
            </Link>
          </div>
          <div className="p-8 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-2xl border border-cyan-500/20">
            <h3 className="text-xl font-semibold mb-2">Contacter le support</h3>
            <p className="text-gray-400 mb-6">Notre equipe repond sous 24h</p>
            <Link to="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold rounded-xl">
              Nous contacter
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}