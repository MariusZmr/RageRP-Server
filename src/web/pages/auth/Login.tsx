import React, { useState } from "react";
import EventManager from "../../utils/EventManager";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ServerEvents } from "../../../shared/constants/Events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsModal from "@/components/SettingsModal";
import { 
    Settings, 
    ShieldCheck, 
    User, 
    Mail, 
    Lock, 
    ArrowRight, 
    ChevronRight 
} from "lucide-react";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const initialState = location.state as {
    error?: string;
    username?: string;
  } | null;

  const [isRegister, setIsRegister] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState(initialState?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegister) {
      EventManager.triggerServer(ServerEvents.AUTH_LOGIN, username, password);
    } else {
      EventManager.triggerServer(ServerEvents.AUTH_REGISTER, username, password, email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-primary/30">
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Background Ambience - NO BLUR ON ELEMENTS */}
      <div className="absolute inset-0 bg-gradient-to-tr from-surface-100 via-black to-surface-100 opacity-90" />
      
      {/* Settings Trigger - REMOVED FROM TAB ORDER FOR BETTER UX */}
      <div className="absolute top-6 right-6 z-50">
          <Button 
            tabIndex={-1}
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(true)}
            className="rounded-full bg-surface-200/50 hover:bg-surface-200 text-zinc-400 hover:text-white transition-all focus:ring-0"
          >
            <Settings className="w-5 h-5" />
          </Button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        {/* Main Card - Solid Background for GTA V compatibility */}
        <div className="bg-surface-100 border border-white/10 p-8 rounded-3xl shadow-2xl relative">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {isRegister ? t('auth.create_account') : t('auth.welcome')}
            </h1>
            <p className="text-secondary text-sm font-medium">
              {isRegister ? t('auth.register_subtitle') : t('auth.login_subtitle')}
            </p>
          </div>

          {initialState?.error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5" />
              {initialState.error}
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-secondary ml-1">{t('auth.username')}</label>
              <div className="relative group">
                <Input
                  autoFocus
                  className="bg-surface-200 border-transparent focus:bg-surface-300 focus:ring-2 focus:ring-primary/50 text-white rounded-xl h-12 pl-11 shadow-inner transition-all duration-300 placeholder:text-zinc-600"
                  placeholder={t('auth.username')}
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  required
                />
                <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
              </div>
            </div>

            <AnimatePresence>
              {isRegister && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-xs font-semibold text-secondary ml-1">{t('auth.email')}</label>
                  <div className="relative group">
                    <Input
                      type="email"
                      className="bg-surface-200 border-transparent focus:bg-surface-300 focus:ring-2 focus:ring-primary/50 text-white rounded-xl h-12 pl-11 shadow-inner transition-all duration-300 placeholder:text-zinc-600"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required={isRegister}
                    />
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-secondary ml-1">{t('auth.password')}</label>
              <div className="relative group">
                <Input
                  type="password"
                  className="bg-surface-200 border-transparent focus:bg-surface-300 focus:ring-2 focus:ring-primary/50 text-white rounded-xl h-12 pl-11 shadow-inner transition-all duration-300 placeholder:text-zinc-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-2 text-base"
            >
              {isRegister ? t('auth.register_btn') : t('auth.login_btn')}
              <ArrowRight className="ml-2 w-5 h-5 opacity-80" />
            </Button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-secondary hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1 group"
            >
              {isRegister ? t('auth.has_account') : t('auth.no_account')}
              <span className="text-primary group-hover:text-primary-hover flex items-center">
                {isRegister ? t('auth.login_btn') : t('auth.register_btn')}
                <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom copyright/info */}
        <p className="text-center text-zinc-600 text-[10px] mt-6 font-medium tracking-wide uppercase">
          Battlegrounds RP &copy; 2025 • {t('auth.secure_connection')}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;