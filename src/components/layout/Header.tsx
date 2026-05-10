'use client'
import { useState } from 'react'
import { Bell, Search, Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES, type LangCode } from '@/lib/utils'

interface HeaderProps {
  title: string
  subtitle?: string
  onChatOpen?: () => void
}

export default function Header({ title, subtitle, onChatOpen }: HeaderProps) {
  const [language, setLanguage]       = useState<LangCode>('en')
  const [showLang, setShowLang]       = useState(false)
  const [showSearch, setShowSearch]   = useState(false)
  const [searchVal, setSearchVal]     = useState('')

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === language)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/50">

      {/* Left: title */}
      <div>
        <h1 className="text-xl font-bold text-stone-100 leading-tight">{title}</h1>
        {subtitle && <p className="text-stone-600 text-xs mt-0.5">{subtitle}</p>}
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <input
              autoFocus
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onBlur={() => { setShowSearch(false); setSearchVal('') }}
              placeholder="Search cases, documents..."
              className="w-56 bg-stone-800/80 border border-stone-700/60 rounded-xl px-4 py-2 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-green-600/50 transition-all"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="w-9 h-9 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/50 flex items-center justify-center text-stone-500 hover:text-stone-300 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Language picker */}
        <div className="relative">
          <button
            onClick={() => setShowLang(v => !v)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/50 text-stone-400 hover:text-stone-200 text-xs transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{selectedLang?.nativeName}</span>
          </button>

          {showLang && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-stone-900 border border-stone-700/60 rounded-xl shadow-2xl z-50 overflow-hidden">
              {SUPPORTED_LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLanguage(l.code); setShowLang(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors ${language === l.code ? 'bg-green-900/40 text-green-300' : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'}`}
                >
                  <span>{l.name}</span>
                  <span className="text-stone-600">{l.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900/50 flex items-center justify-center text-stone-500 hover:text-stone-300 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-500 border border-stone-900" />
        </button>

        {/* AI Button */}
        {onChatOpen && (
          <button
            onClick={onChatOpen}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-green-900/30"
          >
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            AI Assistant
          </button>
        )}
      </div>
    </header>
  )
}