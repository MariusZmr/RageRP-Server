import React, { useEffect, useState } from "react";
import EventManager from "../utils/EventManager";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Wallet, Briefcase, User, MapPin, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface HUDStats {
  id: number;
  money: number;
  job: string;
  serverName?: string;
}

const HUD: React.FC = () => {
  const [stats, setStats] = useState<HUDStats>({
    id: 0,
    money: 0,
    job: "Civil",
    serverName: "BATTLEGROUNDS",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);

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

  const formattedMoney = new Intl.NumberFormat("en-US").format(stats.money);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={containerVariants}
          className="fixed top-6 right-6 flex flex-col items-end gap-3 pointer-events-none select-none font-sans"
        >
          {/* Server Name Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-2"
          >
            <div className="flex flex-col items-end">
              <span className="text-zinc-100 font-black italic tracking-widest text-xl drop-shadow-md leading-none">
                {stats.serverName}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] bg-zinc-950/80 px-2 py-0.5 rounded-full border border-zinc-800">
                <Target className="w-3 h-3 text-red-500" />
                ROLEPLAY
              </div>
            </div>
          </motion.div>

          {/* Money Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-l from-zinc-900/95 to-zinc-950/80 p-3 pr-5 rounded-l-xl border-r-4 border-green-500 shadow-xl flex items-center gap-4 min-w-[200px] justify-end group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-green-500/80 uppercase font-bold tracking-wider">
                Cash Balance
              </span>
              <span className="text-white font-bold text-2xl font-mono tracking-tight group-hover:text-green-400 transition-colors drop-shadow-sm">
                $ {formattedMoney}
              </span>
            </div>
            <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
          </motion.div>

          {/* Job Card */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-900/80 p-2 pr-4 rounded-l-lg border-r-2 border-orange-500/50 shadow-lg flex items-center gap-3 min-w-[160px] justify-end"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                Occupation
              </span>
              <span className="text-zinc-100 font-semibold text-sm">
                {stats.job}
              </span>
            </div>
            <div className="bg-orange-500/10 p-1.5 rounded-md border border-orange-500/20">
              <Briefcase className="w-4 h-4 text-orange-500" />
            </div>
          </motion.div>

          {/* ID Card */}
          <motion.div variants={itemVariants} className="flex gap-2">
            <div className="bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-700 shadow-lg flex items-center gap-2">
              <User className="w-3 h-3 text-zinc-400" />
              <span className="text-zinc-200 font-bold text-sm font-mono">
                ID: <span className="text-white">{stats.id}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HUD;
