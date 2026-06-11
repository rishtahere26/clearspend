import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, ArrowUpRight } from 'lucide-react'
import api from '../lib/api'

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899']

const mockSpendByMonth = [
  { month: 'Jan', spend: 42000 }, { month: 'Feb', spend: 38000 },
  { month: 'Mar', spend: 51000 }, { month: 'Apr', spend: 47000 },
  { month: 'May', spend: 53000 }, { month: 'Jun', spend: 61000 },
]

const mockCategories = [
  { name: 'Food & Bev', value: 38 }, { name: 'Packaging', value: 22 },
  { name: 'Utilities', value: 18 }, { name: 'Supplies', value: 12 },
  { name: 'Other', value: 10 },
]

const mockVendors = [
  { vendor: 'Metro Supplies', spend: 18400, change: +12, items: 42 },
  { vendor: 'FoodCo Distributors', spend: 14200, change: -5, items: 28 },
  { vendor: 'PackRight Inc', spend: 9800, change: +31, items: 15 },
  { vendor: 'CleanPro', spend: 6200, change: +2, items: 8 },
]

const mockInsights = [
  { type: 'warning', text: 'PackRight Inc spend up 31% — review contract terms', action: 'Negotiate' },
  { type: 'success', text: 'FoodCo volume qualifies for tier-2 discount (~$850/mo saving)', action: 'Export Report' },
  { type: 'warning', text: 'Oil purchases: 1,200L/mo @ $5.20/L — market rate $4.10/L', action: 'Negotiate' },
]

function KPICard({ title, value, sub, icon: Icon, color, trend }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '14px', padding: '20px 24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '8px' }}>{title}</div>
          <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</div>
          {sub && <div style={{ fontSize: '12px', color: trend > 0 ? '#ef4444' : '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {trend > 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {sub}
          </div>}
        </div>
        <div style={{ background: color + '22', borderRadius: '10px', padding: '10px' }}>
          <Icon size={20} color={color} />
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [period, setPeriod] = useState('6m')

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>Spend Intelligence</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Your procurement overview at a glance</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['1m','3m','6m','1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--border)',
              background: period === p ? 'var(--accent)' : 'var(--surface)',
              color: period === p ? '#fff' : 'var(--muted)',
              fontSize: '13px', fontWeight: 500,
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <KPICard title="Total Spend (6mo)" value="$292,000" sub="+8% vs last period" icon={DollarSign} color="#3b82f6" trend={1} />
        <KPICard title="Avg Monthly Spend" value="$48,667" sub="-3% vs last period" icon={TrendingDown} color="#10b981" trend={-1} />
        <KPICard title="Active Vendors" value="14" sub="+2 new this month" icon={Package} color="#f59e0b" trend={1} />
        <KPICard title="Savings Identified" value="$6,240" sub="Pending negotiation" icon={AlertTriangle} color="#ef4444" trend={0} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Spend trend */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>Monthly Spend Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockSpendByMonth}>
              <XAxis dataKey="month" tick={{ fill: '#6b7a99', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7a99', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => [`$${v.toLocaleString()}`, 'Spend']} contentStyle={{ background: '#1a2235', border: '1px solid #1f2d45', borderRadius: 8, color: '#e8edf5' }} />
              <Bar dataKey="spend" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>Spend by Category</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={mockCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {mockCategories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, 'Share']} contentStyle={{ background: '#1a2235', border: '1px solid #1f2d45', borderRadius: 8, color: '#e8edf5' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {mockCategories.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} color="#f59e0b" /> AI Insights & Opportunities
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockInsights.map((ins, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderRadius: '10px',
              background: ins.type === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
              border: `1px solid ${ins.type === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`,
            }}>
              <span style={{ fontSize: '13px', color: 'var(--text)' }}>{ins.text}</span>
              <button style={{
                padding: '6px 14px', borderRadius: '7px', border: 'none', flexShrink: 0, marginLeft: '16px',
                background: ins.type === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                color: ins.type === 'warning' ? '#f59e0b' : '#10b981',
                fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                {ins.action} <ArrowUpRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Vendors */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Top Vendors by Spend</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ color: 'var(--muted)', fontSize: '12px' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 500 }}>Vendor</th>
              <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 500 }}>Spend</th>
              <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 500 }}>MoM Change</th>
              <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 500 }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {mockVendors.map((v, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 0', fontWeight: 500 }}>{v.vendor}</td>
                <td style={{ textAlign: 'right', padding: '12px 0', fontFamily: 'DM Mono, monospace' }}>${v.spend.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '12px 0', color: v.change > 0 ? '#ef4444' : '#10b981', fontFamily: 'DM Mono, monospace' }}>
                  {v.change > 0 ? '+' : ''}{v.change}%
                </td>
                <td style={{ textAlign: 'right', padding: '12px 0', color: 'var(--muted)' }}>{v.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
