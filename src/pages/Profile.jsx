import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Mail, Lock, Bell, Globe, Mic, Volume2, Moon, Sun,
  Camera, Save, ArrowLeft, Shield, Trash2, LogOut, Check,
  ChevronRight, Eye, EyeOff, AlertCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('account')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Account state
  const [profile, setProfile] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    company: '',
    jobTitle: ''
  })

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    language: 'fr',
    theme: 'dark',
    voiceSpeed: 1,
    voiceVolume: 80,
    autoTranscript: true,
    soundEffects: true
  })

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailResults: true,
    emailTips: true,
    emailNewsletter: false,
    pushReminders: true,
    pushResults: true
  })

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfile(prev => ({
        ...prev,
        fullName: data.full_name || '',
        phone: data.phone || '',
        company: data.company || '',
        jobTitle: data.job_title || ''
      }))
      if (data.preferences) {
        setPreferences(data.preferences)
      }
      if (data.notifications) {
        setNotifications(data.notifications)
      }
    }
  }

  const saveProfile = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.fullName,
          phone: profile.phone,
          company: profile.company,
          job_title: profile.jobTitle,
          preferences,
          notifications,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      setSuccess('Profil mis a jour avec succes')
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  const updatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (passwords.new.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caracteres')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      })

      if (error) throw error
      setSuccess('Mot de passe mis a jour avec succes')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  const deleteAccount = async () => {
    if (!confirm('Etes-vous sur de vouloir supprimer votre compte ? Cette action est irreversible.')) {
      return
    }

    try {
      // Delete user data
      await supabase.from('interviews').delete().eq('user_id', user.id)
      await supabase.from('profiles').delete().eq('id', user.id)

      // Sign out
      await signOut()
    } catch (err) {
      setError(err.message)
    }
  }

  const tabs = [
    { id: 'account', label: 'Compte', icon: User },
    { id: 'security', label: 'Securite', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/app" className="p-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Mon Profil</h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Deconnexion
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-10"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-3xl font-bold text-slate-900">
              {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-slate-700 rounded-full border-2 border-slate-800 hover:bg-slate-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.fullName || 'Utilisateur'}</h2>
            <p className="text-gray-400">{user?.email}</p>
            {profile.jobTitle && profile.company && (
              <p className="text-cyan-400 text-sm mt-1">{profile.jobTitle} chez {profile.company}</p>
            )}
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-400">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6"
        >
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6">Informations personnelles</h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Poste actuel</label>
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    placeholder="Developpeur Full Stack"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Entreprise</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    placeholder="Google"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telephone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProfile}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </motion.button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-6">Changer le mot de passe</h3>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirmer le mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={updatePassword}
                    disabled={loading || !passwords.new || !passwords.confirm}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl disabled:opacity-50"
                  >
                    {loading ? 'Mise a jour...' : 'Mettre a jour'}
                  </motion.button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Zone dangereuse</h3>
                <p className="text-gray-400 text-sm mb-4">
                  La suppression de votre compte est irreversible. Toutes vos donnees seront perdues.
                </p>
                <button
                  onClick={deleteAccount}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer mon compte
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold mb-6">Preferences de l'application</h3>

              {/* Language */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Langue</label>
                <div className="flex gap-3">
                  {[
                    { code: 'fr', label: 'Francais', flag: '🇫🇷' },
                    { code: 'en', label: 'English', flag: '🇬🇧' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setPreferences({ ...preferences, language: lang.code })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                        preferences.language === lang.code
                          ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Theme</label>
                <div className="flex gap-3">
                  {[
                    { id: 'dark', label: 'Sombre', icon: Moon },
                    { id: 'light', label: 'Clair', icon: Sun }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setPreferences({ ...preferences, theme: theme.id })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                        preferences.theme === theme.id
                          ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <theme.icon className="w-4 h-4" />
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Speed */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">
                  Vitesse de la voix : {preferences.voiceSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={preferences.voiceSpeed}
                  onChange={(e) => setPreferences({ ...preferences, voiceSpeed: parseFloat(e.target.value) })}
                  className="w-full max-w-md h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-gray-500 max-w-md mt-1">
                  <span>0.5x</span>
                  <span>1x</span>
                  <span>1.5x</span>
                  <span>2x</span>
                </div>
              </div>

              {/* Volume */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Volume2 className="w-4 h-4" />
                  Volume : {preferences.voiceVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.voiceVolume}
                  onChange={(e) => setPreferences({ ...preferences, voiceVolume: parseInt(e.target.value) })}
                  className="w-full max-w-md h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl max-w-md">
                  <div>
                    <p className="font-medium">Transcription automatique</p>
                    <p className="text-sm text-gray-400">Afficher le texte en temps reel</p>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, autoTranscript: !preferences.autoTranscript })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.autoTranscript ? 'bg-cyan-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.autoTranscript ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl max-w-md">
                  <div>
                    <p className="font-medium">Effets sonores</p>
                    <p className="text-sm text-gray-400">Sons de notification</p>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, soundEffects: !preferences.soundEffects })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.soundEffects ? 'bg-cyan-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProfile}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </motion.button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-6">Notifications par email</h3>
                <div className="space-y-4 max-w-md">
                  {[
                    { key: 'emailResults', label: 'Resultats d\'entretien', desc: 'Recevez vos feedbacks par email' },
                    { key: 'emailTips', label: 'Conseils hebdomadaires', desc: 'Astuces pour ameliorer vos entretiens' },
                    { key: 'emailNewsletter', label: 'Newsletter', desc: 'Nouveautes et mises a jour' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-cyan-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Notifications push</h3>
                <div className="space-y-4 max-w-md">
                  {[
                    { key: 'pushReminders', label: 'Rappels d\'entrainement', desc: 'Ne manquez pas vos sessions' },
                    { key: 'pushResults', label: 'Resultats instantanes', desc: 'Notification a la fin de l\'entretien' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-cyan-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProfile}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}