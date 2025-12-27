import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fuel, Lock, Unlock, Zap, Gauge, Fan, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventManager from '@/utils/EventManager';
import { useTranslation } from 'react-i18next';
import storage from '@/utils/storage';

interface VehicleStats {
    inVehicle: boolean;
    speed: number;
    rpm: number;
    gear: number;
    fuel: number;
    locked: boolean;
    lights: boolean;
    seatbelt: boolean;
    engineHealth: number;
}

const VehicleHUD: React.FC = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState<VehicleStats>({
        inVehicle: false,
        speed: 0,
        rpm: 0,
        gear: 0,
        fuel: 100,
        locked: false,
        lights: false,
        seatbelt: false,
        engineHealth: 1000
    });

    const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph'>('kmh');

    useEffect(() => {
        const savedUnit = storage.getItem('settings_speedUnit') as 'kmh' | 'mph';
        if (savedUnit) setSpeedUnit(savedUnit);

        const handleUpdate = (data: Partial<VehicleStats>) => {
            setStats(prev => ({ ...prev, ...data }));
        };

        const handleSettings = (data: { speedUnit: 'kmh' | 'mph' }) => {
            setSpeedUnit(data.speedUnit);
        };

        EventManager.on('vehicle:update', handleUpdate);
        EventManager.on('settings:update', handleSettings);

        return () => {
            EventManager.off('vehicle:update', handleUpdate);
            EventManager.off('settings:update', handleSettings);
        };
    }, []);

    if (!stats.inVehicle) return null;

    const displaySpeed = Math.floor(speedUnit === 'kmh' ? stats.speed : stats.speed * 0.621371);
    const unitLabel = speedUnit === 'kmh' ? 'KMH' : 'MPH';
    
    // RPM Logic
    const getRpmColor = (rpm: number) => {
        if (rpm > 0.9) return "#ef4444"; // Red
        if (rpm > 0.75) return "#f97316"; // Orange
        return "#ffffff"; // White
    };

    // Configurare Arc RPM (Semi-cerc jos)
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    // Vrem un arc de jos, aprox 200 grade
    // DashArray: lungimea liniei vizibile
    // DashOffset: unde incepe golul
    
    // Calcul simplificat pentru un arc curat:
    // Folosim un cerc rotit.

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-6 left-[18.5rem] flex flex-col items-start gap-1 pointer-events-none select-none z-10"
            >
                
                {/* --- Row 1: Speed, RPM, Gear --- */}
                <div className="relative w-40 h-24 flex items-end">
                    
                    {/* RPM Line (Background) - Subtle styling */}
                    <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="rpmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0.5" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        
                        {/* Background Track */}
                        <path 
                            d="M 10 90 Q 80 40 150 90" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.1)" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                        />

                        {/* Active RPM */}
                        <motion.path 
                            d="M 10 90 Q 80 40 150 90" 
                            fill="none" 
                            stroke={getRpmColor(stats.rpm)} 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: stats.rpm }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            style={{ filter: `drop-shadow(0 0 5px ${getRpmColor(stats.rpm)})` }}
                        />
                    </svg>

                    {/* Speed Number */}
                    <div className="relative z-10 flex items-baseline gap-2 ml-4 mb-2">
                        <span className="text-7xl font-black italic tracking-tighter text-white drop-shadow-xl font-mono leading-none"
                              style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
                            {displaySpeed}
                        </span>
                        
                        <div className="flex flex-col justify-end h-full pb-1">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest drop-shadow-md">
                                {unitLabel}
                            </span>
                             {/* Discrete Gear Indicator */}
                             <div className="flex items-center gap-1 mt-1">
                                <div className={cn("text-lg font-bold font-mono transition-colors drop-shadow-md", stats.gear === 0 ? "text-primary" : "text-white")}>
                                    {stats.gear === 0 ? "R" : stats.gear}
                                </div>
                                <span className="text-[9px] text-zinc-600 font-bold uppercase">GEAR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Row 2: Fuel Line & Status Icons --- */}
                <div className="w-full pl-6 flex items-center justify-between gap-6">
                    
                    {/* Fuel Bar (Thin Line) */}
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="w-full h-1 bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-[1px]">
                            <motion.div 
                                className={cn("h-full shadow-[0_0_10px_currentColor]", stats.fuel < 20 ? "bg-red-500" : "bg-white")}
                                animate={{ width: `${stats.fuel}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </div>

                    {/* Icons Row (Subtle) */}
                    <div className="flex items-center gap-3">
                         <StatusIcon active={stats.locked} icon={<Lock size={16} />} activeColor="text-red-500" inactiveIcon={<Unlock size={16} />} />
                         <StatusIcon active={!stats.seatbelt} icon={<div className="text-[10px] font-black">BELT</div>} activeColor="text-red-500 animate-pulse" />
                         <StatusIcon active={stats.engineHealth < 400} icon={<Zap size={16} />} activeColor="text-orange-500 animate-pulse" />
                         <StatusIcon active={stats.lights} icon={<div className="text-[10px] font-bold">LGT</div>} activeColor="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                         <StatusIcon active={stats.fuel < 15} icon={<Fuel size={16} />} activeColor="text-yellow-500 animate-pulse" inactive={false} />
                    </div>

                </div>

            </motion.div>
        </AnimatePresence>
    );
};

// Subtle Icon Component
const StatusIcon = ({ active, icon, activeColor, inactiveIcon, inactive = true }: any) => {
    // If inactive is true, we show a faded version. If false, we hide it completely when not active.
    
    return (
        <div className={cn(
            "transition-all duration-300 flex items-center justify-center",
            active 
                ? `${activeColor} drop-shadow-md scale-110` 
                : (inactive ? "text-zinc-600/50 scale-100" : "opacity-0 w-0 overflow-hidden")
        )}>
            {active ? icon : (inactiveIcon || icon)}
        </div>
    );
};

export default VehicleHUD;