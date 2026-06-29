"use client";

import { 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Lightbulb 
} from "lucide-react";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export interface NotificationProps {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const getIcon = (type: string) => {
  switch (type) {
    case "PRICE_INCREASE": return <TrendingUp className="w-4 h-4 text-warning" />;
    case "BUDGET_WARNING": return <AlertTriangle className="w-4 h-4 text-warning" />;
    case "BUDGET_EXCEEDED": return <AlertCircle className="w-4 h-4 text-destructive" />;
    case "LOW_USAGE": return <Info className="w-4 h-4 text-primary" />;
    case "RECOMMENDATION": return <Lightbulb className="w-4 h-4 text-primary" />;
    default: return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

export function NotificationPanel({ initialNotifications }: { initialNotifications: NotificationProps[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="relative text-muted-foreground hover:text-foreground transition-colors outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-1" />
        }
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-l border-border p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-display text-2xl text-primary tracking-wide">Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No notifications.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 rounded-xl border flex gap-4 transition-colors ${notif.read ? 'bg-secondary/20 border-border/50' : 'bg-secondary/50 border-primary/30 shadow-[inset_2px_0_0_0_rgba(201,168,76,1)]'}`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.read ? 'bg-background' : 'bg-background shadow-sm'}`}>
                      {getIcon(notif.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-medium text-sm ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(notif.createdAt), "MMM d")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    {!notif.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notif.id)}
                        className="mt-3 h-7 px-3 text-xs text-primary hover:text-primary hover:bg-primary/10 -ml-3"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
