import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Plus, Play, Calendar, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import EventManager from "../../utils/EventManager";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ServerEvents } from "../../../shared/constants/Events";

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  level: number;
  playedTime: number; // Minute
  lastPlayed: string;
}

const CharacterSelector: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const characters: Character[] = (location.state as any)?.characters || [];
  const maxSlots: number = (location.state as any)?.maxSlots || 1;

  const usedSlots = characters.length;
  const canCreate = usedSlots < maxSlots;

  const handleSelect = (charId: number) => {
    if (loading) return;
    setLoading(true);
    EventManager.triggerServer(ServerEvents.CHAR_SELECT, charId);
  };

  const handleCreateNew = () => {
    if (!canCreate) return;
    EventManager.trigger("client:requestCreator");
  };

  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 Hr" : `${hours} Hrs`;
  };

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative font-sans selection:bg-primary/30 flex flex-col items-center justify-center">
      {/* Ambient Background - No Blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-80" />
      
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-8 flex justify-between items-start z-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t('char_select.title')}</h1>
          <p className="text-secondary font-medium mt-1">{t('char_select.subtitle')}</p>
        </div>
        <div className="bg-surface-100 px-4 py-2 rounded-full border border-white/5 flex items-center gap-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-zinc-300 tracking-wide uppercase">Online</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-medium text-secondary">
             {t('char_select.slots_used')}: <span className="text-white font-bold">{usedSlots}</span> / {maxSlots}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative z-10 w-full overflow-x-auto px-12 py-8 flex items-center justify-center gap-8 no-scrollbar">
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
            className="group relative w-[320px] h-[480px] bg-surface-100 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Gradient Top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-200/50 to-transparent pointer-events-none" />

            <div className="p-8 flex flex-col h-full">
              {/* Level Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-surface-200 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors border border-white/5">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{t('char_select.level')}</span>
                  <span className="text-2xl font-bold text-white leading-none mt-1">{char.level}</span>
                </div>
              </div>

              {/* Name */}
              <div className="mb-auto">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {char.firstName}
                  <br />
                  <span className="text-secondary font-medium">{char.lastName}</span>
                </h3>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-secondary bg-surface-200/50 p-3 rounded-xl border border-white/5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">{formatHours(char.playedTime)} {t('char_select.played')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary bg-surface-200/50 p-3 rounded-xl border border-white/5">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span className="font-medium">{new Date(char.lastPlayed).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleSelect(char.id)}
                disabled={loading}
                className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-between px-6 group/btn"
              >
                <span>{loading ? "Loading..." : t('char_select.play_now')}</span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </Button>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: characters.length * 0.1, duration: 0.5 }}
          onClick={handleCreateNew}
          disabled={!canCreate || loading}
          className={cn(
            "w-[320px] h-[480px] rounded-[2rem] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-6 transition-all duration-300",
            canCreate && !loading
              ? "hover:border-primary/50 hover:bg-surface-100/50 cursor-pointer group" 
              : "opacity-50 cursor-not-allowed grayscale"
          )}
        >
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
            canCreate && !loading ? "bg-primary text-white group-hover:scale-110 group-hover:shadow-primary/30" : "bg-zinc-800 text-zinc-500"
          )}>
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2">
             <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{t('char_select.new_char')}</h3>
             <p className="text-sm text-secondary font-medium px-8">
               {canCreate ? t('char_select.create_subtitle') : t('char_select.limit_reached')}
             </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default CharacterSelector;