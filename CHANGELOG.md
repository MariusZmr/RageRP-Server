# 📜 Development Journal & Changelog - Battlegrounds RP

Această fișier ține evidența tuturor modificărilor majore, a deciziilor tehnice și a checkpoint-urilor atinse în dezvoltarea proiectului.

---

## 📅 Joi, 25 Decembrie 2025

### ✅ Checkpoint 9: Critical Fix - Client Events Restoration
**Focus:** Stability
- **Critical Fix:** Restaurat handler-ele `auth:login`, `auth:register`, `hud:request` și `hud:update` în `src/client/index.ts` care au fost șterse accidental la implementarea tastei ESC.
- **Result:** Login-ul și HUD-ul sunt din nou funcționale.

### ✅ Checkpoint 8: Bugfix - Character Creation Logic
**Focus:** Server-side Stability
- **Critical Fix:** Rezolvat eroare "Creation Failed".
    - Cauza: `CharacterManager` încerca să acceseze `player.data.user` (care nu există), în loc să folosească `PlayerUtils.getDb(player)`.
    - Soluție: Actualizat managerul să folosească utilitarul corect pentru extragerea sesiunii utilizatorului.
- **Logging:** Adăugat loguri detaliate pentru validarea numelui și starea sesiunii pentru debug mai ușor.

### ✅ Checkpoint 7: Polish & Bugfixing (Preview & Notifications)
**Focus:** UX & Stability
- **Feature:** Implementat **Sistem de Notificări** modern (Toast) cu `framer-motion` și poziționare configurabilă (ex: `top-right`, `bottom-center`).
- **Feature:** Creat `NotificationManager` (Client) pentru a trimite alerte din scripturile de joc către UI.
- **Fix:** Rezolvat bug-ul unde preview-ul caracterului nu funcționa (Setat model `freemode` și comunicare locală Client-UI).
- **Fix (UI):** Eliminat `backdrop-blur` din toate meniurile (Login, CharCreator) pentru a preveni artefactele negre. Folosit fundal opac `bg-zinc-950`.
- **UX:** Adăugat validare vizuală în Character Creator (notificări eroare la nume scurt).
- **UX:** Implementat tasta `ESC` în Character Creator pentru a reveni la Login.
- **Update:** Înlocuit mesajele de chat primitive cu notificări vizuale la Login și Character Creation.

### ✅ Checkpoint 6: Character Creator - Backend & Spawn Logic
**Focus:** Database & Server Logic
- **Database:** Actualizat entitatea `Character` pentru a stoca `appearance` (JSON) și `clothes` (JSON).
- **Server:** Implementat `CharacterManager.create` pentru salvarea datelor și validare server-side.
- **Server:** Implementat `CharacterManager.load` pentru spawn-ul efectiv (aplicare model, față, haine default, teleportare).
- **Client:** Adăugat handler `character:create:response` care execută tranziția finală în gameplay (distruge camera, activează HUD).
- **Refactor:** Unificat logica de "Enter Game" în `client/index.ts` pentru a fi folosită și la Login și la Character Creation.

### ✅ Checkpoint 5: Character Creator - Camera & Sync
**Focus:** UX Polish & Client-side Logic
- **Feature (Client):** Implementat `CameraManager` pentru mișcări cinematice ale camerei (interpolare, zoom pe față/corp/picioare).
- **Feature (Client):** Creat `CharacterController` pentru sincronizarea în timp real UI -> Player (preview haine, trăsături faciale).
- **Update (UI):** `CharacterCreator.tsx` trimite acum evenimente de focusare a camerei la schimbarea tab-urilor.
- **Refactor:** Integrat noile controllere în `client/index.ts` cu management corect al ciclului de viață (create/destroy).
- **Fix:** Rezolvat erori TypeScript (`Vector3Mp`, `BrowserMp`) și importuri lipsă.

### ✅ Checkpoint 4: Modernizare Build System
**Focus:** Infrastructură & Performanță
- **Migration:** Trecere completă la `pnpm` pentru package management.
- **Migration:** Înlocuit `esbuild/tsc` cu `SWC` pentru compilarea serverului (build ultra-rapid).
- **Fix:** Rezolvat erori de module lipsă și corectat căile de watch în `package.json`.