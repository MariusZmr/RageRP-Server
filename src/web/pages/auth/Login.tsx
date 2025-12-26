import React, { useState } from "react";
import EventManager from "../../utils/EventManager";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Mail,
  ArrowRight,
  Crosshair,
  ShieldAlert,
} from "lucide-react";

const Login: React.FC = () => {
  const location = useLocation();
  const initialState = location.state as {
    error?: string;
    username?: string;
  } | null;

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState(initialState?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      EventManager.triggerServer("auth:register", username, password, email);
    } else {
      EventManager.triggerServer("auth:login", username, password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      {/* Background Texture - Darkened War Theme */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/gta-5-background-1920-x-1080-877z5810k12815p0.jpg')] bg-cover bg-center grayscale contrast-125"
      />
      {/* Overlay Gradient Metalic */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-950/90" />

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
            {/* Tactical Icon Wrapper */}
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Rotating Outer Ring (Radar/Scope effect) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-zinc-600 rounded-full opacity-50"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-dotted border-orange-500/30 rounded-full"
              />

              {/* Center Glow */}
              <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-xl"></div>

              {/* Main Icon */}
              <div className="bg-zinc-900 p-3 rounded-xl border border-orange-500/20 shadow-[0_0_15px_rgba(234,88,12,0.2)] relative z-10">
                <Crosshair className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl font-black italic tracking-tighter drop-shadow-2xl text-zinc-100">
            BATTLEGROUNDS
            <span
              className="text-orange-500 inline-block ml-1"
              style={{ textShadow: "0 0 20px rgba(249, 115, 22, 0.6)" }}
            >
              ROLEPLAY
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-[1px] w-8 bg-orange-500/50"></div>
            <p className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase">
              Build your dreams
            </p>
            <div className="h-[1px] w-8 bg-orange-500/50"></div>
          </div>
        </div>

        {/* Card Metalic */}
        <div className="bg-zinc-900/95 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Top Orange Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600"></div>

          {initialState?.error && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-6 p-3 bg-red-950/50 border-l-4 border-red-600 text-red-200 text-xs font-bold rounded-r flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-red-500" />
              {initialState.error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1 tracking-wider">
                Identitate
              </label>
              <div className="relative group/input">
                <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-orange-500 transition-colors" />
                <Input
                  className="pl-10 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all h-11"
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
                className="space-y-1 overflow-hidden"
              >
                <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1 tracking-wider">
                  Contact
                </label>
                <div className="relative group/input">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-orange-500 transition-colors" />
                  <Input
                    type="email"
                    className="pl-10 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all h-11"
                    placeholder="mail@battlegrounds.rp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={isRegister}
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-500 ml-1 tracking-wider">
                Securitate
              </label>
              <div className="relative group/input">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500 group-focus-within/input:text-orange-500 transition-colors" />
                <Input
                  type="password"
                  className="pl-10 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all h-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full text-sm font-bold tracking-widest uppercase h-12 bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-600 hover:to-red-600 border border-orange-500/30 shadow-[0_4px_20px_rgba(234,88,12,0.3)] transition-all active:scale-[0.98]"
            >
              {isRegister ? "Înregistrează-te" : "Intră în joc"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Footer Switcher */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-zinc-500 hover:text-orange-400 text-xs font-semibold transition-colors flex items-center justify-center gap-1 w-full group"
          >
            {isRegister ? (
              <>
                Ai deja cont?{" "}
                <span className="text-zinc-300 underline group-hover:text-orange-300">
                  Loghează-te
                </span>
              </>
            ) : (
              <>
                Nu ai cont?{" "}
                <span className="text-zinc-300 underline group-hover:text-orange-300">
                  Înregistrează-te
                </span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
