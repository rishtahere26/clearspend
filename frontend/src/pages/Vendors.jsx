import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Package, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react'

const vendors = [
  {
    name: 'Metro Supplies',
    totalSpend: 18400,
    change: +12,
    invoices: 34,
    items: [
      { name: 'Cooking Oil', unit: 'Liters', qty: 1200, unitPrice: 5.20, marketRate: 4.10, trend: [900,1000,1050,1100,1150,1200] },
      { name: 'Paper Plates (1000pk)', unit: 'Packs', qty: 85, unitPrice: 42.00, marketRate: 38.00, trend: [60,65,70,75,80,85] },
      { name: 'Cleaning Supplies', unit: 'Units', qty: 48, unitPrice: 12.50, marketRate: 12.00, trend: [40,42,44,45,46,48] },
    ]
  },
  {
    name: 'FoodCo Distributors',
    totalSpend: 14200,
    change: -5,
    invoices: 28,
    items: [
      { name: 'Chicken Breast', unit: 'kg', qty: 820, unitPrice: 8.50, marketRate: 8.20, trend: [700,720,740,760,790,820] },
      { name: 'Flour (25kg bags)', unit: 'Bags', qty: 120, unitPrice: 22.00, marketRate: 21.50, trend: [100,105,108,112,116,120] },
    ]
  },
  {
    name: 'PackRight Inc',
    totalSpend: 9800,
    change: +31,
    invoices: 15,
    items: [
      { name: 'Takeaway Containers', unit: 'Units', qty: 15000, unitPrice: 0.45, marketRate: 0.32, trend: [8000,9000,10000,11500,13000,15000] },
      { name: 'Paper Bags', unit: 'Units', qty: 8000, unitPrice: 0.18, marketRate: 0.15, trend: [5000,5500,6000,6500,7200,8000] },
    ]
  },
]

function ItemRow({ item }) {
  const overpay = ((item.unitPrice - item.marketRate) / item.marketRate * 100).toFixed(1)
  const saving = ((item.unitPrice - item.marketRate) * item.qty).toFixed(0)
  const isOver = item.unitPrice > item.marketRate
  const trendData = item.trend.map((v, i) => ({ m: ['J','F','M','A','M','J'][i], v }))

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
      gap: '12px', padding: '12px 16px', borderTop: '1px solid var(--border)',
      alignItems: 'center', fontSize: '13px',
    }}>
      <div style={{ fontWeight: 500 }}>{item.name}</div>
      <div style={{ color: 'var(--muted)' }}>{item.qty.toLocaleString()} {item.unit}</div>
      <div style={{ fontFamily: 'DM Mono, monospace' }}>${item.unitPrice.toFixed(2)}/{item.unit}</div>
      <div style={{ fontFamily: 'DM Mono, monospace', color: isOver ? '#ef4444' : '#10b981' }}>
        ${item.marketRate.toFixed(2)}/{item.unit}
      </div>
      <div style={{ color: isOver ? '#ef4444' : '#10b981', fontWeight: 600 }}>
        {isOver ? `+${overpay}% overpay` : 'Good rate'}
        {isOver && <div style={{ fontSize: '11px', fontWeight: 400 }}>Save ~${parseInt(saving).toLocaleString()}/mo</div>}
      </div>
      <div style={{ height: '40px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line type="monotone" dataKey="v" stroke={isOver ? '#ef4444' : '#10b981'} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function VendorCard({ vendor }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '14px', overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 20px', cursor: 'pointer',
      }} onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: '10px', padding: '10px' }}>
            <Package size={18} color="var(--accent)" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{vendor.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>{vendor.invoices} invoices · {vendor.items.length} item types</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontFamily: 'DM Mono, monospace' }}>${vendor.totalSpend.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: vendor.change > 0 ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
              {vendor.change > 0 ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
              {vendor.change > 0 ? '+' : ''}{vendor.change}% MoM
            </div>
          </div>
          {open ? <ChevronUp size={16} color="var(--muted)" /> : <ChevronDown size={16} color="var(--muted)" />}
        </div>
      </div>

      {open && (
        <div>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
            gap: '12px', padding: '8px 16px',
            fontSize: '11px', color: 'var(--muted)', fontWeight: 500,
            borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)',
          }}>
            <div>ITEM</div><div>VOLUME/MO</div><div>YOUR PRICE</div><div>MARKET RATE</div><div>OPPORTUNITY</div><div>TREND</div>
          </div>
          {vendor.items.map((item, i) => <ItemRow key={i} item={item} />)}
        </div>
      )}
    </div>
  )
}

export default function Vendors() {
  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.02em' }}>Vendor Intelligence</h1>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
        Track itemized volume & unit prices. See exactly where you're overpaying vs market rate.
      </p>
      {vendors.map((v, i) => <VendorCard key={i} vendor={v} />)}
    </div>
  )
}
