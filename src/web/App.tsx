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

import { NotificationProvider } from "./components/ui/NotificationSystem";

const Home = () => (
  <div className="p-10 text-white font-bold text-2xl bg-red-500/20 absolute top-0 left-0">
    🏠 REACT UI LOADED (Waiting for routing...)
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
      <DevTools />
      <NotificationProvider>
        <HashRouter>
          <NavigationHandler />
          <div className="w-full h-full relative">
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
