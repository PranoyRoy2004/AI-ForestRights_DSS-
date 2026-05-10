'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import {
  Upload, FileText, CheckCircle2,
  AlertTriangle, Loader2, ChevronDown,
  ChevronUp, ClipboardList
} from 'lucide-react'
import type { DocumentAnalysis } from '@/types'

const CLAIM_STEPS = [
  {
    n: 1,
    title: 'Prepare Your Documents',
    desc: 'Gather all required documents before filing. You need identity proof, evidence of forest land occupation before December 13 2005, old photographs, and witness statements from two people.',
  },
  {
    n: 2,
    title: 'Approach the Gram Sabha',
    desc: 'Present your claim to the Gram Sabha (village assembly). A quorum of at least 50% adult members must be present. The Gram Sabha will verify your claim and pass a signed resolution.',
  },
  {
    n: 3,
    title: 'Submit to SDLC',
    desc: 'The Gram Sabha forwards your verified claim to the Sub-Divisional Level Committee (SDLC). Make sure the resolution is signed and stamped properly.',
  },
  {
    n: 4,
    title: 'Field Verification',
    desc: 'An officer will visit the site to verify your occupation. Ensure you are present during the visit and bring your witnesses and any physical evidence.',
  },
  {
    n: 5,
    title: 'DLC Decision',
    desc: 'The District Level Committee (DLC) takes the final decision. You will receive written communication. If rejected you have the right to appeal.',
  },
  {
    n: 6,
    title: 'Title Issuance',
    desc: 'Upon approval the forest rights title is issued jointly (if married) by the Sub-Divisional Officer. Keep this document safely as it is your legal proof.',
  },
]

const DOCUMENTS = [
  'Identity proof (Aadhaar / Voter ID / Ration Card)',
  'Evidence of forest land occupation before Dec 13, 2005',
  'Old photographs showing occupation of land',
  'Gram Sabha resolution (signed and stamped)',
  'Community or village boundary map',
  'Two witness statements (signed)',
  'Self-declaration form',
  'For OTFDs: Proof of 3 generations (75 years) of habitation',
]

