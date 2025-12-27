import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Volume2, Gauge } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import EventManager from '@/utils/EventManager';
import storage from '@/utils/storage';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { t, i18n } = useTranslation();
    const [volume, setVolume] = useState(100);
    const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph'>('kmh');

    useEffect(() => {
        const savedUnit = storage.getItem('settings_speedUnit') as 'kmh' | 'mph';
        if (savedUnit) setSpeedUnit(savedUnit);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        storage.setItem('i18nextLng', lng);
    };

    const changeSpeedUnit = (unit: 'kmh' | 'mph') => {
        setSpeedUnit(unit);
        storage.setItem('settings_speedUnit', unit);
        EventManager.trigger('settings:update', { speedUnit: unit });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/50">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('settings.title')}</h2>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={onClose}
                                className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
                            
                            {/* Language */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                    <Globe className="w-4 h-4" />
                                    {t('settings.language')}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => changeLanguage('ro')}
                                        className={cn(
                                            "h-12 rounded-xl border font-bold transition-all",
                                            i18n.language === 'ro' 
                                                ? "bg-primary/20 border-primary text-white" 
                                                : "bg-zinc-900 border-transparent text-zinc-500 hover:bg-zinc-800"
                                        )}
                                    >
                                        Română
                                    </button>
                                    <button 
                                        onClick={() => changeLanguage('en')}
                                        className={cn(
                                            "h-12 rounded-xl border font-bold transition-all",
                                            i18n.language === 'en' 
                                                ? "bg-primary/20 border-primary text-white" 
                                                : "bg-zinc-900 border-transparent text-zinc-500 hover:bg-zinc-800"
                                        )}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>

                            {/* Speed Unit */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                    <Gauge className="w-4 h-4" />
                                    {t('settings.speed_unit')}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => changeSpeedUnit('kmh')}
                                        className={cn(
                                            "h-12 rounded-xl border font-bold transition-all",
                                            speedUnit === 'kmh' 
                                                ? "bg-primary/20 border-primary text-white" 
                                                : "bg-zinc-900 border-transparent text-zinc-500 hover:bg-zinc-800"
                                        )}
                                    >
                                        {t('settings.kmh')}
                                    </button>
                                    <button 
                                        onClick={() => changeSpeedUnit('mph')}
                                        className={cn(
                                            "h-12 rounded-xl border font-bold transition-all",
                                            speedUnit === 'mph' 
                                                ? "bg-primary/20 border-primary text-white" 
                                                : "bg-zinc-900 border-transparent text-zinc-500 hover:bg-zinc-800"
                                        )}
                                    >
                                        {t('settings.mph')}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Volume (Placeholder) */}
                            <div className="space-y-3 opacity-50 pointer-events-none grayscale">
                                <div className="flex items-center justify-between text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Volume2 className="w-4 h-4" />
                                        {t('settings.audio')}
                                    </div>
                                    <span className="text-white">{volume}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    value={volume} 
                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-surface-300 rounded-full appearance-none" 
                                />
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-surface-200/30">
                            <Button 
                                onClick={onClose}
                                className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl"
                            >
                                {t('settings.save')}
                            </Button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
