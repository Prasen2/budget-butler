# 🎩 Budget Butler

> **Your Digital Family Office.**
> A premium, AI-assisted subscription management dashboard designed explicitly for high-net-worth individuals.

![Budget Butler Preview](https://github.com/Prasen2/budget-butler/assets/budget-butler-preview.png)

## 📌 Project Overview
Managing household subscriptions and recurring expenses often becomes a chaotic, unmonitored leak of capital. **Budget Butler** is a luxury, fully-responsive dashboard built to elegantly manage digital portfolios. 

Acting as a digital "Jeeves," the platform tracks monthly burn rates against a dynamic household budget, analyzes historical pricing data to detect stealthy cost increases, and scores utilization to recommend calculated subscription cancellations. Backed by a high-performance database and modern web architecture, Budget Butler transforms a disorganized spreadsheet into a pristine, aristocratic ledger.

---

## 🌟 Key Features

- **The Pristine Ledger:** Full CRUD capabilities to seamlessly manage household subscriptions with real-time UI synchronization.
- **Jeeves' Analysis Engine:** An intelligent recommendation system that analyzes utilization scores and historical price hikes to suggest optimized, mathematically-sound cancellations.
- **Dynamic Budget Gauge:** Real-time visualization of the monthly burn rate plotted against a customizable household budget limit.
- **Expenditure Insights:** Beautiful, Recharts-powered data visualizations breaking down spending by category and automatically highlighting vendor price inflation.

---

## 🛠️ Technology Stack

- **Frontend Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database:** Amazon Aurora PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Prasen2/budget-butler.git
cd budget-butler
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure your Environment Variables
Create a `.env` file in the root of the project and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/budget_butler?schema=public"
```

### 4. Initialize the Database & Seed Data
Push the Prisma schema to your database and execute the seed script to populate your dashboard with demonstration data.
```bash
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📜 License
This project was developed for the H0 Hackathon. All rights reserved.
