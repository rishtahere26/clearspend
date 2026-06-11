import { useState } from 'react'
import { FileText, Download, Handshake, TrendingDown, DollarSign } from 'lucide-react'
import api from '../lib/api'

const vendors = ['Metro Supplies', 'FoodCo Distributors', 'PackRight Inc', 'CleanPro']

const mockReport = {
  vendor: 'PackRight Inc',
  period: 'Jan 2025 – Jun 2025',
  totalSpend: 9800,
  items: [
    { name: 'Takeaway Containers', qty: 15000, unit: 'Units', yourRate: 0.45, marketRate: 0.32, saving: 1950 },
    { name: 'Paper Bags', qty: 8000, unit: 'Units', yourRate: 0.18, marketRate: 0.15, saving: 240 },
  ],
  totalSaving: 2190,
  recommendation: 'Based on your 6-month volume of 23,000+ units, you qualify for a high-volume tier discount. Market benchmarks show equivalent suppliers offering 25-30% lower unit pricing at this volume. Recommend negotiating a volume-based contract with quarterly pricing reviews.',
}

export default function Negotiate() {
  const [selectedVendor, setSelectedVendor] = useState('')
  const [exportType, setExportType] = useState('pdf')
  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState(null)

  const generateReport = async () => {
    setGenerating(true)
    setTimeout(() => {
      setReport(mockReport)
      setGenerating(false)
    }, 1500)
  }

  const handleExport = async () => {
    try {
      const { data } = await api.post('/reports/export', { vendor: selectedVendor, type: exportType })
      window.open(data.url, '_blank')
    } catch {
      alert('Export coming soon — backend integration pending.')
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.02em' }}>Negotiation Engine</h1>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
        Generate data-backed vendor reports. Walk into every negotiation with numbers, not guesses.
      </p>

      {/* Generator */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Generate Vendor Report</div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <select value={selectedVendor} onChange={e => setSelectedVendor(e.target.value)} style={{
            flex: 1, padding: '10px 14px', borderRadius: '8px',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '14px',
          }}>
            <option value="">Select vendor...</option>
            {vendors.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <select value={exportType} onChange={e => setExportType(e.target.value)} style={{
            padding: '10px 14px', borderRadius: '8px',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: '14px',
          }}>
            <option value="pdf">PDF Report</option>
            <option value="excel">Excel</option>
            <option value="sheets">Google Sheets</option>
          </select>
        </div>
        <button onClick={generateReport} disabled={!selectedVendor || generating} style={{
          width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
          background: selectedVendor ? 'var(--accent)' : 'var(--border)',
          color: '#fff', fontSize: '14px', fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          opacity: !selectedVendor ? 0.5 : 1,
        }}>
          <Handshake size={16} />
          {generating ? 'Generating...' : 'Generate Negotiation Report'}
        </button>
      </div>

      {/* Report preview */}
      {report && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{report.vendor}</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>Analysis period: {report.period}</div>
            </div>
            <button onClick={handleExport} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '9px 16px', borderRadius: '8px', border: 'none',
              background: 'var(--accent2)', color: '#fff', fontSize: '13px', fontWeight: 600,
            }}>
              <Download size={14} /> Export {exportType.toUpperCase()}
            </button>
          </div>

          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Total Spend', value: `$${report.totalSpend.toLocaleString()}`, icon: DollarSign, color: '#3b82f6' },
              { label: 'Savings Identified', value: `$${report.totalSaving.toLocaleString()}/mo`, icon: TrendingDown, color: '#10b981' },
              { label: 'Savings Potential (annual)', value: `$${(report.totalSaving * 12).toLocaleString()}`, icon: FileText, color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface2)', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Item breakdown */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--muted)' }}>ITEM BREAKDOWN</div>
            {report.items.map((item, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                gap: '8px', padding: '12px 0', borderTop: '1px solid var(--border)',
                fontSize: '13px', alignItems: 'center',
              }}>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ color: 'var(--muted)' }}>{item.qty.toLocaleString()} {item.unit}</div>
                <div style={{ fontFamily: 'DM Mono, monospace' }}>${item.yourRate.toFixed(2)}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', color: '#10b981' }}>${item.marketRate.toFixed(2)}</div>
                <div style={{ color: '#10b981', fontWeight: 600 }}>Save ${item.saving.toLocaleString()}/mo</div>
              </div>
            ))}
          </div>

          {/* AI Recommendation */}
          <div style={{
            background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '10px', padding: '16px',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginBottom: '8px' }}>AI RECOMMENDATION</div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text)' }}>{report.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
