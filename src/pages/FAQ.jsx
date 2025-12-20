import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowLeft } from 'lucide-react'

const faqs = [
  {
    category: 'General',
    questions: [
      { q: "Qu'est-ce qu'Interview Coach AI ?", a: "Interview Coach AI est une plateforme d'entrainement aux entretiens utilisant l'intelligence artificielle. Elle simule des entretiens realistes avec un coach vocal et fournit des feedbacks personnalises pour ameliorer vos performances." },
      { q: 'Comment fonctionne la simulation ?', a: "Vous selectionnez le type d'entretien et le poste vise. Notre IA genere des questions adaptees et vous interagissez vocalement. A la fin, vous recevez une analyse detaillee de vos reponses." },
      { q: "L'IA comprend-elle toutes les langues ?", a: "Actuellement, notre plateforme est optimisee pour le francais. Le support d'autres langues est en cours de developpement." }
    ]
  },
  {
    category: 'Compte et facturation',
    questions: [
      { q: 'Comment creer un compte ?', a: "Cliquez sur 'Commencer' en haut de la page et suivez les instructions. Vous pouvez vous inscrire avec votre email ou votre compte Google." },
      { q: 'Puis-je annuler mon abonnement ?', a: "Oui, vous pouvez annuler a tout moment depuis les parametres de votre compte. L'acces reste actif jusqu'a la fin de la periode payee." },
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes Visa, Mastercard, American Express ainsi que PayPal.' }
    ]
  },
  {
    category: 'Fonctionnalites',
    questions: [
      { q: "Quels types d'entretiens sont disponibles ?", a: 'Nous proposons 4 types : comportemental (RH), technique, etude de cas et mixte. Chaque type est adapte aux standards du secteur.' },
      { q: 'Puis-je revoir mes entretiens passes ?', a: "Oui, tous vos entretiens sont sauvegardes dans votre historique. Vous pouvez revoir les transcripts et feedbacks a tout moment." },
      { q: 'Comment sont calcules les scores ?', a: "Notre IA analyse plusieurs criteres : clarte, structure (methode STAR), confiance percue et pertinence des exemples. Chaque critere est note sur 10." }
    ]
  }
]

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <h1 className="text-4xl font-bold mb-4">Questions frequentes</h1>
        <p className="text-gray-400 mb-12">Trouvez des reponses aux questions les plus courantes</p>

        {faqs.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-xl font-semibold text-cyan-400 mb-6">{section.category}</h2>
            <div className="bg-white/5 rounded-2xl px-6 border border-white/10">
              {section.questions.map((item, j) => (
                <FAQItem key={j} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-2xl border border-cyan-500/20 text-center">
          <h3 className="text-xl font-semibold mb-2">Vous n'avez pas trouve votre reponse ?</h3>
          <p className="text-gray-400 mb-6">Notre equipe est la pour vous aider</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold rounded-xl">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}