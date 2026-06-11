import express from 'express'
const router = express.Router()

// Get vendor summary with itemized aggregation
router.get('/', async (req, res) => {
  const { data: receipts, error } = await req.supabase
    .from('receipts')
    .select('*')
    .eq('user_id', req.user.id)

  if (error) return res.status(500).json({ error })

  // Aggregate by vendor
  const vendorMap = {}

  receipts.forEach(receipt => {
    if (!vendorMap[receipt.vendor]) {
      vendorMap[receipt.vendor] = {
        vendor: receipt.vendor,
        totalSpend: 0,
        invoiceCount: 0,
        items: {},
        months: {},
      }
    }
    const v = vendorMap[receipt.vendor]
    v.totalSpend += receipt.total
    v.invoiceCount++

    const month = receipt.date?.substring(0, 7)
    v.months[month] = (v.months[month] || 0) + receipt.total

    // Aggregate items
    receipt.items?.forEach(item => {
      const key = item.name
      if (!v.items[key]) {
        v.items[key] = { name: item.name, unit: item.unit, totalQty: 0, totalCost: 0, category: item.category }
      }
      v.items[key].totalQty += item.quantity || 1
      v.items[key].totalCost += item.totalPrice || 0
    })
  })

  // Format response
  const vendors = Object.values(vendorMap).map(v => ({
    ...v,
    items: Object.values(v.items).map(item => ({
      ...item,
      avgUnitPrice: item.totalQty > 0 ? (item.totalCost / item.totalQty) : 0,
    })),
  }))

  res.json(vendors)
})

export default router
