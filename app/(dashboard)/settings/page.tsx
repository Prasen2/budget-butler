"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setBudget(data?.budget?.toString() || "");
      });
  }, []);

  async function handleSave() {
    if (!user) return;
    setLoading(true);
    await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, budget: parseFloat(budget) }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!user) return <div className="p-8 text-[#8B95A5]">Loading preferences...</div>;

  return (
    <div className="pb-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif text-[#C9A84C] mb-8">Ledger Preferences</h1>
      
      <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="text-[#C9A84C]" size={24} />
          <h2 className="text-[#F0E6D3] text-xl font-medium">System Configuration</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[#8B95A5] text-sm uppercase tracking-wider mb-2">Account Name</label>
            <input 
              value={user.name} 
              disabled 
              className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 text-[#8B95A5] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[#8B95A5] text-sm uppercase tracking-wider mb-2">Monthly Budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C] font-mono">$</span>
              <input 
                type="number" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#0B0F1A] border border-[rgba(201,168,76,0.15)] rounded-xl p-3 pl-8 text-[#F0E6D3] font-mono focus:border-[#C9A84C] outline-none transition-colors"
              />
            </div>
            <p className="text-[#8B95A5] text-sm mt-2">This is the maximum monthly subscription expenditure Jeeves will monitor.</p>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#C9A84C] text-[#0B0F1A] py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Saving..." : saved ? "Preferences Saved" : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
