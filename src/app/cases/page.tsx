'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { MOCK_CASES } from '@/lib/mock-data'
import { getStatusColor, getPriorityColor, formatDate } from '@/lib/utils'
import { Search, FileText, MapPin, Calendar, User, X } from 'lucide-react'
import type { ClaimCase } from '@/types'

const STATUSES = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected', 'Appeal']
const TYPES    = ['All', 'Individual', 'Community', 'Habitat']

const TIMELINE_STEPS = [
  { label: 'Claim Filed',           statuses: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Appeal'] },
  { label: 'Gram Sabha Verified',   statuses: ['Under Review', 'Approved', 'Rejected', 'Appeal'] },
  { label: 'SDLC Review',           statuses: ['Under Review', 'Approved', 'Rejected', 'Appeal'] },
  { label: 'DLC Decision',          statuses: ['Approved', 'Rejected', 'Appeal'] },
  { label: 'Title Issued',          statuses: ['Approved'] },
]

export default function CasesPage() {
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selected, setSelected]     = useState<ClaimCase | null>(null)

  const filtered = MOCK_CASES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      c.applicantName.toLowerCase().includes(q) ||
      c.village.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    const matchType   = typeFilter   === 'All' || c.claimType === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0a09' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header title="Case Manager" subtitle={`${filtered.length} cases found`} />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* Cases List */}
          <div style={{ width: selected ? '50%' : '100%', display: 'flex', flexDirection: 'column', borderRight: selected ? '1px solid rgba(41,37,36,0.6)' : 'none', transition: 'width 0.3s' }}>

            {/* Filters */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(41,37,36,0.5)', display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#57534e' }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, village, district, case ID..."
                  style={{ width: '100%', background: 'rgba(41,37,36,0.5)', border: '1px solid rgba(68,64,60,0.5)', borderRadius: '12px', padding: '10px 12px 10px 36px', fontSize: '13px', color: '#d6d3d1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Status filters */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    style={{
                      padding: '4px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', border: '1px solid',
                      background: statusFilter === s ? 'rgba(20,83,45,0.3)' : 'transparent',
                      borderColor: statusFilter === s ? 'rgba(20,83,45,0.5)' : 'rgba(68,64,60,0.4)',
                      color: statusFilter === s ? '#4ade80' : '#78716c',
                    }}
                  >
                    {s}
                  </button>
                ))}
                <div style={{ width: '1px', background: 'rgba(68,64,60,0.4)', margin: '0 4px' }} />
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    style={{
                      padding: '4px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', border: '1px solid',
                      background: typeFilter === t ? 'rgba(120,53,15,0.2)' : 'transparent',
                      borderColor: typeFilter === t ? 'rgba(120,53,15,0.4)' : 'rgba(68,64,60,0.4)',
                      color: typeFilter === t ? '#fb923c' : '#78716c',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Case rows */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', color: '#44403c' }}>
                  <FileText style={{ width: 40, height: 40, marginBottom: 12 }} />
                  <p style={{ fontSize: '14px', margin: 0 }}>No cases match your filters</p>
                </div>
              ) : filtered.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelected(selected?.id === c.id ? null : c)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '16px 24px',
                    background: selected?.id === c.id ? 'rgba(20,83,45,0.08)' : 'transparent',
                    borderLeft: selected?.id === c.id ? '2px solid #22c55e' : '2px solid transparent',
                    borderTop: 'none', borderRight: 'none', borderBottom: '1px solid rgba(41,37,36,0.3)',
                    cursor: 'pointer', display: 'block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#292524', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
                        {c.applicantName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ color: '#e7e5e4', fontSize: '14px', fontWeight: 500 }}>{c.applicantName}</div>
                        <div style={{ color: '#44403c', fontSize: '11px', fontFamily: 'monospace' }}>{c.id}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#57534e', fontSize: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin style={{ width: 12, height: 12 }} />{c.village}, {c.district}
                      </span>
                      <span>{c.claimType}</span>
                      <span>{c.area} ha</span>
                    </div>
                    <span className={`text-xs font-medium ${getPriorityColor(c.priority)}`}>{c.priority}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ width: '50%', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ color: '#e7e5e4', fontSize: '20px', fontWeight: 700, margin: '0 0 4px' }}>{selected.applicantName}</h2>
                  <p style={{ color: '#57534e', fontSize: '12px', fontFamily: 'monospace', margin: 0 }}>{selected.id}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#57534e', padding: '4px' }}
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              {/* Status badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className={`text-sm px-3 py-1.5 rounded-xl border font-medium ${getStatusColor(selected.status)}`}>
                  {selected.status}
                </span>
                <span className={`text-sm px-3 py-1.5 rounded-xl border border-stone-700/50 font-medium ${getPriorityColor(selected.priority)}`}>
                  {selected.priority} Priority
                </span>
                <span style={{ fontSize: '13px', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(68,64,60,0.5)', color: '#a8a29e' }}>
                  {selected.claimType} Claim
                </span>
              </div>

              {/* Info grid */}
              <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  ['Area', `${selected.area} hectares`],
                  ['Village', selected.village],
                  ['District', selected.district],
                  ['State', selected.state],
                  ['Filed', formatDate(selected.submittedDate)],
                  ['Last Updated', formatDate(selected.lastUpdated)],
                  ['Officer', selected.officerAssigned ?? 'Unassigned'],
                  ['Claim Type', selected.claimType],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ color: '#57534e', fontSize: '11px', marginBottom: '2px' }}>{label}</div>
                    <div style={{ color: '#d6d3d1', fontSize: '13px', fontWeight: 500 }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Documents */}
              <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <FileText style={{ width: 16, height: 16, color: '#78716c' }} />
                  <h3 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '14px' }}>Documents Submitted</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selected.documents.map(doc => (
                    <span key={doc} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '8px', background: 'rgba(41,37,36,0.6)', border: '1px solid rgba(68,64,60,0.4)', color: '#a8a29e' }}>
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div style={{ background: 'rgba(120,53,15,0.1)', border: '1px solid rgba(120,53,15,0.3)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ color: '#fdba74', fontWeight: 600, margin: '0 0 8px', fontSize: '14px' }}>Case Notes</h3>
                  <p style={{ color: '#a8a29e', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{selected.notes}</p>
                </div>
              )}

              {/* Timeline */}
              <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Calendar style={{ width: 16, height: 16, color: '#78716c' }} />
                  <h3 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0, fontSize: '14px' }}>Case Timeline</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {TIMELINE_STEPS.map(({ label, statuses }) => {
                    const done = statuses.includes(selected.status)
                    return (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: done ? '#16a34a' : '#292524', border: `2px solid ${done ? '#22c55e' : '#44403c'}`, flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: done ? '#d6d3d1' : '#57534e' }}>{label}</span>
                        {done && label === 'Claim Filed' && (
                          <span style={{ fontSize: '11px', color: '#57534e', marginLeft: 'auto' }}>{formatDate(selected.submittedDate)}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Officer */}
              <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#292524', border: '1px solid rgba(68,64,60,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User style={{ width: 18, height: 18, color: '#78716c' }} />
                </div>
                <div>
                  <div style={{ color: '#57534e', fontSize: '11px', marginBottom: '2px' }}>Assigned Officer</div>
                  <div style={{ color: '#d6d3d1', fontSize: '14px', fontWeight: 500 }}>{selected.officerAssigned ?? 'Not yet assigned'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}