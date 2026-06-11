import express from 'express'
import * as XLSX from 'xlsx'
import { generateNegotiationInsight } from '../services/aiExtractor.js'

const router = express.Router()

// Generate negotiation report
router.post('/negotiate', async (req, res) => {
  const { vendor } = req.body

  const { data: receipts } = await req.supabase
    .from('receipts')
    .select('*')
    .eq('user_id', req.user.id)
    .eq('vendor', vendor)

  if (!receipts?.length) return res.status(404).json({ error: 'No data for vendor' })

  // Aggregate
  const totalSpend = receipts.reduce((s, r) => s + r.total, 0)
  const itemMap = {}
  receipts.forEach(r => r.items?.forEach(item => {
    if (!itemMap[item.name]) itemMap[item.name] = { ...item, totalQty: 0, totalCost: 0 }
    itemMap[item.name].totalQty += item.quantity || 1
    itemMap[item.name].totalCost += item.totalPrice || 0
  }))

  const items = Object.values(itemMap).map(i => ({
    ...i, avgUnitPrice: i.totalQty > 0 ? i.totalCost / i.totalQty : 0
  }))

  const insight = await generateNegotiationInsight({ vendor, totalSpend, items, period: `${receipts.length} invoices` })

  res.json({ vendor, totalSpend, items, invoiceCount: receipts.length, aiInsight: insight })
})

// Export to Excel
router.post('/export', async (req, res) => {
  const { vendor, type } = req.body

  const { data: receipts } = await req.supabase
    .from('receipts')
    .select('*')
    .eq('user_id', req.user.id)
    .eq('vendor', vendor || undefined)

  if (!receipts?.length) return res.status(404).json({ error: 'No data to export' })

  // Build Excel rows
  const rows = []
  receipts.forEach(r => {
    r.items?.forEach(item => {
      rows.push({
        Date: r.date,
        Vendor: r.vendor,
        Item: item.name,
        Quantity: item.quantity,
        Unit: item.unit,
        'Unit Price': item.unitPrice,
        'Total Price': item.totalPrice,
        Category: item.category,
        'Invoice Total': r.total,
      })
    })
  })

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'ClearSpend Export')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

  res.setHeader('Content-Disposition', `attachment; filename="clearspend-${vendor || 'all'}-export.xlsx"`)
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(buffer)
})

export default router
