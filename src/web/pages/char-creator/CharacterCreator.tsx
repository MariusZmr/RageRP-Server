import React, { useState, useEffect } from 'react';
import EventManager from '../../utils/EventManager';
import { 
    Dna, 
    User, 
    Palette, 
    Scissors, 
    CheckCircle, 
    RotateCcw, 
    ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

// Mapare Trăsături Faciale GTA V (0-19)
const FEATURE_NAMES = [
    "Nose Width", "Nose Peak Height", "Nose Length", "Nose Bone Height", "Nose Peak Lowering", "Nose Bone Twist",
    "Eyebrow Height", "Eyebrow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth",
    "Eye Squint", "Lip Thickness", "Jaw Width", "Jaw Height", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"
];

const CharacterCreator: React.FC = () => {
    // --- State ---
    const [activeTab, setActiveTab] = useState<'genealogy' | 'features' | 'style' | 'identity'>('identity');
    
    const [data, setData] = useState<CharacterData>({
        parents: { father: 0, mother: 21, similarity: 0.5, skin: 0.5 },
        features: Array(20).fill(0),
        hair: { style: 0, color: 0, highlight: 0 },
        info: { firstName: "", lastName: "", age: 18, gender: 0 }
    });

    // --- Handlers ---

    // 1. Update Parents
    const updateParents = (key: keyof typeof data.parents, value: number) => {
        const newParents = { ...data.parents, [key]: value };
        setData(prev => ({ ...prev, parents: newParents }));
        // Trimitem la CLIENT (local) pentru preview instant
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'parents', data: newParents }));
    };

    // 2. Update Features
    const updateFeature = (index: number, value: number) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData(prev => ({ ...prev, features: newFeatures }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'features', data: newFeatures }));
    };

    // 3. Update Hair
    const updateHair = (key: keyof typeof data.hair, value: number) => {
        const newHair = { ...data.hair, [key]: value };
        setData(prev => ({ ...prev, hair: newHair }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'hair', data: newHair }));
    };

    // 4. Update Info & Gender
    const updateInfo = (key: keyof typeof data.info, value: string | number) => {
        const newInfo = { ...data.info, [key]: value };
        setData(prev => ({ ...prev, info: newInfo }));
        
        // Dacă schimbăm genul, trebuie să resetăm hainele/părul pe server
        if (key === 'gender') {
            if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'gender', data: value }));
        }
    };

    // 5. Save Character
    const handleSave = () => {
        if (data.info.firstName.length < 3) {
            if (window.triggerNotification) window.triggerNotification('error', 'Validare', 'Prenumele trebuie să aibă minim 3 litere.');
            return;
        }
        if (data.info.lastName.length < 3) {
            if (window.triggerNotification) window.triggerNotification('error', 'Validare', 'Numele trebuie să aibă minim 3 litere.');
            return;
        }
        
        // Notificăm utilizatorul că se procesează
        if (window.triggerNotification) window.triggerNotification('info', 'Procesare', 'Se creează identitatea...', 2000);
        
        EventManager.triggerServer('character:create', JSON.stringify(data));
    };

    // Fix Focus pentru RageMP
    useEffect(() => {
        const container = document.getElementById('char-creator-container');
        if (container) container.focus();
    }, []);

    // Camera Control Logic
    useEffect(() => {
        let cameraTarget = 'default';
        switch (activeTab) {
            case 'genealogy':
            case 'features':
            case 'style':
                cameraTarget = 'head';
                break;
            case 'identity':
            default:
                cameraTarget = 'default';
                break;
        }
        if (window.mp) window.mp.trigger('char:cameraFocus', cameraTarget);
    }, [activeTab]);

    // --- Render Helpers ---

    const renderSlider = (label: string, value: number, min: number, max: number, step: number, onChange: (val: number) => void) => (
        <div className="mb-4 group">
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1 group-hover:text-orange-500 transition-colors">
                <span>{label}</span>
                <span className="font-mono text-zinc-300">{value.toFixed(step === 1 ? 0 : 2)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600 hover:accent-orange-500"
            />
        </div>
    );

    return (
        <div 
            id="char-creator-container"
            tabIndex={0}
            className="absolute inset-0 z-50 flex h-screen w-screen overflow-hidden text-white selection:bg-orange-500/30 outline-none"
        >
            
            {/* --- LEFT SIDEBAR (Menu) --- */}
            <div className="w-[300px] h-full bg-zinc-950 border-r border-white/5 flex flex-col">
                
                {/* Header */}
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-2xl font-black italic tracking-tighter text-zinc-100">
                        IDENTITY<span className="text-orange-600">LAB</span>
                    </h1>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                        Character Creation Suite
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    <NavButton 
                        active={activeTab === 'identity'} 
                        onClick={() => setActiveTab('identity')}
                        icon={<User className="w-4 h-4" />}
                        label="Identitate & Gen"
                    />
                    <NavButton 
                        active={activeTab === 'genealogy'} 
                        onClick={() => setActiveTab('genealogy')}
                        icon={<Dna className="w-4 h-4" />}
                        label="Genealogie"
                    />
                    <NavButton 
                        active={activeTab === 'features'} 
                        onClick={() => setActiveTab('features')}
                        icon={<Palette className="w-4 h-4" />}
                        label="Trăsături Faciale"
                    />
                    <NavButton 
                        active={activeTab === 'style'} 
                        onClick={() => setActiveTab('style')}
                        icon={<Scissors className="w-4 h-4" />}
                        label="Păr & Stil"
                    />
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-white/5 bg-zinc-900/50">
                    <Button 
                        onClick={handleSave}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest uppercase h-12 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Finalizare
                    </Button>
                </div>
            </div>

            {/* --- CENTER (Transparent 3D View) --- */}
            <div className="flex-1 relative pointer-events-none">
                {/* Overlay guides */}
                <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-orange-500/50"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-orange-500/50"></div>
            </div>

            {/* --- RIGHT PANEL (Controls) --- */}
            <div className="absolute right-10 top-10 w-[350px] bg-zinc-950 border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[calc(100vh-80px)]">
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 to-red-600"></div>
                
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-200">
                        {activeTab === 'genealogy' && "Genetic Heritage"}
                        {activeTab === 'features' && "Facial Structure"}
                        {activeTab === 'style' && "Grooming"}
                        {activeTab === 'identity' && "Civilian Data"}
                    </h2>
                    <RotateCcw className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-white transition-colors" />
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    
                    {/* 1. IDENTITY TAB */}
                    {activeTab === 'identity' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button 
                                    onClick={() => updateInfo('gender', 0)}
                                    className={cn(
                                        "h-24 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                        data.info.gender === 0 
                                            ? "border-orange-500 bg-orange-500/10 text-white" 
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600"
                                    )}
                                >
                                    <User className="w-8 h-8" />
                                    <span className="text-xs font-bold uppercase">Masculin</span>
                                </button>
                                <button 
                                    onClick={() => updateInfo('gender', 1)}
                                    className={cn(
                                        "h-24 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                        data.info.gender === 1 
                                            ? "border-orange-500 bg-orange-500/10 text-white" 
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600"
                                    )}
                                >
                                    <User className="w-8 h-8" />
                                    <span className="text-xs font-bold uppercase">Feminin</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Prenume</label>
                                    <Input 
                                        className="bg-zinc-900 border-zinc-700 focus-visible:ring-orange-500"
                                        placeholder="Ex: Ion"
                                        value={data.info.firstName}
                                        onChange={(e) => updateInfo('firstName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Nume de Familie</label>
                                    <Input 
                                        className="bg-zinc-900 border-zinc-700 focus-visible:ring-orange-500"
                                        placeholder="Ex: Popescu"
                                        value={data.info.lastName}
                                        onChange={(e) => updateInfo('lastName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Vârstă ({data.info.age} ani)</label>
                                    <input 
                                        type="range" min={18} max={90} step={1}
                                        value={data.info.age}
                                        onChange={(e) => updateInfo('age', parseInt(e.target.value))}
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. GENEALOGY TAB */}
                    {activeTab === 'genealogy' && (
                        <>
                            {renderSlider("ADN Tată", data.parents.father, 0, 45, 1, (v) => updateParents('father', v))}
                            {renderSlider("ADN Mamă", data.parents.mother, 0, 45, 1, (v) => updateParents('mother', v))}
                            <div className="h-[1px] bg-white/5 my-4"></div>
                            {renderSlider("Asemănare Genetică", data.parents.similarity, 0.0, 1.0, 0.05, (v) => updateParents('similarity', v))}
                            {renderSlider("Nuanta Pielii", data.parents.skin, 0.0, 1.0, 0.05, (v) => updateParents('skin', v))}
                        </>
                    )}

                    {/* 3. FEATURES TAB */}
                    {activeTab === 'features' && (
                        <div className="space-y-1">
                            {FEATURE_NAMES.map((name, idx) => (
                                <div key={idx}>
                                    {renderSlider(name, data.features[idx], -1.0, 1.0, 0.05, (val) => updateFeature(idx, val))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 4. STYLE TAB */}
                    {activeTab === 'style' && (
                        <>
                            {renderSlider("Stil Păr", data.hair.style, 0, 75, 1, (v) => updateHair('style', v))}
                            {renderSlider("Culoare Principală", data.hair.color, 0, 63, 1, (v) => updateHair('color', v))}
                            {renderSlider("Suvițe / Highlight", data.hair.highlight, 0, 63, 1, (v) => updateHair('highlight', v))}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

// Internal Component for Sidebar Buttons
const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-l-2",
            active 
                ? "bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500 text-white" 
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
        )}
    >
        <div className="flex items-center gap-3">
            <span className={active ? "text-orange-500" : "text-zinc-600"}>{icon}</span>
            {label}
        </div>
        {active && <ChevronRight className="w-4 h-4 text-orange-500" />}
    </button>
);

export default CharacterCreator;
