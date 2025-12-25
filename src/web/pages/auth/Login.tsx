import React, { useState } from 'react';
import EventManager from '../../utils/EventManager';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock, Mail, ArrowRight, Server } from 'lucide-react';

const Login: React.FC = () => {
    const location = useLocation();
    const initialState = location.state as { error?: string; username?: string } | null;

    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState(initialState?.username || '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister) {
            EventManager.triggerServer('auth:register', username, password, email);
        } else {
            EventManager.triggerServer('auth:login', username, password);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Background Texture with Animation */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/gta-5-background-1920-x-1080-877z5810k12815p0.jpg')] bg-cover bg-center"
            />

            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-sm"
            >
                
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="bg-blue-600/20 p-4 rounded-full border border-blue-500/30 backdrop-blur-md">
                            <Server className="w-10 h-10 text-blue-400" />
                        </div>
                    </motion.div>

                    <h1 className="text-5xl font-black italic tracking-tighter drop-shadow-2xl">
                        SERVEROS<span className="text-blue-500">RP</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Roleplay Experience
                    </p>
                </div>

                {/* Card Shadcn Style */}
                <div className="bg-black/80 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl">
                    
                    {initialState?.error && (
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="mb-6 p-3 bg-red-900/40 border-l-4 border-red-500 text-red-200 text-xs font-bold rounded-r flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                            {initialState.error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input 
                                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-600 focus-visible:ring-blue-500"
                                    placeholder="Nume_Prenume"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {isRegister && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                overflow="hidden"
                                className="space-y-1"
                            >
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input 
                                        type="email"
                                        className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-600 focus-visible:ring-blue-500"
                                        placeholder="mail@server.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required={isRegister}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Parola</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input 
                                    type="password"
                                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-600 focus-visible:ring-blue-500"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="mt-4 w-full text-sm font-bold tracking-wider uppercase h-12">
                            {isRegister ? 'Creează Cont' : 'Intră pe Server'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </div>

                {/* Footer Switcher */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-muted-foreground hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 w-full"
                    >
                        {isRegister ? (
                            <>Ai deja cont? <span className="text-blue-400 underline">Loghează-te</span></>
                        ) : (
                            <>Nu ai cont? <span className="text-blue-400 underline">Înregistrează-te</span></>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;