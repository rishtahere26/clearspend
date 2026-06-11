import { useNavigate } from 'react-router-dom'
import { Zap, Upload, BarChart3, Handshake, FileSpreadsheet, TrendingDown, ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Upload,
    color: "#6366f1",
    bg: "#6366f120",
    title: "Upload Anything",
    desc: "Photo, PDF, bank statement or CSV — our AI reads it all and extracts every line item automatically."
  },
  {
    icon: BarChart3,
    color: "#f59e0b",
    bg: "#f59e0b20",
    title: "Spend Intelligence",
    desc: "See exactly where your money goes. Track volume, unit prices and trends across every vendor and category."
  },
  {
    icon: TrendingDown,
    color: "#10b981",
    bg: "#10b98120",
    title: "Spot Overpaying",
    desc: "Compare your unit prices against market rates. ClearSpend flags where you're overpaying — down to the liter."
  },
  {
    icon: Handshake,
    color: "#ef4444",
    bg: "#ef444420",
    title: "Negotiate with Data",
    desc: "Generate a vendor report in one click. Walk into every negotiation armed with volume data and savings potential."
  },
  {
    icon: FileSpreadsheet,
    color: "#3b82f6",
    bg: "#3b82f620",
    title: "Export to Excel & Sheets",
    desc: "Still love spreadsheets? Great — we fill them for you. One-click export to Excel or Google Sheets anytime."
  },
  {
    icon: Zap,
    color: "#a855f7",
    bg: "#a855f720",
    title: "AI-Powered",
    desc: "Powered by Claude AI — the same technology trusted by Fortune 500 companies. Accuracy you can rely on."
  },
]

const stats = [
  { value: "2 min", label: "to upload & analyze a receipt" },
  { value: "15-30%", label: "avg savings identified on vendor contracts" },
  { value: "1 click", label: "to generate a negotiation report" },
  { value: "$0", label: "to get started" },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07090f',
      color: '#f0f4ff',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden',
    }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(7,9,15,0.85)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', borderRadius: '10px', padding: '7px', display: 'flex' }}>
            <Zap size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em' }}>
            Clear<span style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spend</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.15)',
            color: '#a0b4c8', padding: '8px 20px', borderRadius: '8px',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#a0b4c8' }}
          >
            Sign in
          </button>
          <button onClick={() => navigate('/login')} style={{
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            border: 'none', color: '#fff', padding: '8px 20px',
            borderRadius: '8px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            Get Started Free <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(60px, 10vw, 120px) 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '28px',
          fontSize: '13px', color: '#a5b4fc',
        }}>
          <Zap size={12} /> AI-Powered Procurement Intelligence
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
          maxWidth: '800px',
          margin: '0 auto 24px',
        }}>
          Turn your receipts into{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #f59e0b, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            negotiation power
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#6b7a99',
          maxWidth: '560px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Upload any receipt, invoice or bank statement. ClearSpend extracts every line item, spots where you're overpaying, and generates vendor reports that save you real money.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            border: 'none', color: '#fff',
            padding: '14px 32px', borderRadius: '12px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(99,102,241,0.6)' }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.4)' }}
          >
            Start for Free <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate('/login')} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e0e7ff', padding: '14px 32px', borderRadius: '12px',
            fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          }}>
            See Dashboard →
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0',
          flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          maxWidth: '800px',
          margin: '0 auto',
          overflow: 'hidden',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: '1', minWidth: '160px',
              padding: '24px 20px', textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#4a5f6e', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Everything you need to spend smarter
          </h2>
          <p style={{ color: '#6b7a99', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
            Not just another expense tracker. ClearSpend is your procurement intelligence platform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '28px',
              transition: 'all 0.2s',
              cursor: 'default',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = f.color + '44'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ background: f.bg, borderRadius: '12px', padding: '12px', display: 'inline-flex', marginBottom: '16px' }}>
                <f.icon size={22} color={f.color} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: '#6b7a99', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '80px 20px', background: 'rgba(99,102,241,0.04)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '50px' }}>
            From receipt to savings in 3 steps
          </h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { step: "01", color: "#6366f1", title: "Upload", desc: "Drop any receipt, invoice, PDF or bank statement into ClearSpend" },
              { step: "02", color: "#f59e0b", title: "Analyze", desc: "AI extracts every item, quantity, unit price and vendor automatically" },
              { step: "03", color: "#10b981", title: "Save", desc: "See overpayments, get negotiation reports, export to Excel in one click" },
            ].map((s, i) => (
              <div key={i} style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: s.color + '20', border: `2px solid ${s.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '16px', fontWeight: 800, color: s.color, fontFamily: 'monospace',
                }}>
                  {s.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{s.title}</div>
                <div style={{ color: '#6b7a99', fontSize: '14px', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Ready to spend smarter?
        </h2>
        <p style={{ color: '#6b7a99', fontSize: '18px', marginBottom: '40px' }}>
          Free forever. No credit card required. Takes 2 minutes to set up.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            border: 'none', color: '#fff',
            padding: '16px 48px', borderRadius: '14px',
            fontSize: '18px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 0 60px rgba(99,102,241,0.4)',
          }}>
            Get Started Free <ArrowRight size={18} />
          </button>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Free forever', 'No credit card', 'Google login', 'Export to Excel'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a5f6e', fontSize: '13px' }}>
                <CheckCircle size={13} color="#10b981" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '24px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', borderRadius: '6px', padding: '4px', display: 'flex' }}>
            <Zap size={12} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>ClearSpend</span>
        </div>
        <div style={{ color: '#2a3a4a', fontSize: '12px' }}>
          Powered by Claude AI · Built 2026 · github.com/rishtahere26/clearspend
        </div>
      </div>
    </div>
  )
}
