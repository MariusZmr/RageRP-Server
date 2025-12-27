import React, { useEffect, useState } from "react";
import EventManager from "../utils/EventManager";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Briefcase, User, MapPin, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HUDStats {
  id: number;
  money: number;
  job: string;
  serverName?: string;
}

const HUD: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<HUDStats>({
    id: 0,
    money: 0,
    job: "Unemployed",
    serverName: "BATTLEGROUNDS",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay appearance to allow world to load
    const timer = setTimeout(() => setVisible(true), 1000);

    const handleUpdate = (data: Partial<HUDStats>) => {
      setStats((prev) => ({ ...prev, ...data }));
    };

    EventManager.on("hud:update", handleUpdate);
    EventManager.triggerServer("hud:request");

    return () => {
      clearTimeout(timer);
      EventManager.off("hud:update", handleUpdate);
    };
  }, []);

  const formattedMoney = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(stats.money);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 pointer-events-none font-sans select-none overflow-hidden">
          
          {/* Top Right: Server Info & ID - Removed blur, using opacity */}
          <div className="absolute top-8 right-8 flex flex-col items-end gap-3">
             <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 bg-black/70 px-4 py-2 rounded-full border border-white/5 shadow-sm"
             >
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">{t('hud.server_name')}</span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <div className="flex items-center gap-1.5 text-zinc-400">
                    <User className="w-3 h-3" />
                    <span className="text-xs font-mono font-medium">ID {stats.id}</span>
                </div>
             </motion.div>
          </div>

          {/* Bottom Right: Status Pills */}
          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3">
            
            {/* Job Pill */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface-100/90 pl-4 pr-1 py-1 rounded-full border border-white/5 shadow-lg flex items-center gap-3 group"
            >
                <div className="flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider leading-none mb-0.5">{t('hud.occupation')}</span>
                    <span className="text-sm font-semibold text-white leading-none">{stats.job}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-primary transition-all duration-300">
                    <Briefcase className="w-4 h-4" />
                </div>
            </motion.div>

            {/* Money Pill */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-100/95 pl-5 pr-1 py-1 rounded-full border border-white/5 shadow-xl flex items-center gap-3 group"
            >
                <div className="flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-wider leading-none mb-0.5">{t('hud.cash')}</span>
                    <span className="text-lg font-bold text-white font-mono leading-none tracking-tight">{formattedMoney}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-green-900/20 group-hover:scale-105 transition-transform">
                    <Wallet className="w-5 h-5" />
                </div>
            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HUD;
