import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, Lock, Unlock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import EventManager from "@/utils/EventManager";
import storage from "@/utils/storage";

// --- Types ---
interface VehicleStats {
  inVehicle: boolean;
  speed: number;
  rpm: number; // 0.0 to 1.0
  gear: number;
  fuel: number; // 0 to 100
  locked: boolean;
  seatbelt: boolean;
  engineHealth: number;
}

// --- Custom Components ---

// 1. Custom Seatbelt Icon with Breathing Animation
const SeatbeltIcon = ({ active }: { active: boolean }) => {
  // Active = Belt IS fastened (Secure). Inactive = Belt NOT fastened (Warning).
  // The UI logic usually highlights the WARNING state.
  // So: !active (not buckled) -> Red + Breathe. active (buckled) -> Green/Grey + Static.

  const isWarning = !active;

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center w-5 h-5",
        isWarning ? "text-red-500" : "text-emerald-500"
      )}
      animate={isWarning ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Abstract Person Body */}
        <path d="M4 18v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" opacity="0.5" />
        {/* Belt Strap (Diagonal) */}
        <line x1="4" y1="20" x2="20" y2="4" />
        {/* Buckle/Clasp */}
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    </motion.div>
  );
};

// --- Main Component ---
const Speedometer: React.FC = () => {
  const [stats, setStats] = useState<VehicleStats>({
    inVehicle: false,
    speed: 0,
    rpm: 0,
    gear: 0,
    fuel: 100,
    locked: false,
    seatbelt: false,
    engineHealth: 1000,
  });

  const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");

  useEffect(() => {
    const savedUnit = storage.getItem("settings_speedUnit") as "kmh" | "mph";
    if (savedUnit) setSpeedUnit(savedUnit);

    const handleUpdate = (data: Partial<VehicleStats>) => {
      setStats((prev) => ({ ...prev, ...data }));
    };

    const handleSettings = (data: { speedUnit: "kmh" | "mph" }) => {
      setSpeedUnit(data.speedUnit);
    };

    EventManager.on("vehicle:update", handleUpdate);
    EventManager.on("settings:update", handleSettings);

    return () => {
      EventManager.off("vehicle:update", handleUpdate);
      EventManager.off("settings:update", handleSettings);
    };
  }, []);

  const displaySpeed = Math.floor(
    speedUnit === "kmh" ? stats.speed : stats.speed * 0.621371
  );
  const unitLabel = speedUnit === "kmh" ? "KMH" : "MPH";

  // RPM Color Logic
  const isRedline = stats.rpm > 0.85;

  return (
    <AnimatePresence>
      {stats.inVehicle && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          // Positioned bottom-left, clearing map area
          className="fixed bottom-8 left-[19rem] z-10 pointer-events-none select-none"
        >
          {/* --- Main Pill Container --- */}
          <div className="relative h-20 bg-zinc-950/95 border border-white/5 rounded-full shadow-2xl flex items-center overflow-hidden px-8 group">
            {/* RPM Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-800/30 w-full">
              <motion.div
                className={cn(
                  "h-full bg-gradient-to-r from-transparent via-primary to-primary transition-all duration-100 ease-linear",
                  isRedline
                    ? "shadow-[0_-2px_12px_rgba(239,68,68,0.8)]"
                    : "shadow-[0_0_5px_rgba(239,68,68,0.3)]"
                )}
                style={{ width: `${stats.rpm * 100}%` }}
              />
            </div>

            {/* --- LEFT: Speed & Gear --- */}
            <div className="flex items-baseline gap-2 relative z-10">
              {/* Speed Number (No Italic, Black Weight) */}
              <span className="text-5xl font-black tracking-tighter text-white font-mono leading-none drop-shadow-xl">
                {displaySpeed}
              </span>

              <div className="flex flex-col items-start leading-none -mb-1 gap-1">
                {/* Unit */}
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  {unitLabel}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-6" />

            {/* --- RIGHT: Status Grid --- */}
            <div className="flex flex-col justify-center gap-2">
              {/* Row 1: Fuel */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Fuel
                    size={12}
                    strokeWidth={2.5}
                    className={cn(
                      stats.fuel < 20 && "text-red-500 animate-pulse"
                    )}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Fuel
                  </span>
                </div>
                <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      stats.fuel < 20 ? "bg-red-500" : "bg-white"
                    )}
                    animate={{ width: `${stats.fuel}%` }}
                  />
                </div>
              </div>

              {/* Row 2: Icons Row (Spaced out) */}
              <div className="flex items-center gap-5 pl-0.5">
                {/* Seatbelt (Custom SVG) */}
                <div title="Seatbelt">
                  <SeatbeltIcon active={stats.seatbelt} />
                </div>

                {/* Lock */}
                <div
                  className={cn(
                    "transition-colors duration-300",
                    stats.locked
                      ? "text-red-500 drop-shadow-md"
                      : "text-zinc-700"
                  )}
                >
                  {stats.locked ? (
                    <Lock size={16} strokeWidth={2.5} />
                  ) : (
                    <Unlock size={16} strokeWidth={2.5} />
                  )}
                </div>

                {/* Engine */}
                <div
                  className={cn(
                    "transition-colors duration-300",
                    stats.engineHealth < 400
                      ? "text-orange-500 animate-pulse drop-shadow-md"
                      : "text-zinc-700"
                  )}
                >
                  <Zap
                    size={16}
                    fill={stats.engineHealth < 400 ? "currentColor" : "none"}
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Speedometer;
