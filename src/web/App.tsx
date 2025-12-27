import React, { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import EventManager from "./utils/EventManager";
import Login from "./pages/auth/Login";
import GameInterface from "./pages/GameInterface";
import CharacterCreator from "./pages/char-creator/CharacterCreator";
import CharacterSelector from "./pages/char-selector/CharacterSelector";
import DevTools from "./components/DevTools";
import { Loader2 } from "lucide-react";

import { NotificationProvider } from "./components/ui/NotificationSystem";

const Home = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] text-zinc-600 space-y-4">
    <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500 relative z-10" />
    </div>
    <div className="text-center">
        <h1 className="text-sm font-bold tracking-[0.3em] uppercase">System Standby</h1>
        <p className="text-[10px] font-mono mt-2 opacity-50">Waiting for server routing signal...</p>
    </div>
  </div>
);

const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = (payload: { route: string; data?: any }) => {
      console.log("[App] Navigating to:", payload.route, payload.data);
      if (payload.route && location.pathname !== payload.route) {
        navigate(payload.route, { state: payload.data });
      }
    };

    EventManager.on("navigateTo", handleNavigation);
    return () => {
      EventManager.off("navigateTo", handleNavigation);
    };
  }, [navigate, location]);

  return null;
};

function App() {
  return (
    <React.Fragment>
      <NotificationProvider>
        <DevTools /> {/* DevTools is now overlayed globally */}
        <HashRouter>
          <NavigationHandler />
          <div className="w-full h-full relative bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/char-selector" element={<CharacterSelector />} />
              <Route path="/game" element={<GameInterface />} />
              <Route path="/char-creator" element={<CharacterCreator />} />
            </Routes>
          </div>
        </HashRouter>
      </NotificationProvider>
    </React.Fragment>
  );
}

export default App;