import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function HouseholdPage() {
  const user = await prisma.user.findFirst({
    include: { _count: { select: { subscriptions: true } } },
  });

  if (!user) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-serif text-[#C9A84C] mb-8">Household Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0B0F1A] text-2xl font-serif">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-[#F0E6D3] text-xl font-medium">{user.name}</h3>
              <p className="text-[#8B95A5]">Primary Account Holder</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[rgba(201,168,76,0.08)]">
              <div className="text-[#8B95A5] text-sm uppercase tracking-wider mb-1">Active Subs</div>
              <div className="text-[#F0E6D3] font-mono text-2xl">{user._count.subscriptions}</div>
            </div>
            <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[rgba(201,168,76,0.08)]">
              <div className="text-[#8B95A5] text-sm uppercase tracking-wider mb-1">Budget</div>
              <div className="text-[#C9A84C] font-mono text-2xl">${user.budget.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#141B2D] border border-[rgba(201,168,76,0.08)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <Users size={48} className="text-[#8B95A5] mb-4" />
          <h3 className="text-[#F0E6D3] text-xl font-medium mb-2">Household Configuration</h3>
          <p className="text-[#8B95A5] max-w-sm">Manage your family office and household staff access privileges here. Additional members can be added in future updates.</p>
        </div>
      </div>
    </div>
  );
}
