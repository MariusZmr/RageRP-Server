import { UIManager } from "./controllers/UIManager";
import { CameraManager } from "./controllers/CameraManager";
import { CharacterController } from "./controllers/CharacterController";
import { NotificationManager } from "./controllers/NotificationManager";
import { DevController } from "./controllers/DevController";
import { DebugController } from "./controllers/DebugController";
import "./controllers/AdminController";
import "./noclip";
mp.console.logInfo("Client-side loaded successfully!");

// Init Controllers
CharacterController.getInstance();
DebugController.getInstance();
DevController.getInstance();

mp.events.add("ui:log", (type: string, msg: string) => {
  mp.console.logInfo(`[UI-${type.toUpperCase()}] ${msg}`);
});

mp.events.add("playerReady", () => {
  mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);
  // Login necesită cursor activ (default true)
  UIManager.getInstance().showPage("/login");
});

// State tracking
let isCreatorOpen = false;

// Funcție centralizată pentru inițializarea sesiunii de creare caracter
const startCreatorSession = () => {
  if (isCreatorOpen) return;
  isCreatorOpen = true; 

  // 1. Ascunde Chat și Radar. Activează Cursor.
  mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);
  mp.gui.cursor.show(true, true);

  // 2. Referențiază mp.players.local
  const localPlayer = mp.players.local;

  // 3. Teleportează jucătorul la interior
  // Coordonate: Police Station Locker Room (Interior ID)
  localPlayer.position = new mp.Vector3(402.8664, -996.4108, -99.00404);

  // 4. Setează rotația (Heading) - cu fața la cameră (aprox)
  localPlayer.setHeading(180.0);

  // 5. Blochează poziția și setează Alpha
  localPlayer.freezePosition(true);
  localPlayer.setAlpha(255);
  localPlayer.setVisible(true, false);

  // 6. Setează modelul (Obligatoriu pentru personalizare)
  localPlayer.model = mp.game.joaat("mp_m_freemode_01");

  // 7. Timeout critic pentru procesare teleportare
  setTimeout(() => {
    // 8. Setup Camera & UI
    CameraManager.getInstance().createStartCamera();
    mp.console.logInfo("[Client] Starting Character Creator Session.");
    UIManager.getInstance().showPage(
      "/char-creator",
      {},
      { enableCursor: true }
    );
  }, 150);
};

// Eveniment triggeruit de Server
mp.events.add("client:openCreator", startCreatorSession);

// Eveniment triggeruit de UI (Character Selector)
mp.events.add("client:requestCreator", startCreatorSession);

// Proxy UI -> Server
mp.events.add("auth:login", (username: string, password: string) => {
  mp.events.callRemote("auth:login", username, password);
});

mp.events.add("character:select", (charId: number) => {
  mp.events.callRemote("character:select", charId);
});

mp.events.add(
  "auth:register",
  (username: string, password: string, email: string) => {
    mp.events.callRemote("auth:register", username, password, email);
  }
);

// Proxy HUD Request UI -> Server
mp.events.add("hud:request", () => {
  mp.events.callRemote("hud:request");
});

// Proxy HUD Update Server -> UI
mp.events.add("hud:update", (dataRaw: any) => {
  const data = typeof dataRaw === "string" ? JSON.parse(dataRaw) : dataRaw;
  // Injectăm direct în EventManager-ul din browser
  const browser = UIManager.getInstance().getBrowser();
  if (browser && mp.browsers.exists(browser)) {
    browser.execute(
      `window.EventManager.receiveFromServer('hud:update', ${JSON.stringify(data)})`
    );
  }
});

// Helper pentru intrarea în joc (după Login sau Char Creator)
const enterGame = () => {
  isCreatorOpen = false; // Reset Flag
  UIManager.getInstance().showPage("/game", {}, { enableCursor: false });
  mp.gui.chat.show(true);
  mp.game.ui.displayRadar(true);
  mp.players.local.freezePosition(false);
  mp.players.local.setVisible(true, false);

  // Cleanup Camera
  CameraManager.getInstance().destroy();
};

mp.events.add("client:enterGame", () => {
  enterGame();
});

mp.events.add("auth:response", (responseRaw: any) => {
  let response =
    typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
  if (Array.isArray(response)) response = response[0];

  if (response.success) {
    // Navigăm către Selectorul de Caractere în loc să intrăm direct în joc
    UIManager.getInstance().showPage(
      "/char-selector",
      { characters: response.characters },
      { enableCursor: true }
    );

    NotificationManager.show(
      "success",
      "Autentificare",
      "Bine ai venit! Selectează identitatea."
    );
  } else {
    UIManager.getInstance().showPage("/login", { error: response.error });
    NotificationManager.show(
      "error",
      "Eroare Login",
      response.error || "Date incorecte."
    );
  }
});

// Response de la Character Creator
mp.events.add("character:create:response", (responseRaw: any) => {
  let response =
    typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
  if (Array.isArray(response)) response = response[0];

  if (response && response.success) {
    enterGame();
    NotificationManager.show(
      "success",
      "Caracter Creat",
      "Identitate nouă stabilită cu succes."
    );
  } else {
    NotificationManager.show(
      "error",
      "Eroare Creare",
      response.error || "A apărut o problemă."
    );
  }
});

// ESC Key Handler
mp.keys.bind(0x1b, false, () => {
  if (isCreatorOpen) {
    // Ieșire din Creator -> Înapoi la Login
    isCreatorOpen = false;
    CameraManager.getInstance().destroy();

    // Resetăm jucătorul (opțional, să nu rămână freemode dacă vrem)
    // Dar login-ul nu setează modelul, deci e ok.

    UIManager.getInstance().showPage("/login");
    NotificationManager.show(
      "info",
      "Anulare",
      "Te-ai întors la ecranul de autentificare."
    );
  }
});
