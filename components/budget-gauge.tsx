"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BudgetGaugeProps {
  totalBudget: number;
  spentAmount: number;
  percentUsed: number;
}

export function BudgetGauge({ totalBudget, spentAmount, percentUsed }: BudgetGaugeProps) {
  const [fillPercentage, setFillPercentage] = useState(0);
  const remaining = totalBudget - spentAmount;
  const percentage = Math.min(percentUsed, 100);
  const remainingPercentage = 100 - percentage;

  let colorClass = "text-success"; // Under budget (>50% remaining)
  let strokeColor = "#2D9E64";
  if (remainingPercentage < 25) {
    colorClass = "text-destructive"; // Critical (<25% remaining)
    strokeColor = "#C0392B";
  } else if (remainingPercentage <= 50) {
    colorClass = "text-warning"; // Warning (25-50% remaining)
    strokeColor = "#D4A017";
  } else {
    colorClass = "text-primary"; // Gold (>50% remaining)
    strokeColor = "#C9A84C";
  }

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setFillPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Outer Ring (Total Budget) */}
      <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 280 280">
        {/* Track */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="rgba(201, 168, 76, 0.08)"
          strokeWidth="16"
        />
        {/* Fill */}
        <motion.circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="drop-shadow-md"
        />
        {/* Inner subtle decorative ring */}
        <circle
          cx="140"
          cy="140"
          r={radius - 24}
          fill="none"
          stroke="rgba(201, 168, 76, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
          Remaining
        </span>
        <div className={`font-display text-5xl font-medium tracking-tight ${colorClass}`}>
          ${remaining.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-2 text-sm text-muted-foreground font-mono">
          of ${totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
