import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
}

// Configurație globală pentru poziție
const DEFAULT_POSITION: NotificationPosition = 'top-right';

const NotificationContext = createContext<{
    addNotification: (n: Omit<Notification, 'id'>) => void;
    position: NotificationPosition;
    setPosition: (pos: NotificationPosition) => void;
} | null>(null);

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [position, setPosition] = useState<NotificationPosition>(DEFAULT_POSITION);

    const addNotification = (n: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prev) => {
            // Dacă suntem sus, adăugăm la început (stack down). Dacă suntem jos, la sfârșit (stack up) - sau invers depinde de flex direction
            // Pentru simplitate, adăugăm mereu în array, și gestionăm ordinea vizuală din CSS (flex-col vs flex-col-reverse)
            return [...prev, { ...n, id }];
        });

        if (n.duration !== 0) {
            setTimeout(() => {
                removeNotification(id);
            }, n.duration || 5000);
        }
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    useEffect(() => {
        (window as any).triggerNotification = (type: NotificationType, title: string, message: string, duration: number = 5000) => {
            addNotification({ type, title, message, duration });
        };
        
        // Permitem schimbarea poziției din client (opțional)
        (window as any).setNotificationPosition = (pos: NotificationPosition) => {
            setPosition(pos);
        };
    }, []);

    // Clase pentru poziționarea containerului
    const positionClasses: Record<NotificationPosition, string> = {
        'top-left': 'top-10 left-10 flex-col',
        'top-right': 'top-10 right-10 flex-col',
        'bottom-left': 'bottom-10 left-10 flex-col-reverse',
        'bottom-right': 'bottom-10 right-10 flex-col-reverse',
        'top-center': 'top-10 left-1/2 -translate-x-1/2 flex-col',
        'bottom-center': 'bottom-10 left-1/2 -translate-x-1/2 flex-col-reverse',
    };

    return (
        <NotificationContext.Provider value={{ addNotification, position, setPosition }}>
            {children}
            <div className={cn("fixed z-[100] flex gap-3 pointer-events-none", positionClasses[position])}>
                <AnimatePresence mode='popLayout'>
                    {notifications.map((n) => (
                        <NotificationItem 
                            key={n.id} 
                            {...n} 
                            position={position}
                            onClose={() => removeNotification(n.id)} 
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};

const NotificationItem: React.FC<Notification & { onClose: () => void, position: NotificationPosition }> = ({ type, title, message, onClose, position }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-orange-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    // Eliminat backdrop-blur, crescut opacitatea background-ului
    const typeStyles = {
        success: "border-emerald-500/30 bg-zinc-950/95", // Darker background, no blur
        error: "border-red-500/30 bg-zinc-950/95",
        warning: "border-orange-500/30 bg-zinc-950/95",
        info: "border-blue-500/30 bg-zinc-950/95"
    };

    // Calculăm direcția animației în funcție de poziție
    let initialX = 0;
    let initialY = 0;

    if (position.includes('left')) initialX = -50;
    else if (position.includes('right')) initialX = 50;
    else if (position.includes('top')) initialY = -20;
    else initialY = 20;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className={cn(
                "pointer-events-auto w-[350px] p-4 rounded-xl border shadow-2xl flex gap-3 relative overflow-hidden",
                typeStyles[type]
            )}
        >
            {/* Colored Accent Line */}
            <div className={cn("absolute top-0 left-0 w-1 h-full", 
                type === 'success' ? 'bg-emerald-500' : 
                type === 'error' ? 'bg-red-500' : 
                type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
            )} />

            <div className="mt-1 shrink-0">
                {icons[type]}
            </div>
            
            <div className="flex-1 mr-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed font-medium">{message}</p>
            </div>

            <button onClick={onClose} className="shrink-0 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};