import 'dotenv/config'
import { prisma } from "../lib/prisma";

async function main() {
  // Clear existing
  await prisma.priceHistory.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "arthur@pendleton.estate",
      name: "Arthur Pendleton",
      budget: 5000,
    },
  });

  const subs = [
    { name: "Netflix Premium", provider: "Netflix", category: "Streaming", price: 22.99, usageScore: 4, nextBilling: new Date("2026-07-29"), oldPrice: 19.99 },
    { name: "Adobe Creative Cloud", provider: "Adobe", category: "SaaS", price: 59.99, usageScore: 2, nextBilling: new Date("2026-07-29"), oldPrice: 49.99 },
    { name: "Equinox All Access", provider: "Equinox", category: "Fitness", price: 300.00, usageScore: 3, nextBilling: new Date("2026-07-29"), oldPrice: 250.00 },
    { name: "Spotify Family", provider: "Spotify", category: "Streaming", price: 15.99, usageScore: 9, nextBilling: new Date("2026-07-15") },
    { name: "Private Jet Card", provider: "NetJets", category: "Transport", price: 2500.00, usageScore: 5, nextBilling: new Date("2026-07-01") },
    { name: "NYT All Access", provider: "NYT", category: "News", price: 25.00, usageScore: 8, nextBilling: new Date("2026-07-10") },
    { name: "MasterClass", provider: "MasterClass", category: "Lifestyle", price: 15.00, usageScore: 4, nextBilling: new Date("2026-07-20"), oldPrice: 12.00 },
    { name: "Apple One Premier", provider: "Apple", category: "Streaming", price: 37.95, usageScore: 8, nextBilling: new Date("2026-07-05") },
    { name: "Notion Team", provider: "Notion", category: "SaaS", price: 10.00, usageScore: 7, nextBilling: new Date("2026-07-12") },
    { name: "Peloton App", provider: "Peloton", category: "Fitness", price: 12.99, usageScore: 2, nextBilling: new Date("2026-07-18") },
    { name: "Calm Premium", provider: "Calm", category: "Lifestyle", price: 69.99, usageScore: 3, nextBilling: new Date("2026-07-22"), oldPrice: 59.99 },
    { name: "Wine Access Club", provider: "Wine Access", category: "Lifestyle", price: 89.00, usageScore: 6, nextBilling: new Date("2026-07-08") },
  ];

  for (const sub of subs) {
    const { oldPrice, ...subData } = sub;
    await prisma.subscription.create({
      data: {
        ...subData,
        userId: user.id,
        priceHistory: oldPrice ? {
          create: { oldPrice, newPrice: subData.price }
        } : undefined,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
