## Inspiration
Managing digital subscriptions and recurring expenses has become a chaotic, unmonitored leak of capital for many households. When we looked at existing financial tracking tools, they all felt like glorified, boring spreadsheets designed for the mass market. We wanted to build something entirely different: a "digital family office." We were inspired to create a luxury, aristocratic dashboard that feels less like a calculator and more like a trusted digital butler managing your estate.

## What it does
**Budget Butler** is a premium subscription management dashboard for high-net-worth individuals. Instead of just listing expenses, it acts as an intelligent household manager (which we lovingly call "Jeeves"). 

It allows users to log all active subscriptions, automatically tracks the "monthly burn rate," and visualizes how close the household is to its budget limit using a dynamic gauge. The standout feature is **Jeeves' Analysis**, an engine that actively monitors your ledger, flags stealthy price hikes from vendors, evaluates your utilization scores, and recommends mathematically-sound cancellations—allowing you to execute a cancellation queue with a single click.

## How we built it
We built the application on the bleeding edge of modern web development:
* **Frontend:** We used **Next.js 14 (App Router)** with **TypeScript**, styling it with **Tailwind CSS** and **shadcn/ui** to achieve a sleek, premium dark-mode aesthetic. We implemented **Framer Motion** for subtle, aristocratic micro-animations, and **Recharts** for beautiful financial data visualizations.
* **Backend:** We utilized Next.js Server Components and API Routes (`GET`, `POST`, `PATCH`, `DELETE`) to handle our server-side business logic.
* **Database:** The core of the application runs on a highly performant **Amazon Aurora PostgreSQL** database. We used **Prisma ORM** to enforce strict relational database schemas and manage our migrations cleanly.
* **Deployment:** We deployed the final full-stack application seamlessly using **Vercel**.

## Challenges we ran into
One of our biggest headaches was dealing with **React Hydration Errors**. Because our dashboard relies heavily on complex SVG icons and charts, third-party browser extensions (like Dark Reader) were aggressively injecting CSS styles into our DOM before React could finish loading, causing the app to crash on load. We solved this by diving deep into Next.js rendering lifecycles, isolating the SVGs, applying targeted `suppressHydrationWarning` flags, and injecting specific meta-tags to lock out extension interference.

We also battled strict PostgreSQL foreign-key constraints when wiring up the "Add Subscription" forms, ensuring that every new subscription was perfectly tied to an existing relational User ID in the database.

## Accomplishments that we're proud of
We are incredibly proud that we transformed a purely static, hardcoded UI prototype into a 100% functional, data-driven application in a single, massive development sprint. The database integration is flawless—when a user adds or deletes a subscription, the PostgreSQL database updates instantly, and the UI (including the complex Budget Gauge and Monthly Burn calculations) dynamically recalculates in real-time without needing a full page reload.

## What we learned
We vastly improved our understanding of the Next.js Server Component architecture. We learned exactly how to securely fetch sensitive database records on the server and cleanly pass them down as props to interactive Client Components. We also learned how to properly seed a PostgreSQL database using Prisma, and how to seamlessly pivot our database URLs to manage both local development and production cloud environments.

## What's next for Budget-Butler
We have big plans for the estate! The immediate next step is integrating **NextAuth.js** to allow multiple distinct household profiles, so family members can have their own isolated ledgers. We also plan to implement an automated email system where "Jeeves" sends a Weekly Briefing report to your inbox, detailing upcoming billing dates and highlighting any unusual spikes in your digital spending.
