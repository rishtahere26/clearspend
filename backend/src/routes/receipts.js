import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { extractFromImage, extractFromText } from '../services/aiExtractor.js'

const router = express.Router()
const upload = multer({ dest: '/tmp/uploads/' })

// Upload & extract
router.post('/upload', upload.single('file'), async (req, res) => {
  const { file, body: { type }, user, supabase } = req
  if (!file) return res.status(400).json({ error: 'No file uploaded' })

  try {
    let extracted

    if (type === 'photo' || type === 'pdf') {
      extracted = await extractFromImage(file.path)
    } else {
      // CSV / bank statement
      const text = fs.readFileSync(file.path, 'utf8')
      const result = await extractFromText(text)
      extracted = Array.isArray(result) ? result[0] : result
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('receipts')
      .insert({
        user_id: user.id,
        vendor: extracted.vendor,
        date: extracted.date,
        total: extracted.total,
        currency: extracted.currency || 'USD',
        items: extracted.items,
        payment_method: extracted.paymentMethod,
        raw_type: type,
      })
      .select()
      .single()

    if (error) throw error

    // Cleanup
    fs.unlinkSync(file.path)

    res.json({ success: true, receipt: data, extracted })
  } catch (err) {
    console.error(err)
    fs.existsSync(file.path) && fs.unlinkSync(file.path)
    res.status(500).json({ error: 'Extraction failed', detail: err.message })
  }
})

// Get all receipts for user
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('receipts')
    .select('*')
    .eq('user_id', req.user.id)
    .order('date', { ascending: false })

  if (error) return res.status(500).json({ error })
  res.json(data)
})

export default router
