"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#C9A84C", "#2D9E64", "#D4A017", "#8B95A5", "#C0392B", "#F0E6D3"];

export default function InsightsClient({ categoryData, totalBurn, opportunities, priceTrends, subscriptionCount }: any) {
  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  
  const formatCurrency = (val: number) => `$${val.toFixed(2)}`;

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-serif text-[#C9A84C] mb-8">Financial Insights</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-6">
          <h3 className="text-[#F0E6D3] font-medium mb-6 uppercase tracking-wider text-sm">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#141B2D", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", color: "#F0E6D3" }}
                formatter={(value: any) => formatCurrency(Number(value) || 0)}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="text-[#8B95A5] text-sm">Total Monthly Burn</span>
            <div className="text-[#C9A84C] font-mono text-2xl font-bold">${totalBurn.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-6">
          <h3 className="text-[#F0E6D3] font-medium mb-6 uppercase tracking-wider text-sm">Price Increases</h3>
          {priceTrends.length === 0 ? (
            <p className="text-[#8B95A5] text-center py-12">No recent price changes detected.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.1)" />
                <XAxis dataKey="name" stroke="#8B95A5" fontSize={12} angle={-15} textAnchor="end" />
                <YAxis stroke="#8B95A5" tickFormatter={(val) => `$${Number(val).toFixed(2)}`} />
                <Tooltip contentStyle={{ backgroundColor: "#141B2D", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", color: "#F0E6D3" }} />
                <Bar dataKey="increase" fill="#D4A017" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-6">
        <h3 className="text-[#F0E6D3] font-medium mb-6 uppercase tracking-wider text-sm">Savings Opportunities</h3>
        {opportunities.length === 0 ? (
          <p className="text-[#8B95A5] text-center py-12">Jeeves finds your portfolio to be optimally managed.</p>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opp: any) => (
              <div key={opp.id} className="flex justify-between items-center p-4 bg-[#0B0F1A] rounded-xl border border-[rgba(201,168,76,0.08)]">
                <div>
                  <h4 className="text-[#F0E6D3] font-medium">{opp.name}</h4>
                  <p className="text-[#8B95A5] text-sm">Usage: {opp.usageScore}/10 • ${opp.price.toFixed(2)}/{opp.billingCycle}</p>
                </div>
                <div className="text-right">
                  <div className="text-[#2D9E64] font-mono font-bold">Save ${opp.annualSavings.toFixed(2)}/yr</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
