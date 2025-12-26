import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Plus, Play, Calendar, Shield, Clock, Hourglass, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import EventManager from "../../utils/EventManager";

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  level: number;
  playedTime: number; // Minute
  lastPlayed: string;
}

const CharacterSelector: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Preluăm datele din state-ul de navigare
  const characters: Character[] = (location.state as any)?.characters || [];
  const maxSlots: number = (location.state as any)?.maxSlots || 1;

  const usedSlots = characters.length;
  const canCreate = usedSlots < maxSlots;

  const handleSelect = (charId: number) => {
    EventManager.triggerServer("character:select", charId);
  };

  const handleCreateNew = () => {
    if (!canCreate) return;
    EventManager.trigger("client:requestCreator");
  };

  // Helper pentru formatare ore
  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 Hr" : `${hours} Hrs`;
  };

  // Variabile pentru animație
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white overflow-hidden relative selection:bg-orange-500/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center p-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold tracking-widest uppercase">
                <Shield size={12} />
                Secure Connection
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold tracking-widest uppercase">
                <span>Slots:</span>
                <span className={canCreate ? "text-green-400" : "text-red-400"}>{usedSlots} / {maxSlots}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Select Identity
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">
            Choose your operative to proceed to Los Santos
          </p>
        </motion.div>

        {/* Grid de Caractere */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {/* Carduri Caractere Existente */}
          {characters.map((char) => (
            <motion.div
              key={char.id}
              variants={itemVariants}
              className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 rounded-lg overflow-hidden backdrop-blur-sm"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                    <User size={24} />
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-zinc-500 uppercase tracking-wider">Level</span>
                    <span className="text-xl font-bold text-white">{char.level}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {char.firstName} <span className="text-zinc-500">{char.lastName}</span>
                </h3>

                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock size={12} />
                        <span>Last seen: {new Date(char.lastPlayed).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Hourglass size={12} />
                        <span>Playtime: {formatHours(char.playedTime)}</span>
                    </div>
                </div>

                <Button
                  onClick={() => handleSelect(char.id)}
                  className="w-full bg-zinc-100 text-zinc-950 hover:bg-orange-500 hover:text-white transition-all font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  Deploy
                </Button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zinc-800/20 to-transparent -mr-8 -mt-8 rotate-45 group-hover:from-orange-500/20 transition-all" />
            </motion.div>
          ))}

          {/* Card "New Identity" - Condiționat de sloturi */}
          <motion.div
            variants={itemVariants}
            onClick={handleCreateNew}
            className={`group relative border transition-all duration-300 rounded-lg flex flex-col items-center justify-center min-h-[280px]
                ${canCreate 
                    ? "cursor-pointer bg-zinc-900/30 border-dashed border-zinc-700 hover:border-orange-500 hover:bg-zinc-900/50" 
                    : "cursor-not-allowed bg-zinc-950/50 border-zinc-800 opacity-60 grayscale"
                }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mb-4 shadow-lg shadow-black/50
                ${canCreate 
                    ? "bg-zinc-800 text-zinc-500 group-hover:bg-orange-500 group-hover:text-white" 
                    : "bg-zinc-900 text-red-900/50 border border-zinc-800"
                }`}>
              {canCreate ? <Plus size={32} /> : <Lock size={32} />}
            </div>
            
            <h3 className={`text-lg font-bold transition-colors uppercase tracking-wide
                ${canCreate ? "text-zinc-300 group-hover:text-white" : "text-zinc-600"}`}>
              {canCreate ? "New Identity" : "Max Limit Reached"}
            </h3>
            
            <p className="text-xs text-zinc-500 mt-2 text-center px-8">
              {canCreate 
                ? "Create a new dossier for tactical operations."
                : "Increase your playtime or rank to unlock more slots."}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSelector;
