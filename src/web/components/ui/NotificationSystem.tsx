import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle, 
    AlertCircle, 
    Info, 
    X,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration: number;
  createdAt: number;
  count: number;
}

interface NotificationContextType {
  addNotification: (type: NotificationType, title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// --- Circular Timer Component ---
const CircularTimer = ({ duration, createdAt, count }: { duration: number, createdAt: number, count: number }) => {
    return (
        <div className="relative w-5 h-5 shrink-0">
            <svg className="w-full h-full -rotate-90">
                <circle
                    cx="10" cy="10" r="8"
                    stroke="currentColor" strokeWidth="2" fill="transparent"
                    className="text-white/10"
                />
                <motion.circle
                    key={`${createdAt}-${count}`} // Force re-animation on reset
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 50.26 }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    cx="10" cy="10" r="8"
                    stroke="currentColor" strokeWidth="2" fill="transparent"
                    strokeDasharray="50.26"
                    className="text-white/40"
                />
            </svg>
        </div>
    );
};

// --- Notification Item Component ---
const NotificationItem = ({ notif, onDismiss }: { notif: Notification, onDismiss: (id: string) => void }) => {
    let Icon = Info;
    let colorClass = "bg-blue-500";
    
    switch (notif.type) {
        case "success": Icon = CheckCircle; colorClass = "bg-green-500"; break;
        case "error": Icon = AlertCircle; colorClass = "bg-primary"; break;
        case "warning": Icon = Bell; colorClass = "bg-yellow-500"; break;
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="w-full max-w-sm pointer-events-auto"
        >
            <div className="relative overflow-hidden bg-zinc-950/95 border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4 group">
                
                {/* Icon Box - Centered Vertically */}
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-black/50", colorClass)}>
                    <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                        <h4 className="font-bold text-white text-sm leading-tight truncate">{notif.title}</h4>
                        <div className="flex items-center gap-2 shrink-0">
                            {notif.count > 1 && (
                                <motion.span 
                                    key={notif.count}
                                    initial={{ scale: 1.2, color: "#fff" }}
                                    animate={{ scale: 1, color: "rgba(255,255,255,0.6)" }}
                                    className="text-[10px] font-black bg-white/10 px-1.5 py-0.5 rounded-full"
                                >
                                    x{notif.count}
                                </motion.span>
                            )}
                            <CircularTimer duration={notif.duration} createdAt={notif.createdAt} count={notif.count} />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-snug line-clamp-2">
                        {notif.message}
                    </p>
                </div>

                {/* Close Button */}
                <button 
                    onClick={() => onDismiss(notif.id)}
                    className="absolute top-2 right-2 p-1 text-zinc-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
        </motion.div>
    );
};

// --- Provider Component ---
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (timers.current.has(id)) {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);
    }
  }, []);

  const addNotification = useCallback((type: NotificationType, title: string, message: string, duration = 5000) => {
    setNotifications((prev) => {
        const existingIndex = prev.findIndex(n => n.title === title && n.message === message && n.type === type);
        let id: string;

        if (existingIndex !== -1) {
            id = prev[existingIndex].id;
            
            // Clear existing timer
            if (timers.current.has(id)) {
                clearTimeout(timers.current.get(id));
            }

            const newNotifs = [...prev];
            newNotifs[existingIndex] = {
                ...newNotifs[existingIndex],
                count: newNotifs[existingIndex].count + 1,
                createdAt: Date.now(),
                duration
            };

            // Reset removal timer
            timers.current.set(id, setTimeout(() => removeNotification(id), duration));
            return newNotifs;
        }

        id = Math.random().toString(36).substring(7);
        const newNotif: Notification = { id, type, title, message, duration, createdAt: Date.now(), count: 1 };
        
        timers.current.set(id, setTimeout(() => removeNotification(id), duration));
        return [...prev, newNotif];
    });
  }, [removeNotification]);

  useEffect(() => {
     (window as any).triggerNotification = addNotification;
     return () => {
         timers.current.forEach(clearTimeout);
     };
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed bottom-8 left-8 z-[9999] flex flex-col gap-3 pointer-events-none items-start w-[380px]">
        <AnimatePresence mode="popLayout">
            {notifications.map((notif) => (
                <NotificationItem key={notif.id} notif={notif} onDismiss={removeNotification} />
            ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};