import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, Heart, Zap, Users, Globe, Award } from 'lucide-react'

const values = [
  { icon: Target, title: 'Excellence', description: "Nous visons l'excellence dans chaque aspect de notre produit" },
  { icon: Heart, title: 'Empathie', description: 'Nous comprenons le stress des entretiens et nous vous accompagnons' },
  { icon: Zap, title: 'Innovation', description: "Nous utilisons les dernieres avancees en IA pour vous aider" }
]

const team = [
  { name: 'Marie Chen', role: 'CEO & Co-fondatrice', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Thomas Martin', role: 'CTO & Co-fondateur', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Sophie Dubois', role: 'Head of AI', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' }
]

const milestones = [
  { year: '2023', event: 'Lancement de la beta' },
  { year: '2024', event: '10 000 utilisateurs' },
  { year: '2024', event: 'Integration ElevenLabs & Google Cloud' },
  { year: '2025', event: 'Expansion internationale' }
]

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6">Notre mission</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Democratiser l'acces a un coaching d'entretien de qualite grace a l'intelligence artificielle.
              Nous croyons que tout le monde merite les meilleures chances de reussir.
            </p>
          </motion.div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <value.icon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">L'equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 overflow-hidden">
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Notre parcours</h2>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-500" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-full bg-white/10" />}
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">{milestone.year}</span>
                  <p className="text-lg">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
            <Globe className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
            <p className="text-3xl font-bold mb-2">15+</p>
            <p className="text-gray-400">Pays</p>
          </div>
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
            <Users className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
            <p className="text-3xl font-bold mb-2">10K+</p>
            <p className="text-gray-400">Utilisateurs</p>
          </div>
          <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
            <Award className="w-10 h-10 mx-auto text-cyan-400 mb-4" />
            <p className="text-3xl font-bold mb-2">85%</p>
            <p className="text-gray-400">Taux de reussite</p>
          </div>
        </section>

        <section className="text-center p-12 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl border border-cyan-500/20">
          <h2 className="text-3xl font-bold mb-4">Rejoignez l'aventure</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Nous recrutons des talents passionnes par l'IA et l'education.
          </p>
          <a href="mailto:careers@interviewcoach.ai" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl">
            Voir les offres
          </a>
        </section>
      </div>
    </div>
  )
}