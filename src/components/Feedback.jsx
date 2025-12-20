export default function Feedback({ data, transcript, onRestart }) {
  const ScoreBar = ({ score }) => (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-emerald-400 font-bold w-12 text-right">{score}/10</span>
    </div>
  )

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <h3 className="text-2xl font-bold text-cyan-400 mb-8">Analyse de votre entretien</h3>

      <div className="space-y-6 mb-8">
        <div>
          <span className="text-gray-400 text-sm">Clarte des reponses</span>
          <ScoreBar score={data.clarity} />
        </div>
        <div>
          <span className="text-gray-400 text-sm">Structure (methode STAR)</span>
          <ScoreBar score={data.structure} />
        </div>
        <div>
          <span className="text-gray-400 text-sm">Confiance percue</span>
          <ScoreBar score={data.confidence} />
        </div>
        <div>
          <span className="text-gray-400 text-sm">Pertinence des exemples</span>
          <ScoreBar score={data.relevance} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
          <h4 className="text-emerald-400 font-semibold mb-3">Points forts</h4>
          <ul className="space-y-2">
            {data.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-400 mt-0.5">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/20">
          <h4 className="text-red-400 font-semibold mb-3">Axes d'amelioration</h4>
          <ul className="space-y-2">
            {data.improvements?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-red-400 mt-0.5">-</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/20 mb-8">
        <h4 className="text-cyan-400 font-semibold mb-2">Conseil principal</h4>
        <p className="text-gray-300">{data.mainAdvice}</p>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200"
      >
        Nouvel entretien
      </button>
    </div>
  )
}