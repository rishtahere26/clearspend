import { useState, useRef } from 'react'
import { Upload as UploadIcon, FileText, Image, Table, CheckCircle, Loader } from 'lucide-react'
import api from '../lib/api'

const inputTypes = [
  { id: 'photo', icon: Image, label: 'Photo / Image', sub: 'JPG, PNG, HEIC', accept: 'image/*' },
  { id: 'pdf', icon: FileText, label: 'PDF Receipt / Invoice', sub: 'PDF files', accept: 'application/pdf' },
  { id: 'csv', icon: Table, label: 'Bank Statement / CSV', sub: 'CSV, XLSX', accept: '.csv,.xlsx' },
]

export default function Upload() {
  const [selected, setSelected] = useState('photo')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | uploading | success | error
  const [result, setResult] = useState(null)
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) setFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleUpload = async () => {
    if (!file) return
    setStatus('uploading')
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('type', selected)
      const { data } = await api.post('/receipts/upload', form)
      setResult(data)
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.02em' }}>Upload Documents</h1>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
        Upload receipts, invoices, PDFs or bank statements — AI extracts everything automatically.
      </p>

      {/* Type selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {inputTypes.map(({ id, icon: Icon, label, sub }) => (
          <button key={id} onClick={() => setSelected(id)} style={{
            flex: 1, padding: '16px', borderRadius: '12px', border: `1px solid ${selected === id ? 'var(--accent)' : 'var(--border)'}`,
            background: selected === id ? 'rgba(59,130,246,0.08)' : 'var(--surface)',
            textAlign: 'left', transition: 'all 0.15s',
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
        background: file ? 'var(--accent)' : 'var(--border)',
        color: '#fff', fontSize: '15px', fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        opacity: !file || status === 'uploading' ? 0.6 : 1,
      }}>
        {status === 'uploading' ? <><Loader size={16} className="spin" /> Processing with AI...</> : 'Extract & Analyze'}
      </button>

      {/* Result preview */}
      {status === 'success' && result && (
        <div style={{ marginTop: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--accent2)' }}>✓ Extracted Successfully</div>
          <pre style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {status === 'error' && (
        <div style={{ marginTop: '16px', padding: '14px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '14px' }}>
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  )
}
