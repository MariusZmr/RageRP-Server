import { UIManager } from "./controllers/UIManager";
import { CameraManager } from "./controllers/CameraManager";
import { CharacterController } from "./controllers/CharacterController";
import { NotificationManager } from "./controllers/NotificationManager";
import "./noclip";
mp.console.logInfo("Client-side loaded successfully!");

// Init Controllers
CharacterController.getInstance();

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

mp.events.add("client:openCreator", () => {
  isCreatorOpen = true; // Set Flag
  mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);
  mp.gui.cursor.show(true, true); // Forțăm explicit

  // Opțional: Putem îngheța jucătorul să nu se miște
  mp.players.local.freezePosition(true);

  // Setăm modelul DEFAULT Freemode (Obligatoriu pentru personalizare)
  // Dacă nu facem asta, funcțiile de setHeadBlendData nu vor merge pe skin-uri normale
  mp.players.local.model = mp.game.joaat("mp_m_freemode_01");

  mp.players.local.setVisible(true, false);
  mp.players.local.setAlpha(255);

  // Setup Camera
  CameraManager.getInstance().createStartCamera();

  UIManager.getInstance().showPage("/char-creator", {}, { enableCursor: true });
});

// Proxy UI -> Server
mp.events.add("auth:login", (username: string, password: string) => {
  mp.events.callRemote("auth:login", username, password);
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

mp.events.add("auth:response", (responseRaw: any) => {
  let response =
    typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
  if (Array.isArray(response)) response = response[0];

  if (response.success) {
    enterGame();
    NotificationManager.show(
      "success",
      "Autentificare",
      "Bine ai venit pe server!"
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
