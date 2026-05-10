'use client'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { DASHBOARD_STATS } from '@/lib/mock-data'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from 'recharts'

const COLORS = ['#22c55e', '#10b981', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7']

const APPROVAL_TREND = [
  { month: 'Jan', approved: 0, rejected: 0, pending: 0 },
  { month: 'Feb', approved: 1, rejected: 0, pending: 0 },
  { month: 'Mar', approved: 1, rejected: 0, pending: 0 },
  { month: 'Apr', approved: 0, rejected: 0, pending: 0 },
  { month: 'May', approved: 0, rejected: 0, pending: 1 },
  { month: 'Jun', approved: 0, rejected: 1, pending: 2 },
]

const STATE_DATA = [
  { state: 'Jharkhand',     cases: 2 },
  { state: 'Odisha',        cases: 1 },
  { state: 'MP',            cases: 2 },
  { state: 'Maharashtra',   cases: 1 },
]

const PROCESSING_STAGES = [
  { stage: 'Gram Sabha',      days: 12, target: 30 },
  { stage: 'SDLC Review',     days: 18, target: 60 },
  { stage: 'Verification',    days: 8,  target: 30 },
  { stage: 'DLC Decision',    days: 9,  target: 60 },
  { stage: 'Title Issuance',  days: 5,  target: 15 },
]

const tooltipStyle = {
  background: '#1c1917',
  border: '1px solid #292524',
  borderRadius: 10,
  color: '#d6d3d1',
  fontSize: 12,
}

export default function AnalyticsPage() {
  const s = DASHBOARD_STATS
  const approvalRate = ((s.approvedCases / s.totalCases) * 100).toFixed(1)
  const rejectionRate = ((s.rejectedCases / s.totalCases) * 100).toFixed(1)
  const pendingRate = ((s.pendingCases / s.totalCases) * 100).toFixed(1)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0c0a09' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', flex: 1, minWidth: 0 }}>
        <Header title="Analytics" subtitle="District-level insights, approval trends, and performance metrics" />

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Approval Rate',    value: `${approvalRate}%`,  color: '#4ade80',  bg: 'rgba(20,83,45,0.15)',   border: 'rgba(20,83,45,0.3)' },
              { label: 'Rejection Rate',   value: `${rejectionRate}%`, color: '#f87171',  bg: 'rgba(127,29,29,0.15)', border: 'rgba(127,29,29,0.3)' },
              { label: 'Pending Rate',     value: `${pendingRate}%`,   color: '#fbbf24',  bg: 'rgba(120,53,15,0.15)', border: 'rgba(120,53,15,0.3)' },
              { label: 'Total Area (ha)',  value: '507.8',             color: '#d6d3d1',  bg: 'rgba(41,37,36,0.4)',   border: 'rgba(68,64,60,0.5)' },
            ].map(({ label, value, color, bg, border }) => (
              <div
                key={label}
                style={{ background: bg, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '32px', fontWeight: 700, color, marginBottom: '4px' }}>{value}</div>
                <div style={{ color: '#57534e', fontSize: '12px' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Decision Trends */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>Decision Trends</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: '0 0 20px' }}>Monthly approved vs rejected vs pending</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={APPROVAL_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" />
                  <XAxis dataKey="month" tick={{ fill: '#78716c', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#78716c', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} dot={false} name="Approved" />
                  <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={false} name="Rejected" />
                  <Line type="monotone" dataKey="pending"  stroke="#f59e0b" strokeWidth={2} dot={false} name="Pending" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center' }}>
                {[
                  { label: 'Approved', color: '#22c55e' },
                  { label: 'Rejected', color: '#ef4444' },
                  { label: 'Pending',  color: '#f59e0b' },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <span style={{ color: '#78716c', fontSize: '11px' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* State wise */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>State-wise Distribution</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: '0 0 20px' }}>Total FRA cases by state</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={STATE_DATA} layout="vertical" barSize={18}>
                  <XAxis type="number" tick={{ fill: '#78716c', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="state" type="category" tick={{ fill: '#a8a29e', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(34,197,94,0.06)' }} />
                  <Bar dataKey="cases" radius={[0, 6, 6, 0]}>
                    {STATE_DATA.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

            {/* Claim type pie */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>Claim Type Split</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: '0 0 8px' }}>Individual / Community / Habitat</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={s.claimTypeBreakdown}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {s.claimTypeBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {s.claimTypeBreakdown.map(({ type, count }, i) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i] }} />
                      <span style={{ color: '#a8a29e' }}>{type}</span>
                    </div>
                    <span style={{ color: '#d6d3d1', fontWeight: 500 }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing time */}
            <div style={{ background: 'rgba(28,25,23,0.4)', border: '1px solid rgba(41,37,36,0.6)', borderRadius: '16px', padding: '24px' }}>
              <h2 style={{ color: '#e7e5e4', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>Processing Time Analysis</h2>
              <p style={{ color: '#57534e', fontSize: '12px', margin: '0 0 24px' }}>Average days per stage vs target</p>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                {PROCESSING_STAGES.map(({ stage, days, target }) => {
                  const pct = Math.round((days / target) * 100)
                  const color = pct < 60 ? '#22c55e' : pct < 85 ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      {/* Circle */}
                      <div style={{ position: 'relative', width: 64, height: 64 }}>
                        <svg width="64" height="64" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#292524" strokeWidth="3" />
                          <circle
                            cx="18" cy="18" r="15.9" fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeDasharray={`${pct} 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#e7e5e4', fontSize: '13px', fontWeight: 600 }}>{days}d</span>
                        </div>
                      </div>
                      <div style={{ color: '#78716c', fontSize: '11px', textAlign: 'center', maxWidth: '70px', lineHeight: 1.3 }}>{stage}</div>
                      <div style={{ color: '#44403c', fontSize: '10px' }}>target: {target}d</div>
                    </div>
                  )
                })}
              </div>

              {/* District bars */}
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(41,37,36,0.5)' }}>
                <h3 style={{ color: '#a8a29e', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px' }}>Top Districts by Volume</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {s.districtWise.map(({ district, count }, i) => (
                    <div key={district} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: '#44403c', fontSize: '11px', width: '16px', fontFamily: 'monospace' }}>#{i + 1}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: '#a8a29e', fontSize: '12px' }}>{district}</span>
                          <span style={{ color: '#78716c', fontSize: '12px' }}>{count}</span>
                        </div>
                        <div style={{ height: '4px', background: '#292524', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: COLORS[i % COLORS.length], borderRadius: '999px', width: `${(count / (s.districtWise[0].count || 1)) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}