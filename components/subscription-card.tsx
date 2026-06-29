"use client";

import { motion } from "framer-motion";
import { 
  MonitorPlay, 
  Cloud, 
  Dumbbell, 
  Newspaper, 
  Coffee, 
  Plane, 
  MoreHorizontal,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface SubscriptionProps {
  id: string;
  name: string;
  provider: string;
  category: string;
  price: number;
  usageScore: number;
  nextBilling: Date;
  status: "active" | "paused" | "cancelled";
  priceIncreased?: { oldPrice: number; newPrice: number };
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "streaming": return MonitorPlay;
    case "saas": return Cloud;
    case "fitness": return Dumbbell;
    case "news": return Newspaper;
    case "lifestyle": return Coffee;
    case "transport": return Plane;
    default: return MoreHorizontal;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success";
    case "paused": return "bg-warning";
    case "cancelled": return "bg-destructive";
    default: return "bg-muted";
  }
};

const getBorderColor = (usageScore: number, priceIncreased: boolean) => {
  if (priceIncreased || usageScore <= 3) return "border-l-destructive";
  if (usageScore <= 5) return "border-l-warning";
  return "border-l-success";
};

export function SubscriptionCard({ sub, index = 0 }: { sub: SubscriptionProps, index?: number }) {
  const Icon = getCategoryIcon(sub.category);
  const leftBorder = getBorderColor(sub.usageScore, !!sub.priceIncreased);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className={`relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 border-l-4 ${leftBorder}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{sub.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(sub.status)}`} title={sub.status} />
                </div>
                <p className="text-sm text-muted-foreground">{sub.provider}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg text-foreground">
                ${sub.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              {sub.priceIncreased && (
                <div className="flex items-center justify-end gap-1 mt-1 text-warning text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-mono">${sub.priceIncreased.oldPrice} → ${sub.priceIncreased.newPrice}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground block">
                Usage Score
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-4 rounded-sm ${i < sub.usageScore ? "bg-primary/80" : "bg-secondary"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-muted-foreground">{sub.usageScore}/10</span>
              </div>
            </div>

            <div className="flex items-end gap-4 text-right">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground block">
                  Next Billing
                </span>
                <span className="text-sm text-foreground font-mono">
                  {format(new Date(sub.nextBilling), "MMM dd, yyyy")}
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-normal border-border bg-secondary/50 text-muted-foreground">
                {sub.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
