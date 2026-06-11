import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import receiptRoutes from './routes/receipts.js'
import reportRoutes from './routes/reports.js'
import vendorRoutes from './routes/vendors.js'
import { authMiddleware } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 4000

// Allow all origins for now (fix CORS completely)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.options('*', cors()) // Handle preflight requests

app.use(express.json())

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'ClearSpend API' }))

app.use('/api/receipts', authMiddleware, receiptRoutes)
app.use('/api/reports', authMiddleware, reportRoutes)
app.use('/api/vendors', authMiddleware, vendorRoutes)

app.listen(PORT, () => console.log(`ClearSpend API running on :${PORT}`))
