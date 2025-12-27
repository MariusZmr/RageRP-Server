import React, { useState, useEffect } from "react";
import EventManager from "../utils/EventManager";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Car, 
  Bell, 
  Map, 
  Terminal, 
  Settings, 
  LogOut,
  User,
  Zap,
  Lock,
  Info,
  CheckCircle,
  AlertTriangle,
  X,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

const DevTools: React.FC = () => {
  // Logic: Enabled by default ONLY in Browser. Disabled in Game (requires command).
  const [isEnabled, setIsEnabled] = useState(typeof window !== "undefined" && !(window as any).mp);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'nav' | 'vehicle' | 'notifs'>('nav');
  
  // --- Vehicle Mock State ---
  const [inVehicle, setInVehicle] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [locked, setLocked] = useState(false);
  const [seatbelt, setSeatbelt] = useState(false);
  const [lights, setLights] = useState(false);
  const [engineHealth, setEngineHealth] = useState(1000);

  // Toggle Visibility Event Listener (From Client)
  useEffect(() => {
    const handleToggle = (state: boolean) => {
        setIsEnabled(state);
        if (state) setIsOpen(true); 
        else setIsOpen(false);
    };
    EventManager.on('devtools:toggle', handleToggle);
    return () => EventManager.off('devtools:toggle', handleToggle);
  }, []);

  // Sync Vehicle (Only when enabled and in vehicle)
  useEffect(() => {
    if (!isEnabled || !inVehicle) {
        if (isEnabled) EventManager.trigger('vehicle:update', { inVehicle: false });
        return;
    }
    
    EventManager.trigger('vehicle:update', {
        inVehicle: true,
        speed,
        rpm,
        gear: speed > 0 ? Math.ceil(speed / 30) : 0,
        fuel,
        locked,
        seatbelt,
        lights,
        engineHealth
    });
  }, [isEnabled, inVehicle, speed, rpm, fuel, locked, seatbelt, lights, engineHealth]);

  // If disabled (In game without command), render NOTHING. No hitbox, no button.
  if (!isEnabled) return null;

  return (
    <>
        {/* --- Always Visible Trigger Button (Top Left) --- */}
        <div className="fixed top-4 left-4 z-[999999] pointer-events-auto mix-blend-difference">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-md transition-all group"
            >
                <Terminal size={20} className="opacity-50 group-hover:opacity-100" />
            </button>
        </div>

        {/* --- Sidebar Container --- */}
        <div 
            className="fixed top-0 left-0 h-screen z-[99999] flex pointer-events-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* --- Hitbox / Sidebar Strip --- */}
            <div className={cn(
                "h-full transition-all duration-300 flex flex-col items-center pt-20 gap-4 border-r border-white/5 backdrop-blur-sm",
                isOpen ? "bg-[#050505] w-16" : "w-6 bg-transparent hover:bg-white/5"
            )}>
                {/* Sidebar Icons (Visible when open) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-4 w-full items-center"
                        >
                            <TabButton active={activeTab === 'nav'} onClick={() => setActiveTab('nav')} icon={<Map size={20} />} label="NAV" />
                            <TabButton active={activeTab === 'vehicle'} onClick={() => setActiveTab('vehicle')} icon={<Car size={20} />} label="CAR" />
                            <TabButton active={activeTab === 'notifs'} onClick={() => setActiveTab('notifs')} icon={<Bell size={20} />} label="MSG" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- Content Panel (Slide Out) --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -320, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="h-full w-80 bg-[#050505] border-r border-white/5 shadow-2xl p-6 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                            <Terminal className="text-primary w-5 h-5" />
                            <div>
                                <h2 className="text-sm font-black text-white tracking-widest uppercase">Dev<span className="text-primary">Console</span></h2>
                                <p className="text-[10px] text-zinc-500 font-mono">v3.2 • TOTAL STEALTH</p>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                            
                            {/* 1. NAVIGATION TAB */}
                            {activeTab === 'nav' && (
                                <div className="space-y-4">
                                    <SectionTitle title="Interface Routing" />
                                    <div className="grid grid-cols-1 gap-2">
                                        <NavBtn label="Authentication" sub="Login & Register" onClick={() => EventManager.trigger('navigateTo', { route: '/login' })} icon={<LogOut size={14} />} />
                                        <NavBtn label="Character Select" sub="Slot Selection" onClick={() => EventManager.trigger('navigateTo', { route: '/char-selector' })} icon={<User size={14} />} />
                                        <NavBtn label="Character Creator" sub="Customization" onClick={() => EventManager.trigger('navigateTo', { route: '/char-creator' })} icon={<Settings size={14} />} />
                                        <NavBtn label="Game Interface" sub="HUD & Overlay" onClick={() => EventManager.trigger('navigateTo', { route: '/game' })} icon={<Map size={14} />} active />
                                    </div>
                                </div>
                            )}

                            {/* 2. VEHICLE TAB */}
                            {activeTab === 'vehicle' && (
                                <div className="space-y-6">
                                    <SectionTitle title="Vehicle Simulator" />
                                    
                                    {/* Engine Toggle */}
                                    <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                                        <span className="text-xs font-medium text-zinc-400">Simulation State</span>
                                        <button 
                                            onClick={() => setInVehicle(!inVehicle)}
                                            className={cn(
                                                "px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-all",
                                                inVehicle ? "bg-primary text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-zinc-800 text-zinc-500"
                                            )}
                                        >
                                            {inVehicle ? "ACTIVE" : "DISABLED"}
                                        </button>
                                    </div>

                                    {inVehicle && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                            <ControlSlider label="Speed" value={speed} max={300} unit="km/h" onChange={setSpeed} />
                                            <ControlSlider label="RPM" value={rpm} max={1} step={0.01} unit="x1000" onChange={setRpm} color="accent-orange-500" />
                                            <ControlSlider label="Fuel" value={fuel} max={100} unit="%" onChange={setFuel} color="accent-blue-500" />
                                            
                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                <ToggleBtn active={locked} onClick={() => setLocked(!locked)} icon={<Lock size={14} />} />
                                                <ToggleBtn active={seatbelt} onClick={() => setSeatbelt(!seatbelt)} icon={<Zap size={14} />} color="text-green-500" />
                                                <ToggleBtn active={lights} onClick={() => setLights(!lights)} icon={<Info size={14} />} color="text-blue-500" />
                                                <ToggleBtn active={engineHealth < 400} onClick={() => setEngineHealth(engineHealth < 400 ? 1000 : 300)} icon={<AlertTriangle size={14} />} color="text-orange-500" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 3. NOTIFICATIONS TAB */}
                            {activeTab === 'notifs' && (
                                <div className="space-y-4">
                                    <SectionTitle title="Notification System" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <NotifyBtn type="success" title="Success" msg="Operation completed." />
                                        <NotifyBtn type="error" title="Critical Error" msg="Connection lost to server." />
                                        <NotifyBtn type="warning" title="Warning" msg="Fuel level is critical." />
                                        <NotifyBtn type="info" title="New Message" msg="You received a dispatch." />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-6 border-t border-white/5 text-[10px] text-zinc-600 font-mono text-center uppercase">
                            React UI Debugger • v3.2
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>
  );
};

// --- Sub Components ---
const TabButton = ({ active, onClick, icon, label }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200",
            active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-600 hover:text-white hover:bg-white/5"
        )}
    >
        {icon}
    </button>
);

const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">{title}</h3>
);

const NavBtn = ({ label, sub, onClick, icon, active }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left group",
            active ? "bg-white/5 border-primary/50" : "bg-transparent border-zinc-800 hover:border-zinc-600"
        )}
    >
        <div className={cn("p-2 rounded bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors", active && "text-primary")}>
            {icon}
        </div>
        <div>
            <div className={cn("text-xs font-bold", active ? "text-white" : "text-zinc-400 group-hover:text-white")}>{label}</div>
            <div className="text-[9px] text-zinc-600">{sub}</div>
        </div>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_currentColor]" />}
    </button>
);

