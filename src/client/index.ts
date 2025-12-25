import { UIManager } from "./controllers/UIManager";
import "./noclip";

mp.console.logInfo("Client-side loaded successfully!");

mp.events.add("ui:log", (type: string, msg: string) => {
    mp.console.logInfo(`[UI-${type.toUpperCase()}] ${msg}`);
});

mp.events.add("playerReady", () => {
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    // Login necesită cursor activ (default true)
    UIManager.getInstance().showPage('/login');
});

// Proxy UI -> Server
mp.events.add("auth:login", (username, password) => {
    mp.events.callRemote("auth:login", username, password);
});

mp.events.add("auth:register", (username, password, email) => {
    mp.events.callRemote("auth:register", username, password, email);
});

// Proxy HUD Request UI -> Server
mp.events.add("hud:request", () => {
    mp.events.callRemote("hud:request");
});

// Proxy HUD Update Server -> UI
mp.events.add("hud:update", (dataRaw: any) => {
    const data = typeof dataRaw === 'string' ? JSON.parse(dataRaw) : dataRaw;
    // Injectăm direct în EventManager-ul din browser
    const browser = UIManager.getInstance().getBrowser();
    if (browser && mp.browsers.exists(browser)) {
        browser.execute(`window.EventManager.receiveFromServer('hud:update', ${JSON.stringify(data)})`);
    }
});

mp.events.add("auth:response", (responseRaw: any) => {
    let response = typeof responseRaw === 'string' ? JSON.parse(responseRaw) : responseRaw;
    if (Array.isArray(response)) response = response[0];

    if (response.success) {
        // Login Success: Navigăm la /game (HUD)
        // Setăm enableCursor: false pentru a putea juca
        UIManager.getInstance().showPage('/game', {}, { enableCursor: false });
        
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        
        mp.gui.chat.push("!{00FF00}Succes: !{FFFFFF}Te-ai autentificat cu succes.");
    } else {
        UIManager.getInstance().showPage('/login', { error: response.error });
    }
});
