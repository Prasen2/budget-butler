"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LayoutDashboard, CreditCard, PieChart, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Insights", href: "/insights", icon: PieChart },
  { name: "Household", href: "/household", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

import { useState, useEffect } from "react";
import { NotificationPanel, NotificationProps } from "@/components/notification-panel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-border bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="font-display text-xl tracking-wide text-primary">Budget Butler</h1>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary shadow-[inset_2px_0_0_0_rgba(201,168,76,1)]"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
                suppressHydrationWarning
              >
                <item.icon suppressHydrationWarning className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : "opacity-70"}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-background/50 backdrop-blur-sm z-10">
          <div className="md:hidden">
            <h1 className="font-display text-xl text-primary">Budget Butler</h1>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-6">
            <NotificationPanel initialNotifications={notifications} />
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Arthur Pendelton</p>
                <p className="text-xs text-muted-foreground">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary border border-primary p-0.5">
                <div className="w-full h-full rounded-full bg-card overflow-hidden">
                   {/* Avatar Placeholder */}
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jeeves&backgroundColor=141B2D" alt="Butler" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Nav (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              suppressHydrationWarning
            >
              <item.icon suppressHydrationWarning className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