const ControlSlider = ({ label, value, max, step=1, unit, onChange, color="accent-primary" }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
            <span>{label}</span>
            <span className="text-zinc-300 font-mono">{typeof value === 'number' ? value.toFixed(step === 1 ? 0 : 2) : value} {unit}</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max={max} 
            step={step} 
            value={value} 
            onChange={e => onChange(Number(e.target.value))} 
            className={cn("w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer", color)} 
        />
    </div>
);

const ToggleBtn = ({ active, onClick, icon, color = "text-white" }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "flex items-center justify-center h-10 rounded border transition-all",
            active 
                ? `bg-zinc-800 border-zinc-600 ${color} shadow-inner` 
                : "bg-transparent border-zinc-800 text-zinc-700 hover:border-zinc-700"
        )}
    >
        {icon}
    </button>
);

const NotifyBtn = ({ type, title, msg }: any) => (
    <button
        onClick={() => window.triggerNotification?.(type, title, msg)}
        className={cn(
            "flex flex-col items-start p-3 rounded border border-zinc-800 hover:border-zinc-600 transition-all text-left bg-zinc-900/30",
            type === 'success' && "hover:border-green-500/50 hover:bg-green-500/10",
            type === 'error' && "hover:border-red-500/50 hover:bg-red-500/10",
            type === 'warning' && "hover:border-yellow-500/50 hover:bg-yellow-500/10",
            type === 'info' && "hover:border-blue-500/50 hover:bg-blue-500/10",
        )}
    >
        <span className={cn(
            "text-[10px] font-black uppercase tracking-wider mb-1",
            type === 'success' ? "text-green-500" :
            type === 'error' ? "text-red-500" :
            type === 'warning' ? "text-yellow-500" : "text-blue-500"
        )}>{type}</span>
        <span className="text-xs text-zinc-400 font-medium">Test Notification</span>
    </button>
);

export default DevTools;
