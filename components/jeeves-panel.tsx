"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  subscriptionName: string;
  issue: string;
  savings: number;
}

interface JeevesPanelProps {
  recommendations: Recommendation[];
}

export function JeevesPanel({ recommendations }: JeevesPanelProps) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  if (recommendations.length === 0) {
    return (
      <Card className="bg-secondary border-border relative overflow-hidden h-full">
        <CardContent className="p-6 flex items-center h-full">
          <Quote className="w-8 h-8 text-primary/20 absolute top-6 left-6" />
          <div className="pl-12">
            <h3 className="font-display text-xl text-primary mb-2">Jeeves&apos; Analysis</h3>
            <p className="text-muted-foreground">
              Sir, your ledger is immaculate. I have no new recommendations at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    setCancellingId(null);
    router.refresh();
  };

  return (
    <Card className="bg-secondary border-border relative overflow-hidden h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <Quote className="w-8 h-8 text-primary/20 absolute top-6 left-6" />
        <div className="pl-10 mb-6">
          <h3 className="font-display text-xl text-primary mb-1">Jeeves&apos; Analysis</h3>
          <p className="text-sm text-muted-foreground">
            I have identified opportunities to optimize your expenditures.
          </p>
        </div>
        
        <div className="space-y-4 flex-1">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * (index + 1), duration: 0.5 }}
              className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-foreground">{rec.subscriptionName}</h4>
                  <p className="text-xs text-muted-foreground mt-1 pr-4">{rec.issue}</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground block">
                    Savings
                  </span>
                  <span className="font-mono text-primary font-medium">
                    ${rec.savings.toLocaleString("en-US", { minimumFractionDigits: 2 })}/yr
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => router.push("/subscriptions")}
                  className="h-8 text-xs border-primary/20 hover:border-primary/50 text-foreground"
                >
                  Review
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleCancel(rec.id)}
                  disabled={cancellingId === rec.id}
                  className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(201,168,76,0.1)] hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all"
                >
                  {cancellingId === rec.id ? "Processing..." : "Queue Cancellation"}
                  {cancellingId !== rec.id && <ArrowRight className="w-3 h-3 ml-1.5" />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