export default function ClaimsPage() {
  const [analysis, setAnalysis]   = useState<DocumentAnalysis | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [expanded, setExpanded]   = useState<number | null>(1)
  const [docText, setDocText]     = useState('')
  const [checked, setChecked]     = useState<Record<string, boolean>>({})

  const runAnalysis = async (text: string, fileName: string) => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setAnalysis(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 8000), fileName }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setAnalysis(data)
    } catch {
      setError('Failed to analyze document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    if (!file) return
    const text = await file.text().catch(() => '')
    setDocText(text)
    await runAnalysis(text, file.name)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/*': ['.txt', '.md'] },
    maxFiles: 1,
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0a09' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, minWidth: 0 }}>
        <Header title="File a Claim" subtitle="Step-by-step FRA 2006 claim guidance and document analysis" />

        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Left — Process Guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '16px' }}>FRA Claim Process</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: 0 }}>6 steps from filing to title issuance</p>
            </div>

            {CLAIM_STEPS.map(({ n, title, desc }) => (
              <div key={n} style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', overflow: 'hidden' }}>
                <button
                  onClick={() => setExpanded(expanded === n ? null : n)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(20,83,45,0.3)', border: '1px solid rgba(20,83,45,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontWeight: 600, fontSize: '14px', flexShrink: 0 }}>
                    {n}
                  </div>
                  <span style={{ color: '#e7e5e4', fontSize: '14px', fontWeight: 500, flex: 1 }}>{title}</span>
                  {expanded === n
                    ? <ChevronUp style={{ width: 16, height: 16, color: '#57534e', flexShrink: 0 }} />
                    : <ChevronDown style={{ width: 16, height: 16, color: '#57534e', flexShrink: 0 }} />
                  }
                </button>
                {expanded === n && (
                  <div style={{ padding: '0 16px 16px 64px', color: '#a8a29e', fontSize: '13px', lineHeight: 1.7 }}>
                    {desc}
                  </div>
                )}
              </div>
            ))}

            {/* Checklist */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <ClipboardList style={{ width: 16, height: 16, color: '#4ade80' }} />
                <h3 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '14px' }}>Document Checklist</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DOCUMENTS.map(doc => (
                  <label key={doc} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={!!checked[doc]}
                      onChange={e => setChecked(prev => ({ ...prev, [doc]: e.target.checked }))}
                      style={{ marginTop: '2px', accentColor: '#22c55e', flexShrink: 0 }}
                    />
                    <span style={{ color: checked[doc] ? '#57534e' : '#a8a29e', fontSize: '13px', lineHeight: 1.5, textDecoration: checked[doc] ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                      {doc}
                    </span>
                  </label>
                ))}
              </div>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(41,37,36,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#57534e', fontSize: '12px' }}>
                  {Object.values(checked).filter(Boolean).length} of {DOCUMENTS.length} complete
                </span>
                <div style={{ height: '6px', background: '#292524', borderRadius: '999px', overflow: 'hidden', width: '120px' }}>
                  <div style={{ height: '100%', background: '#16a34a', borderRadius: '999px', width: `${(Object.values(checked).filter(Boolean).length / DOCUMENTS.length) * 100}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Document Analyzer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '16px' }}>AI Document Analyzer</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: 0 }}>Upload your claim document for instant AI analysis</p>
            </div>

            {/* Drop zone */}
            <div
              {...getRootProps()}
              style={{
                border: `2px dashed ${isDragActive ? '#22c55e' : 'rgba(68,64,60,0.6)'}`,
                borderRadius: '16px',
                padding: '40px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragActive ? 'rgba(20,83,45,0.1)' : 'rgba(28,25,23,0.3)',
                transition: 'all 0.2s',
              }}
            >
              <input {...getInputProps()} />
              <Upload style={{ width: 40, height: 40, color: isDragActive ? '#22c55e' : '#44403c', margin: '0 auto 16px' }} />
              <p style={{ color: '#e7e5e4', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>
                {isDragActive ? 'Drop your document here' : 'Upload a claim document'}
              </p>
              <p style={{ color: '#57534e', fontSize: '12px', margin: 0 }}>Drag and drop or click to browse</p>
            </div>

            {/* Paste text */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
              <p style={{ color: '#78716c', fontSize: '12px', margin: '0 0 8px', fontWeight: 500 }}>Or paste document text directly:</p>
              <textarea
                value={docText}
                onChange={e => setDocText(e.target.value)}
                placeholder="Paste the text content of your FRA claim document here..."
                rows={5}
                style={{ width: '100%', background: 'rgba(41,37,36,0.5)', border: '1px solid rgba(68,64,60,0.5)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#d6d3d1', resize: 'vertical', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
              <button
                onClick={() => runAnalysis(docText, 'Pasted Document')}
                disabled={!docText.trim() || loading}
                style={{ marginTop: '12px', width: '100%', padding: '12px', borderRadius: '12px', background: docText.trim() && !loading ? '#15803d' : '#292524', border: 'none', color: docText.trim() && !loading ? 'white' : '#57534e', fontSize: '14px', fontWeight: 500, cursor: docText.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
              >
                {loading
                  ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Analyzing with AI...</>
                  : <><FileText style={{ width: 16, height: 16 }} /> Analyze Document</>
                }
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontSize: '13px', background: 'rgba(127,29,29,0.2)', border: '1px solid rgba(127,29,29,0.3)', borderRadius: '12px', padding: '12px 16px' }}>
                <AlertTriangle style={{ width: 16, height: 16, flexShrink: 0 }} /> {error}
              </div>
            )}

            {/* Loading shimmer */}
            {loading && !analysis && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px' }}>
                {[80, 60, 90, 50].map((w, i) => (
                  <div key={i} className="shimmer" style={{ height: '16px', borderRadius: '8px', width: `${w}%` }} />
                ))}
              </div>
            )}

            {/* Analysis Result */}
            {analysis && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Completeness score */}
                <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '14px' }}>Document Completeness</h3>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: analysis.completeness >= 70 ? '#4ade80' : analysis.completeness >= 40 ? '#fbbf24' : '#f87171' }}>
                      {analysis.completeness}%
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#292524', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ height: '100%', borderRadius: '999px', background: analysis.completeness >= 70 ? '#16a34a' : analysis.completeness >= 40 ? '#d97706' : '#dc2626', width: `${analysis.completeness}%`, transition: 'width 0.5s' }} />
                  </div>
                  <p style={{ color: '#78716c', fontSize: '13px', margin: 0 }}>{analysis.summary}</p>
                </div>

                {/* Extracted data */}
                {Object.values(analysis.extractedData).some(v => v) && (
                  <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
                    <h3 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 16px', fontSize: '14px' }}>Extracted Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {Object.entries(analysis.extractedData).map(([k, v]) => v ? (
                        <div key={k}>
                          <div style={{ color: '#57534e', fontSize: '11px', textTransform: 'capitalize', marginBottom: '2px' }}>{k.replace(/([A-Z])/g, ' $1')}</div>
                          <div style={{ color: '#d6d3d1', fontSize: '13px', fontWeight: 500 }}>{v}</div>
                        </div>
                      ) : null)}
                    </div>
                  </div>
                )}

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <div style={{ background: 'rgba(127,29,29,0.1)', border: '1px solid rgba(127,29,29,0.3)', borderRadius: '16px', padding: '20px' }}>
                    <h3 style={{ color: '#fca5a5', fontWeight: 600, margin: '0 0 12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle style={{ width: 16, height: 16 }} /> Issues Found
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {analysis.issues.map((issue, i) => (
                        <div key={i} style={{ color: '#fca5a5', fontSize: '13px', display: 'flex', gap: '8px', opacity: 0.85 }}>
                          <span style={{ color: '#ef4444', flexShrink: 0 }}>x</span> {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {analysis.recommendations.length > 0 && (
                  <div style={{ background: 'rgba(20,83,45,0.1)', border: '1px solid rgba(20,83,45,0.3)', borderRadius: '16px', padding: '20px' }}>
                    <h3 style={{ color: '#86efac', fontWeight: 600, margin: '0 0 12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 16, height: 16 }} /> Recommendations
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {analysis.recommendations.map((rec, i) => (
                        <div key={i} style={{ color: '#86efac', fontSize: '13px', display: 'flex', gap: '8px', opacity: 0.85 }}>
                          <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span> {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}