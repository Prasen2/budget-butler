"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, TrendingUp } from "lucide-react";

export default function SubscriptionsClient({ initialSubscriptions }: any) {
  const [subs, setSubs] = useState(initialSubscriptions);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    
    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        provider: form.get("provider"),
        category: form.get("category"),
        price: form.get("price"),
        billingCycle: form.get("billingCycle"),
        nextBilling: form.get("nextBilling"),
        usageScore: form.get("usageScore"),
      }),
    });
    
    if (res.ok) {
      setShowModal(false);
      router.refresh();
      // Optimistic update for local state
      const newSub = await res.json();
      setSubs([newSub, ...subs]);
    }
    setLoading(false);
  }

  async function deleteSub(id: string) {
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    setSubs(subs.filter((s: any) => s.id !== id));
    router.refresh();
  }

  const getBorderColor = (sub: any) => {
    if (sub.usageScore <= 3 && sub.price > 50) return "border-l-[#C0392B]";
    if (sub.usageScore <= 4) return "border-l-[#D4A017]";
    return "border-l-[#2D9E64]";
  };

  return (
    <div className="pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-[#C9A84C]">Your Household Subscriptions</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#C9A84C] text-[#0B0F1A] px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all"
        >
          <Plus size={20} /> Add Subscription
        </button>
      </div>

      {subs.length === 0 ? (
        <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-16 text-center">
          <h2 className="text-2xl font-serif text-[#F0E6D3] mb-2">Ledger is Pristine</h2>
          <p className="text-[#8B95A5]">Sir, your subscription ledger is currently empty. Shall we begin cataloging your active services?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subs.map((sub: any) => (
            <div key={sub.id} className={`bg-[#141B2D] border border-[rgba(201,168,76,0.08)] border-l-4 ${getBorderColor(sub)} rounded-2xl p-6 relative group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#F0E6D3] font-medium text-lg">{sub.name}</h3>
                  <p className="text-[#8B95A5] text-sm">{sub.provider}</p>
                </div>
                <span className="text-[#C9A84C] font-mono text-xl">${sub.price.toFixed(2)}</span>
              </div>
              
              {sub.priceHistory && sub.priceHistory.length > 0 && (
                <div className="text-[#D4A017] text-sm mb-3 flex items-center gap-1 bg-[#0B0F1A] rounded-lg px-3 py-2">
                  <TrendingUp size={14} />
                  <span>${sub.priceHistory[0].oldPrice.toFixed(2)} → ${sub.priceHistory[0].newPrice.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-sm text-[#8B95A5] mb-4">
                <div className="flex items-center gap-2">
                  <span>Usage:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < sub.usageScore ? "bg-[#C9A84C]" : "bg-[#1A2235]"}`} />
                    ))}
                  </div>
                  <span>{sub.usageScore}/10</span>
                </div>
                <span className="px-2 py-1 bg-[#0B0F1A] rounded text-xs border border-[rgba(201,168,76,0.08)]">{sub.category}</span>
              </div>
              
              <div className="text-sm text-[#8B95A5] mb-2">
                Next billing: {new Date(sub.nextBilling).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider">{sub.billingCycle}</div>
              
              <button 
                onClick={() => deleteSub(sub.id)}
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-2 bg-[#0B0F1A]/80 backdrop-blur rounded-lg border border-[rgba(201,168,76,0.08)]"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.15)] rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-serif text-[#C9A84C] mb-6">Add New Subscription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Subscription Name" required className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] placeholder-[#8B95A5] focus:border-[#C9A84C] outline-none transition-colors" />
              <input name="provider" placeholder="Provider" required className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] placeholder-[#8B95A5] focus:border-[#C9A84C] outline-none transition-colors" />
              <select name="category" required className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] outline-none">
                <option value="">Select Category</option>
                <option>Streaming</option><option>SaaS</option><option>Fitness</option><option>Lifestyle</option><option>News</option><option>Transport</option><option>Other</option>
              </select>
              <input name="price" type="number" step="0.01" placeholder="Price" required className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] placeholder-[#8B95A5] focus:border-[#C9A84C] outline-none transition-colors" />
              <select name="billingCycle" className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] outline-none">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <input name="nextBilling" type="date" required className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#F0E6D3] outline-none" />
              <div className="flex items-center gap-4 py-2">
                <label className="text-[#8B95A5] text-sm">Usage Score:</label>
                <input name="usageScore" type="range" min="1" max="10" defaultValue="5" className="flex-1 accent-[#C9A84C]" />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-[#8B95A5] text-[#8B95A5] hover:text-[#F0E6D3] hover:border-[#F0E6D3] transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#C9A84C] text-[#0B0F1A] font-medium hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-50">
                  {loading ? "Adding..." : "Add Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
