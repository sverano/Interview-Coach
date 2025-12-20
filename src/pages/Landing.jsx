import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, Brain, BarChart3, Zap, CheckCircle2, ArrowRight, Star, Users, Clock } from 'lucide-react'

const features = [
  { icon: Mic, title: 'Entretiens vocaux IA', description: 'Simulez des entretiens realistes avec un coach vocal intelligent' },
  { icon: Brain, title: 'Feedback personnalise', description: "Analyse detaillee de vos reponses et conseils d'amelioration" },
  { icon: BarChart3, title: 'Suivi de progression', description: 'Visualisez votre evolution au fil des entrainements' },
  { icon: Zap, title: 'Adaptatif', description: "Questions adaptees au poste et a l'entreprise cibles" }
]

const stats = [
  { value: '10K+', label: 'Utilisateurs', icon: Users },
  { value: '50K+', label: 'Entretiens', icon: Mic },
  { value: '85%', label: 'Taux de reussite', icon: CheckCircle2 }
]

const testimonials = [
  { name: 'Marie L.', role: 'Product Manager', text: "Grace a Interview Coach, j'ai decroche mon poste chez Google !", rating: 5 },
  { name: 'Thomas D.', role: 'Developpeur Senior', text: "L'IA m'a aide a structurer mes reponses avec la methode STAR.", rating: 5 },
  { name: 'Sophie M.', role: 'Data Scientist', text: 'Les feedbacks sont incroyablement pertinents et constructifs.', rating: 5 }
]

const pricingPlans = [
  { name: 'Gratuit', price: '0', features: ['3 entretiens/mois', 'Feedback de base', 'Historique 7 jours'], cta: 'Commencer', popular: false },
  { name: 'Pro', price: '19', features: ['Entretiens illimites', 'Feedback avance', 'Historique illimite', 'Export PDF'], cta: 'Essai gratuit', popular: true },
  { name: 'Entreprise', price: '99', features: ['Tout Pro', 'Multi-utilisateurs', 'API Access', 'Support prioritaire'], cta: 'Contacter', popular: false }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Interview Coach AI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalites</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Temoignages</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Connexion</Link>
            <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold rounded-lg">
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-8">
              <Zap className="w-4 h-4" />
              Propulse par Google Cloud AI + ElevenLabs
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Preparez vos entretiens avec un{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                coach vocal IA
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Simulez des entretiens realistes, recevez des feedbacks personnalises et decrochez le job de vos reves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2"
                >
                  Essayer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="#features">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  Decouvrir
                </motion.button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl p-8 border border-white/10">
              <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Mic className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Entretien en cours</p>
                    <p className="text-sm text-gray-400">Developpeur Full Stack - Google</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">05:32</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                    <p className="text-sm text-gray-400 mb-1">Coach</p>
                    <p>Parlez-moi d'une situation ou vous avez du resoudre un probleme technique complexe.</p>
                  </div>
                  <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 ml-12">
                    <p className="text-sm text-gray-400 mb-1">Vous</p>
                    <p>Dans mon precedent poste, j'ai du optimiser une requete SQL qui prenait 30 secondes...</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fonctionnalites</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour reussir vos entretiens
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ce qu'ils en pensent</h2>
            <p className="text-gray-400">Des milliers d'utilisateurs ont ameliore leurs performances</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-800/50 rounded-2xl border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tarifs simples</h2>
            <p className="text-gray-400">Choisissez le plan adapte a vos besoins</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${plan.popular ? 'bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border-cyan-500' : 'bg-white/5 border-white/10'}`}
              >
                {plan.popular && (
                  <span className="px-3 py-1 bg-cyan-500 text-slate-900 text-sm font-semibold rounded-full">Populaire</span>
                )}
                <h3 className="text-xl font-bold mt-4">{plan.name}</h3>
                <p className="text-4xl font-bold mt-4">
                  {plan.price}€<span className="text-lg text-gray-400">/mois</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-xl font-semibold ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900' : 'bg-white/10 hover:bg-white/20'}`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pret a decrocher votre prochain job ?</h2>
          <p className="text-gray-400 mb-10">Rejoignez des milliers de candidats qui ont booste leur confiance en entretien.</p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl text-lg"
            >
              Commencer gratuitement
            </motion.button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400">2024 Interview Coach AI. Tous droits reserves.</p>
          <div className="flex gap-6">
            <Link to="/about" className="text-gray-400 hover:text-white">A propos</Link>
            <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
            <Link to="/help" className="text-gray-400 hover:text-white">Aide</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}