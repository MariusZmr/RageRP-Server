import { SystemsManager } from "./SystemsManager";
import { UIManager } from "./controllers/UIManager";
import "./controllers/AdminController";
import "./noclip";

// Log Init
mp.console.logInfo(">>> Client-side Bootstrap <<<");

// Initialize Systems
const systems = SystemsManager.getInstance();
systems.init();

// Handle initial player ready
mp.events.add("playerReady", () => {
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    
    // Initial Route
    UIManager.getInstance().showPage("/login");
});