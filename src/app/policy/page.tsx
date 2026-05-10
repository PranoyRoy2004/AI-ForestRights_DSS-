'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Search, Scale, BookOpen, ChevronRight, Loader2, Lightbulb } from 'lucide-react'

const FRA_SECTIONS = [
  { id: 'S2',  title: 'Section 2 - Definitions',            summary: 'Defines Forest Dwelling Scheduled Tribes, Other Traditional Forest Dwellers, forest land, minor forest produce, and habitat.' },
  { id: 'S3',  title: 'Section 3 - Forest Rights',          summary: 'Enumerates 13 types of rights recognised under FRA including individual, community, and habitat rights.' },
  { id: 'S4',  title: 'Section 4 - Recognition Process',    summary: 'Provides for vesting of forest rights. Covers procedure for National Parks and Wildlife Sanctuaries.' },
  { id: 'S5',  title: 'Section 5 - Duties of Holders',      summary: 'Defines duties of forest rights holders to protect forests, biodiversity, and wildlife.' },
  { id: 'S6',  title: 'Section 6 - Authorities and Process',summary: 'Establishes Gram Sabha, Sub-Divisional, District, and State Level committees and their roles.' },
  { id: 'S7',  title: 'Section 7 - Offences and Penalties', summary: 'Penal provisions for officials who obstruct or fail to implement forest rights.' },
  { id: 'R2',  title: 'Rule 2 - Gram Sabha Procedures',     summary: 'Minimum quorum, conduct of meetings, and record-keeping requirements for Gram Sabha under FRA.' },
  { id: 'R12', title: 'Rule 12 - Critical Wildlife Habitat', summary: 'Process for determination of Critical Wildlife Habitats, ensuring rights are settled before notification.' },
]

const QUICK_QUESTIONS = [
  'What is the cutoff date for FRA claims?',
  'Who qualifies as Other Traditional Forest Dwellers?',
  'What is the maximum land area for individual claims?',
  'Can claims be filed in National Parks?',
  'What documents prove 3-generation habitation?',
  'What happens if Gram Sabha rejects a claim?',
  'What are Community Forest Resource rights?',
  'How are Particularly Vulnerable Tribal Groups treated?',
]

export default function PolicyPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [asked, setAsked]       = useState('')

  const askPolicy = async (q?: string) => {
    const query = (q ?? question).trim()
    if (!query || loading) return
    setLoading(true)
    setAnswer('')
    setAsked(query)
    setQuestion('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `As an FRA 2006 policy expert, answer this question with legal accuracy. Cite the relevant section or rule number. Keep the answer clear and structured. Question: ${query}`,
          }],
          language: 'en',
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setAnswer(full)
      }
    } catch {
      setAnswer('Failed to get answer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0a09' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, minWidth: 0 }}>
        <Header title="Policy Engine" subtitle="AI-powered Forest Rights Act 2006 legal knowledge base" />

        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>

          {/* Left - Q&A */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Search box */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Lightbulb style={{ width: 18, height: 18, color: '#fbbf24' }} />
                <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '16px' }}>Ask the Policy Engine</h2>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#57534e' }} />
                  <input
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && askPolicy()}
                    placeholder="Ask any question about FRA 2006..."
                    style={{ width: '100%', background: 'rgba(41,37,36,0.5)', border: '1px solid rgba(68,64,60,0.5)', borderRadius: '12px', padding: '12px 12px 12px 38px', fontSize: '14px', color: '#d6d3d1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <button
                  onClick={() => askPolicy()}
                  disabled={!question.trim() || loading}
                  style={{ padding: '12px 20px', borderRadius: '12px', background: question.trim() && !loading ? '#15803d' : '#292524', border: 'none', color: question.trim() && !loading ? 'white' : '#57534e', fontSize: '14px', fontWeight: 500, cursor: question.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                >
                  {loading
                    ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Thinking...</>
                    : <><Scale style={{ width: 16, height: 16 }} /> Ask</>
                  }
                </button>
              </div>
            </div>

            {/* Answer */}
            {(answer || loading) && (
              <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ color: '#57534e', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Q: {asked}
                </div>
                {loading && !answer ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[90, 75, 85, 60, 70].map((w, i) => (
                      <div key={i} className="shimmer" style={{ height: '14px', borderRadius: '7px', width: `${w}%` }} />
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#d6d3d1', fontSize: '14px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {answer}
                  </div>
                )}
              </div>
            )}

            {/* Quick questions */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ color: '#a8a29e', fontWeight: 600, margin: '0 0 16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Common Questions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => askPolicy(q)}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(68,64,60,0.4)', cursor: loading ? 'not-allowed' : 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(20,83,45,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <ChevronRight style={{ width: 14, height: 14, color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#78716c', fontSize: '12px', lineHeight: 1.5 }}>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - FRA Sections Reference */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BookOpen style={{ width: 16, height: 16, color: '#4ade80' }} />
                <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '14px' }}>FRA 2006 Reference</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FRA_SECTIONS.map(sec => (
                  <button
                    key={sec.id}
                    onClick={() => askPolicy(`Explain ${sec.title} of the Forest Rights Act 2006 in detail with examples.`)}
                    disabled={loading}
                    style={{ width: '100%', textAlign: 'left', padding: '12px', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(68,64,60,0.4)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(20,83,45,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(20,83,45,0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(68,64,60,0.4)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#4ade80', background: 'rgba(20,83,45,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        {sec.id}
                      </span>
                      <ChevronRight style={{ width: 12, height: 12, color: '#44403c' }} />
                    </div>
                    <div style={{ color: '#d6d3d1', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>{sec.title}</div>
                    <div style={{ color: '#57534e', fontSize: '11px', lineHeight: 1.5 }}>{sec.summary}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}