# ClearSpend 💡

> Procurement intelligence that turns receipts into negotiation power.

## What it does
- Upload receipts, invoices, PDFs, bank statements
- AI extracts vendor, items, quantities, unit prices automatically
- Dashboard shows spend trends, category breakdowns, vendor analysis
- Identifies where you're overpaying vs market rates
- Generates vendor negotiation reports with data-backed recommendations
- Export to Excel or Google Sheets in one click

## Stack
| Layer | Tech |
|---|---|
| Frontend | React + Vite → Vercel |
| Backend | Node.js + Express → Railway |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (Google OAuth) |
| AI | Claude API (Anthropic) |
| Export | XLSX |

## Setup

### 1. Supabase
- Create project at supabase.com
- Run `backend/schema.sql` in SQL editor
- Enable Google OAuth under Authentication → Providers

### 2. Frontend
```bash
cd frontend
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

### 3. Backend
```bash
cd backend
cp .env.example .env
# Fill in ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY
npm install
npm start
```

### 4. Deploy
- **Frontend** → Import `frontend/` folder to Vercel, set env vars
- **Backend** → Import `backend/` folder to Railway, set env vars

## Pricing Tiers
| Plan | Price | Features |
|---|---|---|
| Starter | Free | 50 receipts/mo, basic dashboard |
| Pro | $29/mo | Unlimited, vendor insights, exports |
| Business | $99/mo | Negotiation reports, multi-user, benchmarking |
