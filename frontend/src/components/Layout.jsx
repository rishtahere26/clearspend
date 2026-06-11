import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LayoutDashboard, Upload, Building2, Handshake, LogOut, Zap } from 'lucide-react'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/upload', icon: Upload, label: 'Upload' },
  { to: '/app/vendors', icon: Building2, label: 'Vendors' },
  { to: '/app/negotiate', icon: Handshake, label: 'Negotiate' },
]

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 0',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'var(--accent)', borderRadius: '8px', padding: '6px', display: 'flex' }}>
              <Zap size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
              Clear<span style={{ color: 'var(--accent)' }}>Spend</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
              color: isActive ? '#fff' : 'var(--muted)',
              background: isActive ? 'var(--accent)' : 'transparent',
              fontSize: '14px', fontWeight: 500,
              transition: 'all 0.15s',
            })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email}
          </div>
          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'var(--muted)', background: 'none', border: 'none',
            fontSize: '13px', padding: 0,
          }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        <Outlet />
      </main>
    </div>
  )
}
