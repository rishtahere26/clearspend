import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Vendors from './pages/Vendors'
import Negotiate from './pages/Negotiate'
import Layout from './components/Layout'

// Handles Supabase OAuth callback — catches access_token in URL hash
function AuthCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/app/dashboard', { replace: true })
      else navigate('/login', { replace: true })
    })
  }, [])
  return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#6b7a99' }}>Signing you in...</div>
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#6b7a99' }}>Loading...</div>
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="negotiate" element={<Negotiate />} />
      </Route>
      {/* Catch Supabase hash redirects to root */}
      <Route path="*" element={<AuthCallback />} />
    </Routes>
  )
}
