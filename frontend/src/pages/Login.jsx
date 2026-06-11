import { useAuth } from '../hooks/useAuth'
import { Zap } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://clearspend-nine.vercel.app/auth/callback'
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 60% 0%, #1e3a5f 0%, #07090f 60%)',
    }}>
      <div style={{
        background: '#111827', border: '1px solid #1f2d45',
        borderRadius: '20px', padding: '48px 40px', textAlign: 'center',
        maxWidth: '400px', width: '90%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', borderRadius: '14px', padding: '12px' }}>
            <Zap size={28} color="#fff" />
          </div>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em', color: '#f0f4ff' }}>
          Welcome to ClearSpend
        </h1>
        <p style={{ color: '#6b7a99', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 }}>
          Procurement intelligence that turns your receipts into negotiation power.
        </p>
        <button onClick={signInWithGoogle} style={{
          width: '100%', padding: '14px', borderRadius: '10px',
          background: '#fff', color: '#1a1a1a', border: 'none',
          fontSize: '15px', fontWeight: 600, display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: '10px',
          cursor: 'pointer', transition: 'opacity 0.2s',
        }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>
        <p style={{ color: '#374151', fontSize: '12px', marginTop: '24px' }}>
          Free forever. No credit card required.
        </p>
      </div>
    </div>
  )
}
