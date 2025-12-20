import { useState, useEffect, useRef, useCallback } from 'react'
import { useConversation } from '@elevenlabs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Phone, PhoneOff, Volume2, Clock, MessageSquare, RefreshCw, AlertCircle } from 'lucide-react'

export default function InterviewSession({ config, onEnd }) {
  const [transcript, setTranscript] = useState([])
  const [isStarted, setIsStarted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const transcriptRef = useRef(null)
  const timerRef = useRef(null)
  const hasEndedRef = useRef(false)

  const conversation = useConversation({
    onConnect: () => {
      console.log('[ElevenLabs] === CONNECTED ===')
      console.log('[ElevenLabs] Timestamp:', new Date().toISOString())
      setConnectionError(null)
    },
    onDisconnect: () => {
      console.log('[ElevenLabs] === DISCONNECTED ===')
      console.log('[ElevenLabs] Timestamp:', new Date().toISOString())
      console.log('[ElevenLabs] isStarted:', isStarted)
      console.log('[ElevenLabs] transcript length:', transcript.length)
    },
    onMessage: (message) => {
      console.log('[ElevenLabs] === MESSAGE ===')
      console.log('[ElevenLabs] Full message object:', JSON.stringify(message, null, 2))
      console.log('[ElevenLabs] source:', message.source)
      console.log('[ElevenLabs] message:', message.message)
      console.log('[ElevenLabs] type:', message.type)

      if (message.message) {
        setTranscript(prev => [...prev, {
          role: message.source === 'ai' ? 'agent' : 'user',
          text: message.message,
          timestamp: Date.now()
        }])
      }
    },
    onError: (error) => {
      console.error('[ElevenLabs] === ERROR ===')
      console.error('[ElevenLabs] Error object:', error)
      console.error('[ElevenLabs] Error message:', error?.message)
      console.error('[ElevenLabs] Error code:', error?.code)
      console.error('[ElevenLabs] Error type:', typeof error)
      setConnectionError(error?.message || 'Erreur de connexion')
    },
    onStatusChange: (status) => {
      console.log('[ElevenLabs] === STATUS CHANGE ===')
      console.log('[ElevenLabs] New status:', status)
      console.log('[ElevenLabs] Timestamp:', new Date().toISOString())
    },
    onModeChange: (mode) => {
      console.log('[ElevenLabs] === MODE CHANGE ===')
      console.log('[ElevenLabs] New mode:', mode)
    }
  })

  const startConversation = useCallback(async () => {
    try {
      setConnectionError(null)
      hasEndedRef.current = false

      // Demander acces microphone
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Demarrer la session ElevenLabs
      await conversation.startSession({ agentId: config.agentId })

      setIsStarted(true)
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    } catch (error) {
      console.error('Failed to start:', error)
      if (error.name === 'NotAllowedError') {
        setConnectionError('Acces au microphone refuse. Veuillez autoriser l\'acces.')
      } else {
        setConnectionError('Impossible de demarrer: ' + (error.message || 'Erreur inconnue'))
      }
    }
  }, [config.agentId, conversation])

  const handleReconnect = useCallback(async () => {
    try {
      setConnectionError(null)

      // Terminer la session existante si besoin
      try {
        await conversation.endSession()
      } catch (e) {
        // Ignorer les erreurs de fermeture
      }

      // Attendre un peu
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redemarrer
      await conversation.startSession({ agentId: config.agentId })
    } catch (error) {
      console.error('Reconnection failed:', error)
      setConnectionError('Echec de reconnexion: ' + (error.message || 'Erreur inconnue'))
    }
  }, [config.agentId, conversation])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleEnd = async () => {
    if (hasEndedRef.current) return
    hasEndedRef.current = true

    if (timerRef.current) clearInterval(timerRef.current)

    try {
      await conversation.endSession()
    } catch (e) {
      console.log('Session end error:', e)
    }

    onEnd(transcript)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const isConnected = conversation.status === 'connected'
  const isConnecting = conversation.status === 'connecting'

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10">
              <Mic className="w-16 h-16 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Pret pour l'entretien ?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Assurez-vous d'etre dans un endroit calme. L'entretien durera environ 10-15 minutes.
            </p>

            {connectionError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm max-w-md mx-auto">
                {connectionError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startConversation}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Commencer l'entretien
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Status Bar */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-emerald-400 animate-pulse' :
                  isConnecting ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                }`} />
                <span className="font-medium">
                  {isConnected ? 'En direct' : isConnecting ? 'Connexion...' : 'Deconnecte'}
                </span>
                {!isConnected && !isConnecting && (
                  <button
                    onClick={handleReconnect}
                    className="ml-2 p-2 bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    title="Reconnecter"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>{transcript.length}</span>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {connectionError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm flex-1">{connectionError}</p>
                <button
                  onClick={handleReconnect}
                  className="px-4 py-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                >
                  Reessayer
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Transcript */}
              <div className="lg:col-span-2">
                <div
                  ref={transcriptRef}
                  className="h-96 bg-white/5 rounded-2xl p-6 overflow-y-auto border border-white/10"
                >
                  {transcript.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        {isConnecting ? (
                          <>
                            <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin" />
                            <p>Connexion en cours...</p>
                          </>
                        ) : isConnected ? (
                          <>
                            <Volume2 className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                            <p>En attente de la premiere question...</p>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                            <p>Connexion perdue</p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transcript.map((entry, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: entry.role === 'agent' ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            entry.role === 'agent'
                              ? 'bg-cyan-500/10 border border-cyan-500/20'
                              : 'bg-emerald-500/10 border border-emerald-500/20'
                          }`}>
                            <p className="text-sm text-gray-400 mb-1">
                              {entry.role === 'agent' ? 'Coach' : 'Vous'}
                            </p>
                            <p>{entry.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="font-semibold mb-4">Poste</h3>
                  <p className="text-cyan-400">{config.jobTitle}</p>
                  {config.company && (
                    <p className="text-gray-400 text-sm mt-1">{config.company}</p>
                  )}
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="font-semibold mb-4">Conseils</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>Parlez clairement et distinctement</li>
                    <li>Utilisez la methode STAR</li>
                    <li>Prenez le temps de reflechir</li>
                    <li>Restez naturel et confiant</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnd}
                className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full flex items-center gap-3"
              >
                <PhoneOff className="w-5 h-5" />
                Terminer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}