'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Globe, RotateCcw, Bot, User } from 'lucide-react'
import { cn, SUPPORTED_LANGUAGES, type LangCode } from '@/lib/utils'
import type { ChatMessage } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = [
  'What documents do I need for an FRA claim?',
  'How long does the claim process take?',
  'What is the role of Gram Sabha in FRA?',
  'Can I claim rights in a Wildlife Sanctuary?',
  'What happens if my claim is rejected?',
]

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init',
  role: 'assistant',
  content: 'Namaste! I am VanadhikarAI — your expert guide to the Forest Rights Act 2006. Ask me anything about filing claims, required documents, your legal rights, or the FRA process. I can respond in Hindi, Bengali, Odia, and other Indian languages too.',
  timestamp: new Date(0),
}

export default function ChatPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [language, setLanguage]       = useState<LangCode>('en')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    setInput('')

    const now = new Date()
    const userId = `u-${now.getTime()}`
    const aiId   = `a-${now.getTime()}`

    const userMsg: ChatMessage = {
      id: userId,
      role: 'user',
      content,
      timestamp: now,
    }

    const aiMsg: ChatMessage = {
      id: aiId,
      role: 'assistant',
      content: '',
      timestamp: now,
    }

    setMessages(prev => [...prev, userMsg, aiMsg])
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content }],
          language,
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        const snapshot = accumulated
        setMessages(prev =>
          prev.map(m => m.id === aiId ? { ...m, content: snapshot } : m)
        )
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === aiId
            ? { ...m, content: 'Sorry, something went wrong. Please try again.' }
            : m
        )
      )
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, language])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === language)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Panel */}
      <div className={cn(
        'fixed right-0 top-0 h-screen w-full max-w-md bg-stone-900 border-l border-stone-800/60 z-40 flex flex-col transition-transform duration-300 ease-out',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-800/60">
          <div className="w-9 h-9 rounded-xl bg-green-900/50 border border-green-800/50 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex-1">
            <div className="text-stone-200 text-sm font-semibold">VanadhikarAI</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-stone-500 text-xs">FRA Expert · Online</span>
            </div>
          </div>

          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(v => !v)}
              className="flex items-center gap-1.5 text-stone-400 hover:text-stone-200 text-xs px-2.5 py-1.5 rounded-lg border border-stone-700/60 hover:border-stone-600 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              {selectedLang?.nativeName}
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {SUPPORTED_LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setShowLangMenu(false) }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors',
                      language === l.code
                        ? 'bg-green-900/50 text-green-300'
                        : 'text-stone-400 hover:bg-stone-700/50 hover:text-stone-200'
                    )}
                  >
                    <span>{l.name}</span>
                    <span className="text-stone-600">{l.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMessages([INITIAL_MESSAGE])}
            className="text-stone-600 hover:text-stone-400 transition-colors"
            title="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-green-900/50 border border-green-800/50 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-green-400" />
                </div>
              )}

              <div className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-green-800/40 text-stone-200 rounded-tr-sm'
                  : 'bg-stone-800/60 text-stone-300 rounded-tl-sm'
              )}>
                {msg.role === 'assistant' && msg.content === '' && loading ? (
                  <div className="flex gap-1 py-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-green-600 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-5 pb-3">
            <p className="text-stone-600 text-xs mb-2 font-medium">Try asking:</p>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-xs px-3 py-2 rounded-xl border border-stone-800 text-stone-500 hover:text-stone-300 hover:border-green-800/50 hover:bg-green-950/20 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-5 py-4 border-t border-stone-800/60">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about FRA rights, documents, process..."
              rows={1}
              className="flex-1 bg-stone-800/60 border border-stone-700/60 rounded-xl px-4 py-3 text-sm text-stone-200 placeholder-stone-600 resize-none focus:outline-none focus:border-green-600/50 transition-colors leading-relaxed"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-green-700 hover:bg-green-600 disabled:bg-stone-800 disabled:text-stone-700 text-white flex items-center justify-center transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-stone-700 text-xs mt-2 text-center">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  )
}