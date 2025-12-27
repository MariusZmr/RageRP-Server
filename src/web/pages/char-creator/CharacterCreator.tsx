import React, { useState, useEffect } from 'react';
import EventManager from '../../utils/EventManager';
import { 
    Dna, 
    User, 
    Palette, 
    Scissors, 
    Check, 
    RotateCcw, 
    ChevronRight,
    SlidersHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// --- Window Type Extensions ---
declare global {
    interface Window {
        mp?: {
            trigger: (event: string, data?: string) => void;
        };
        triggerNotification?: (type: string, title: string, message: string, duration?: number) => void;
    }
}

// --- Types ---
interface CharacterData {
    parents: {
        father: number;
        mother: number;
        similarity: number;
        skin: number;
    };
    features: number[];
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    info: {
        firstName: string;
        lastName: string;
        age: number;
        gender: number; // 0 = Male, 1 = Female
    };
}

const FEATURE_NAMES = [
    "Nose Width", "Nose Peak Height", "Nose Length", "Nose Bone Height", "Nose Peak Lowering", "Nose Bone Twist",
    "Eyebrow Height", "Eyebrow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth",
    "Eye Squint", "Lip Thickness", "Jaw Width", "Jaw Height", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"
];

const CharacterCreator: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'genealogy' | 'features' | 'style' | 'identity'>('identity');
    
    const [data, setData] = useState<CharacterData>({
        parents: { father: 0, mother: 21, similarity: 0.5, skin: 0.5 },
        features: Array(20).fill(0),
        hair: { style: 0, color: 0, highlight: 0 },
        info: { firstName: "", lastName: "", age: 18, gender: 0 }
    });

    const updateParents = (key: keyof typeof data.parents, value: number) => {
        const newParents = { ...data.parents, [key]: value };
        setData(prev => ({ ...prev, parents: newParents }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'parents', data: newParents }));
    };

    const updateFeature = (index: number, value: number) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData(prev => ({ ...prev, features: newFeatures }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'features', data: newFeatures }));
    };

    const updateHair = (key: keyof typeof data.hair, value: number) => {
        const newHair = { ...data.hair, [key]: value };
        setData(prev => ({ ...prev, hair: newHair }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'hair', data: newHair }));
    };

    const updateInfo = (key: keyof typeof data.info, value: string | number) => {
        const newInfo = { ...data.info, [key]: value };
        setData(prev => ({ ...prev, info: newInfo }));
        if (key === 'gender') {
            if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'gender', data: value }));
        }
    };

    const handleSave = () => {
        if (data.info.firstName.length < 3 || data.info.lastName.length < 3) {
            if (window.triggerNotification) window.triggerNotification('error', 'Validation', 'Name must be at least 3 characters.');
            return;
        }
        if (window.triggerNotification) window.triggerNotification('info', 'Processing', 'Creating identity...', 2000);
        EventManager.triggerServer('character:create', JSON.stringify(data));
    };

    useEffect(() => {
        let cameraTarget = 'default';
        if (['genealogy', 'features', 'style'].includes(activeTab)) cameraTarget = 'head';
        if (window.mp) window.mp.trigger('char:cameraFocus', cameraTarget);
    }, [activeTab]);

    const renderSlider = (label: string, value: number, min: number, max: number, step: number, onChange: (val: number) => void) => (
        <div className="mb-6 group">
            <div className="flex justify-between items-end mb-2.5">
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors tracking-wide">
                    {label}
                </span>
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {value.toFixed(step === 1 ? 0 : 2)}
                </span>
            </div>
            <div className="relative h-2 w-full">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="absolute inset-y-0 left-0 w-full bg-zinc-800 rounded-full overflow-hidden h-1.5 top-1/2 -translate-y-1/2">
                    <div 
                        className="h-full bg-primary transition-all duration-100 ease-out"
                        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                    />
                </div>
                <div 
                    className="absolute h-4 w-4 bg-white rounded-full shadow-md top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-100 ease-out border-2 border-primary"
                    style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)` }}
                />
            </div>
        </div>
    );

    return (
        <div 
            id="char-creator-container"
            className="absolute inset-0 z-50 flex h-screen w-screen overflow-hidden font-sans selection:bg-primary/30"
        >
            {/* --- LEFT SIDEBAR (Navigation) --- */}
            <div className="w-80 h-full bg-surface-100 border-r border-white/5 flex flex-col shadow-2xl z-20">
                <div className="p-8 pb-6 border-b border-white/5 bg-surface-100">
                    <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                        Identity<span className="text-primary">Lab</span>
                    </h1>
                    <p className="text-sm font-medium text-zinc-400 leading-snug">
                        {t('char_create.subtitle')}
                    </p>
                </div>

                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <NavButton 
                        active={activeTab === 'identity'} 
                        onClick={() => setActiveTab('identity')}
                        icon={<User className="w-5 h-5" />}
                        label={t('char_create.menu.identity')}
                        desc={t('char_create.menu.identity_desc')}
                    />
                    <NavButton 
                        active={activeTab === 'genealogy'} 
                        onClick={() => setActiveTab('genealogy')}
                        icon={<Dna className="w-5 h-5" />}
                        label={t('char_create.menu.genetics')}
                        desc={t('char_create.menu.genetics_desc')}
                    />
                    <NavButton 
                        active={activeTab === 'features'} 
                        onClick={() => setActiveTab('features')}
                        icon={<SlidersHorizontal className="w-5 h-5" />}
                        label={t('char_create.menu.features')}
                        desc={t('char_create.menu.features_desc')}
                    />
                    <NavButton 
                        active={activeTab === 'style'} 
                        onClick={() => setActiveTab('style')}
                        icon={<Scissors className="w-5 h-5" />}
                        label={t('char_create.menu.style')}
                        desc={t('char_create.menu.style_desc')}
                    />
                </div>

                <div className="p-6 border-t border-white/5 bg-surface-100">
                    <Button 
                        onClick={handleSave}
                        className="w-full h-14 bg-primary hover:bg-primary-hover text-white text-base font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        {t('char_create.finalize')}
                    </Button>
                </div>
            </div>

            {/* --- RIGHT PANEL (Controls) --- */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-8 top-8 bottom-8 w-[420px] bg-surface-100/95 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col overflow-hidden backdrop-blur-none"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {activeTab === 'genealogy' && t('char_create.menu.genetics')}
                            {activeTab === 'features' && t('char_create.menu.features')}
                            {activeTab === 'style' && t('char_create.menu.style')}
                            {activeTab === 'identity' && t('char_create.menu.identity')}
                        </h2>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full">
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {/* 1. IDENTITY */}
                        {activeTab === 'identity' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => updateInfo('gender', 0)}
                                        className={cn(
                                            "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 group",
                                            data.info.gender === 0 
                                                ? "border-primary bg-primary/10 text-white shadow-lg shadow-primary/10" 
                                                : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                                        )}
                                    >
                                        <div className={cn("p-3 rounded-full", data.info.gender === 0 ? "bg-primary text-white" : "bg-zinc-800")}>
                                            <User className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-wider">{t('char_create.labels.male')}</span>
                                    </button>
                                    <button 
                                        onClick={() => updateInfo('gender', 1)}
                                        className={cn(
                                            "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 group",
                                            data.info.gender === 1 
                                                ? "border-primary bg-primary/10 text-white shadow-lg shadow-primary/10" 
                                                : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                                        )}
                                    >
                                        <div className={cn("p-3 rounded-full", data.info.gender === 1 ? "bg-primary text-white" : "bg-zinc-800")}>
                                            <User className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-wider">{t('char_create.labels.female')}</span>
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                            {t('char_create.labels.firstname')}
                                        </label>
                                        <Input 
                                            className="bg-zinc-900/80 border-zinc-800 focus:border-primary focus:ring-primary/20 text-white h-14 rounded-xl text-lg px-4"
                                            placeholder="John"
                                            value={data.info.firstName}
                                            onChange={(e) => updateInfo('firstName', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                            {t('char_create.labels.lastname')}
                                        </label>
                                        <Input 
                                            className="bg-zinc-900/80 border-zinc-800 focus:border-primary focus:ring-primary/20 text-white h-14 rounded-xl text-lg px-4"
                                            placeholder="Doe"
                                            value={data.info.lastName}
                                            onChange={(e) => updateInfo('lastName', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        {renderSlider(`${t('char_create.labels.age')} (${data.info.age})`, data.info.age, 18, 90, 1, (v) => updateInfo('age', v))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. GENETICS */}
                        {activeTab === 'genealogy' && (
                            <div className="space-y-4">
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6">
                                    <p className="text-sm text-blue-200 leading-relaxed font-medium">
                                        Adjust genetic influence to blend facial structure and skin tone between parents.
                                    </p>
                                </div>
                                {renderSlider(t('char_create.labels.resemblance'), data.parents.similarity, 0.0, 1.0, 0.05, (v) => updateParents('similarity', v))}
                                {renderSlider(t('char_create.labels.skintone'), data.parents.skin, 0.0, 1.0, 0.05, (v) => updateParents('skin', v))}
                                <div className="my-6 border-t border-white/5"></div>
                                {renderSlider(t('char_create.labels.father'), data.parents.father, 0, 45, 1, (v) => updateParents('father', v))}
                                {renderSlider(t('char_create.labels.mother'), data.parents.mother, 0, 45, 1, (v) => updateParents('mother', v))}
                            </div>
                        )}

                        {/* 3. FEATURES */}
                        {activeTab === 'features' && (
                            <div className="space-y-2">
                                {FEATURE_NAMES.map((name, idx) => (
                                    <div key={idx}>
                                        {renderSlider(name, data.features[idx], -1.0, 1.0, 0.05, (val) => updateFeature(idx, val))}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 4. STYLE */}
                        {activeTab === 'style' && (
                            <div className="space-y-6">
                                {renderSlider(t('char_create.labels.hairstyle'), data.hair.style, 0, 75, 1, (v) => updateHair('style', v))}
                                <div className="grid grid-cols-2 gap-6">
                                    {renderSlider(t('char_create.labels.color'), data.hair.color, 0, 63, 1, (v) => updateHair('color', v))}
                                    {renderSlider(t('char_create.labels.highlights'), data.hair.highlight, 0, 63, 1, (v) => updateHair('highlight', v))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const NavButton = ({ active, onClick, icon, label, desc }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group border",
            active 
                ? "bg-surface-200 border-primary/50 shadow-md" 
                : "border-transparent hover:bg-surface-200/50 hover:border-white/5"
        )}
    >
        <div className="flex items-center gap-4">
            <div className={cn(
                "w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300",
                active ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300"
            )}>
                {icon}
            </div>
            <div className="text-left">
                <div className={cn("text-sm font-bold tracking-wide", active ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{label}</div>
                <div className={cn("text-xs font-medium mt-0.5", active ? "text-primary/80" : "text-zinc-600 group-hover:text-zinc-500")}>{desc}</div>
            </div>
        </div>
        {active && <ChevronRight className="w-5 h-5 text-primary" />}
    </button>
);

export default CharacterCreator;