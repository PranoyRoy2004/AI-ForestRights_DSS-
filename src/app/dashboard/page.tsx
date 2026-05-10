'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ChatPanel from '@/components/chat/ChatPanel'
import { DASHBOARD_STATS, MOCK_CASES } from '@/lib/mock-data'
import { getStatusColor, getPriorityColor } from '@/lib/utils'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import {
  TrendingUp, AlertCircle, CheckCircle2,
  Clock, FileText, ArrowUpRight, Flame
} from 'lucide-react'

const PIE_COLORS = ['#22c55e', '#10b981', '#4ade80']

export default function DashboardPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const s = DASHBOARD_STATS
  const recentCases = MOCK_CASES.slice(0, 5)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0a09' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Header
          title="Dashboard"
          subtitle="Forest Rights Management Overview"
          onChatOpen={() => setChatOpen(true)}
        />

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              {
                label: 'Total Cases',
                value: s.totalCases.toLocaleString(),
                icon: FileText,
                change: 'Sample data',
                color: '#d6d3d1',
                bg: 'rgba(41,37,36,0.4)',
                border: 'rgba(68,64,60,0.5)',
                iconColor: '#78716c',
              },
              {
                label: 'Pending Review',
                value: s.pendingCases.toLocaleString(),
                icon: Clock,
                change: 'Awaiting action',
                color: '#fbbf24',
                bg: 'rgba(120,53,15,0.15)',
                border: 'rgba(120,53,15,0.3)',
                iconColor: '#d97706',
              },
              {
                label: 'Approved',
                value: s.approvedCases.toLocaleString(),
                icon: CheckCircle2,
                change: 'Rights granted',
                color: '#4ade80',
                bg: 'rgba(20,83,45,0.15)',
                border: 'rgba(20,83,45,0.3)',
                iconColor: '#16a34a',
              },
              {
                label: 'Rejected',
                value: s.rejectedCases.toLocaleString(),
                icon: AlertCircle,
                change: 'Under appeal',
                color: '#f87171',
                bg: 'rgba(127,29,29,0.15)',
                border: 'rgba(127,29,29,0.3)',
                iconColor: '#b91c1c',
              },
            ].map(({ label, value, icon: Icon, change, color, bg, border, iconColor }) => (
              <div
                key={label}
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#78716c', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                  </span>
                  <Icon style={{ width: 16, height: 16, color: iconColor }} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, color }}>{value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#57534e', fontSize: '12px' }}>
                  <TrendingUp style={{ width: 12, height: 12 }} />
                  {change}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

            {/* Bar Chart */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0 }}>Monthly Submissions</h2>
                  <p style={{ color: '#57534e', fontSize: '12px', margin: '4px 0 0' }}>Claim filings over last 6 months</p>
                </div>
                <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(20,83,45,0.3)', color: '#4ade80', border: '1px solid rgba(20,83,45,0.4)' }}>
                  2024
                </span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={s.monthlySubmissions} barSize={32}>
                  <XAxis dataKey="month" tick={{ fill: '#78716c', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#78716c', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 10, color: '#d6d3d1', fontSize: 12 }} cursor={{ fill: 'rgba(34,197,94,0.06)' }} />
                  <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px' }}>Claim Types</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: '0 0 16px' }}>Distribution by category</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={s.claimTypeBreakdown} dataKey="count" nameKey="type" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3}>
                    {s.claimTypeBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1c1917', border: '1px solid #292524', borderRadius: 10, color: '#d6d3d1', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {s.claimTypeBreakdown.map(({ type, count }, i) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: PIE_COLORS[i] }} />
                      <span style={{ color: '#a8a29e' }}>{type}</span>
                    </div>
                    <span style={{ color: '#d6d3d1', fontWeight: 500 }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

            {/* Recent Cases */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(41,37,36,0.5)' }}>
                <div>
                  <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0 }}>Recent Cases</h2>
                  <p style={{ color: '#57534e', fontSize: '12px', margin: '4px 0 0' }}>Latest FRA claim activity</p>
                </div>
                <a href="/cases" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e', fontSize: '12px', textDecoration: 'none' }}>
                  View all <ArrowUpRight style={{ width: 12, height: 12 }} />
                </a>
              </div>

              {recentCases.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', borderBottom: '1px solid rgba(41,37,36,0.3)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#292524', border: '1px solid rgba(68,64,60,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
                    {c.applicantName.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ color: '#e7e5e4', fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.applicantName}</span>
                      <span style={{ color: '#44403c', fontSize: '11px', fontFamily: 'monospace' }}>{c.id}</span>
                    </div>
                    <div style={{ color: '#57534e', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.village}, {c.district} - {c.claimType} - {c.area} ha
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                    <span className={`text-xs font-medium ${getPriorityColor(c.priority)}`}>{c.priority}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* District Leaderboard */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Flame style={{ width: 16, height: 16, color: '#f97316' }} />
                <div>
                  <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: 0 }}>Top Districts</h2>
                  <p style={{ color: '#57534e', fontSize: '12px', margin: '2px 0 0' }}>By claim volume</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {s.districtWise.map(({ district, count }, i) => (
                  <div key={district} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#44403c', fontFamily: 'monospace', fontSize: '12px', width: '16px', flexShrink: 0 }}>#{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: '#a8a29e', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{district}</span>
                        <span style={{ color: '#78716c', fontSize: '12px', marginLeft: '8px', flexShrink: 0 }}>{count}</span>
                      </div>
                      <div style={{ height: '6px', background: '#292524', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#16a34a', borderRadius: '999px', width: `${(count / (s.districtWise[0].count || 1)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(41,37,36,0.5)' }}>
                <div style={{ color: '#57534e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, marginBottom: '12px' }}>
                  Overall Approval Rate
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: '#4ade80' }}>
                    {((s.approvedCases / s.totalCases) * 100).toFixed(1)}%
                  </span>
                  <span style={{ color: '#57534e', fontSize: '12px', marginBottom: '4px' }}>of total cases</span>
                </div>
                <div style={{ height: '8px', background: '#292524', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#16a34a', borderRadius: '999px', width: `${(s.approvedCases / s.totalCases) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}