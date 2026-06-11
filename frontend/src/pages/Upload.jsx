import { useState, useRef } from 'react'
import { Upload as UploadIcon, FileText, Image, Table, CheckCircle, Loader, AlertCircle, Zap } from 'lucide-react'
import api from '../lib/api'

const inputTypes = [
  { id: 'photo', icon: Image, label: 'Photo / Image', sub: 'JPG, PNG, HEIC', accept: 'image/*' },
  { id: 'pdf', icon: FileText, label: 'PDF Receipt / Invoice', sub: 'PDF files', accept: 'application/pdf' },
  { id: 'csv', icon: Table, label: 'Bank Statement / CSV', sub: 'CSV, XLSX', accept: '.csv,.xlsx' },
]

export default function Upload() {
  const [selected, setSelected] = useState('photo')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loadingMsg, setLoadingMsg] = useState('Processing...')
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) { setFile(f); setStatus('idle'); setResult(null); setErrorMsg('') }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); setStatus('idle'); setResult(null); setErrorMsg('') }
  }

  const handleUpload = async () => {
    if (!file) return
    setStatus('uploading')
    setErrorMsg('')
    setResult(null)

    // Show progressive loading messages
    const messages = [
      'Waking up the AI engine... ☕',
      'Reading your document...',
      'Extracting line items...',
      'Identifying vendors & prices...',
      'Almost done...',
    ]
    let msgIndex = 0
    setLoadingMsg(messages[0])
    const msgInterval = setInterval(() => {
      msgIndex = Math.min(msgIndex + 1, messages.length - 1)
      setLoadingMsg(messages[msgIndex])
    }, 4000)

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('type', selected)
      const { data } = await api.post('/api/receipts/upload', form, { timeout: 60000 })
      clearInterval(msgInterval)
      setResult(data)
      setStatus('success')
    } catch (err) {
      clearInterval(msgInterval)
      const msg = err.response?.data?.detail || err.response?.data?.error
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setErrorMsg('The AI server took too long to respond (it may have been asleep). Please try again — it should be faster now!')
      } else if (err.response?.status === 401) {
        setErrorMsg('Session expired. Please refresh the page and try again.')
      } else if (msg) {
        setErrorMsg(`Extraction failed: ${msg}`)
      } else {
        setErrorMsg('Something went wrong. The backend may be starting up — wait 30 seconds and try again.')
      }
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.02em' }}>Upload Documents</h1>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
        Upload receipts, invoices, PDFs or bank statements — AI extracts everything automatically.
      </p>

      {/* Cold start warning */}
      <div style={{
        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#a5b4fc',
      }}>
        <Zap size={14} />
        First upload may take 30–60 seconds while the AI engine wakes up. Subsequent uploads are instant!
      </div>

      {/* Type selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {inputTypes.map(({ id, icon: Icon, label, sub }) => (
          <button key={id} onClick={() => setSelected(id)} style={{
            flex: 1, padding: '16px', borderRadius: '12px',
            border: `1px solid ${selected === id ? 'var(--accent)' : 'var(--border)'}`,
            background: selected === id ? 'rgba(59,130,246,0.08)' : 'var(--surface)',
            textAlign: 'left', transition: 'all 0.15s', cursor: 'pointer',
          }}>
            <Icon size={20} color={selected === id ? 'var(--accent)' : 'var(--muted)'} />
            <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '8px', color: selected === id ? 'var(--text)' : 'var(--muted)' }}>{label}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{sub}</div>
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current.click()}
        style={{
          border: `2px dashed ${file ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '14px', padding: '48px 24px',
          textAlign: 'center', cursor: 'pointer',
          background: file ? 'rgba(59,130,246,0.04)' : 'var(--surface)',
          transition: 'all 0.2s', marginBottom: '20px',
        }}
      >
        <input ref={fileRef} type="file" accept={inputTypes.find(t => t.id === selected)?.accept} onChange={handleFile} style={{ display: 'none' }} />
        {file ? (
          <>
            <CheckCircle size={32} color="var(--accent)" style={{ marginBottom: '12px' }} />
            <div style={{ fontWeight: 600 }}>{file.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{(file.size / 1024).toFixed(1)} KB — click to replace</div>
          </>
        ) : (
          <>
            <UploadIcon size={32} color="var(--muted)" style={{ marginBottom: '12px' }} />
            <div style={{ fontWeight: 600, marginBottom: '6px' }}>Drop your file here</div>
            <div style={{ color: 'var(--muted)', fontSize: '13px' }}>or click to browse</div>
          </>
        )}
      </div>

      <button onClick={handleUpload} disabled={!file || status === 'uploading'} style={{
        width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
        background: file && status !== 'uploading' ? 'var(--accent)' : 'var(--border)',
        color: '#fff', fontSize: '15px', fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        opacity: !file || status === 'uploading' ? 0.7 : 1,
        cursor: !file || status === 'uploading' ? 'not-allowed' : 'pointer',
      }}>
        {status === 'uploading'
          ? <><Loader size={16} /> {loadingMsg}</>
          : 'Extract & Analyze with AI'}
      </button>

      {/* Success */}
      {status === 'success' && result && (
        <div style={{ marginTop: '24px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} /> Extracted Successfully!
          </div>
          {result.extracted && (
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--muted)' }}>Vendor</span>
                <span style={{ fontWeight: 600 }}>{result.extracted.vendor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--muted)' }}>Date</span>
                <span>{result.extracted.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--muted)' }}>Total</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>${result.extracted.total}</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ color: 'var(--muted)', marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>ITEMS EXTRACTED</div>
                {result.extracted.items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '12px' }}>
                    <span>{item.name} ({item.quantity} {item.unit})</span>
                    <span style={{ color: '#10b981' }}>${item.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div style={{ marginTop: '16px', padding: '16px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ color: '#ef4444', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Upload Failed</div>
            <div style={{ color: '#fca5a5', fontSize: '13px', lineHeight: 1.5 }}>{errorMsg}</div>
            <button onClick={handleUpload} style={{ marginTop: '10px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
