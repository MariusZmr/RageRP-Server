This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
API.md
CHANGELOG.md
esbuild.config.js
gemini.md
package.json
postcss.config.js
src/client/@types/index.d.ts
src/client/controllers/AdminController.ts
src/client/controllers/CameraManager.ts
src/client/controllers/CharacterController.ts
src/client/controllers/DebugController.ts
src/client/controllers/DevController.ts
src/client/controllers/NotificationManager.ts
src/client/controllers/UIManager.ts
src/client/controllers/WeatherController.ts
src/client/globals.d.ts
src/client/index.ts
src/client/noclip.ts
src/client/tsconfig.json
src/server/@types/index.d.ts
src/server/commands/admin/AdminChat.ts
src/server/commands/admin/AdminDuty.ts
src/server/commands/admin/Announce.ts
src/server/commands/admin/DeleteVeh.ts
src/server/commands/admin/Fix.ts
src/server/commands/admin/Heal.ts
src/server/commands/admin/Money.ts
src/server/commands/admin/NoClip.ts
src/server/commands/admin/SetAdmin.ts
src/server/commands/admin/SetWeather.ts
src/server/commands/admin/StopServer.ts
src/server/commands/admin/Tp.ts
src/server/commands/admin/UserManagement.ts
src/server/commands/admin/Veh.ts
src/server/commands/admin/Weapon.ts
src/server/commands/chat/RoleplayCommands.ts
src/server/commands/CommandManager.ts
src/server/commands/CommandRegistry.ts
src/server/commands/dev/Coords.ts
src/server/commands/general/Creator.ts
src/server/commands/general/Help.ts
src/server/commands/general/Stats.ts
src/server/config/AdminLevels.ts
src/server/database/entities/Character.ts
src/server/database/entities/User.ts
src/server/events/AuthHandlers.ts
src/server/events/CharacterHandlers.ts
src/server/events/PlayerEvents.ts
src/server/globals.d.ts
src/server/index.ts
src/server/managers/CharacterManager.ts
src/server/managers/TimeManager.ts
src/server/services/AuthService.ts
src/server/services/UserService.ts
src/server/tsconfig.json
src/server/utils/HUDUtils.ts
src/server/utils/Logger.ts
src/server/utils/PlayerUtils.ts
src/web/@types/intex.d.ts
src/web/App.tsx
src/web/components/DevTools.tsx
src/web/components/HUD.tsx
src/web/components/ui/button.tsx
src/web/components/ui/input.tsx
src/web/components/ui/NotificationSystem.tsx
src/web/index.css
src/web/index.html
src/web/index.tsx
src/web/lib/utils.ts
src/web/pages/auth/Login.tsx
src/web/pages/char-creator/CharacterCreator.tsx
src/web/pages/char-selector/CharacterSelector.tsx
src/web/pages/GameInterface.tsx
src/web/tsconfig.json
src/web/utils/ClipboardManager.ts
src/web/utils/EventManager.ts
SYSTEM_DOCUMENTATION.md
tailwind.config.js
Trainer.md
tsconfig.json
vite.config.ts
```

# Files

## File: .gitignore
````
# Dependency directories
node_modules/

# Build outputs & Game Resources
packages/
client_packages/
bin/
dotnet/
plugins/
maps/

# RAGE MP Core Binaries
ragemp-server.exe
BugTrap-x64.dll

# Configuration & Logs
.env
.listcache
server.log
logs/
conf.json

# IDEs
.vscode/
.idea/
*.swp
````

## File: API.md
````markdown
# Documentație API - ServerServeros

Acest API rulează pe portul `3005` și oferă acces la gestionarea utilizatorilor și monitorizarea serverului RAGE:MP.

**Base URL:** `http://localhost:3005`

---

## 1. Monitorizare Server

### GET `/status`
Returnează starea generală a serverului.
- **Răspuns:**
  ```json
  {
    "online": 5,
    "uptime": 1234.56
  }
  ```

### GET `/api/users/online`
Returnează lista jucătorilor care sunt conectați în acest moment.
- **Răspuns:**
  ```json
  [
    {
      "id": 0,
      "name": "Jucator1",
      "dbId": 15,
      "adminLevel": 1,
      "ping": 45
    }
  ]
  ```

---

## 2. Gestionare Utilizatori (Baza de date)

### GET `/api/users`
Returnează toți utilizatorii înregistrați. Suportă filtrare după nume.
- **Query Params:** `username` (opțional) - caută un utilizator specific.
- **Exemplu:** `/api/users?username=Nucl3`

### GET `/api/users/:id`
Returnează datele complete ale unui utilizator din baza de date folosind ID-ul unic (DB ID).

### GET `/api/users/player/:id`
Returnează datele din baza de date pentru un jucător **online**, folosind ID-ul lui de pe server (0, 1, 2...).

### GET `/api/users/top`
Returnează topul jucătorilor în funcție de nivel și experiență.
- **Query Params:** `limit` (implicit 10).

### PATCH `/api/users/:id`
Actualizează datele unui utilizator.
- **Body (JSON):** Orice câmp din modelul `User` (ex: `money`, `level`, `adminLevel`).
- **Exemplu:**
  ```json
  {
    "money": 50000,
    "adminLevel": 5
  }
  ```

### DELETE `/api/users/:id`
Șterge definitiv un cont din baza de date.

---

## 3. Note Tehnice
- **Modelul de date:** Toate interogările folosesc entitatea `User` definită în TypeORM.
- **Sincronizare:** API-ul interacționează direct cu baza de date MariaDB și, în cazul endpoint-urilor `online`, direct cu instanța de server RAGE:MP.
````

## File: CHANGELOG.md
````markdown
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
````

## File: esbuild.config.js
````javascript
const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function buildServer() {
    const distPath = path.join(__dirname, 'packages/server/dist');
    if (fs.existsSync(distPath)) fs.rmSync(distPath, { recursive: true, force: true });

    console.log(`🚀 [BUILD-SERVER] Compilare cu SWC...`);
    
    try {
        // Rulăm din src/server pentru a evita structura src/server în dist
        const swcConfig = path.join(__dirname, 'packages/server/.swcrc');
        const outDir = path.join(__dirname, 'packages/server/dist');
        const srcDir = path.join(__dirname, 'src/server');
        
        execSync(`npx swc . -d ${outDir} --config-file ${swcConfig}`, { 
            cwd: srcDir,
            stdio: 'inherit' 
        });
    } catch (err) {
        throw new Error('SWC compilation failed');
    }
}

async function buildClient() {
    const clientEntry = path.join(__dirname, 'src/client/index.ts');
    if (!fs.existsSync(clientEntry)) {
        // Creăm un fișier de index gol dacă nu există
        fs.writeFileSync(clientEntry, "mp.gui.chat.push('Client-side loaded!');\n");
    }

    console.log(`🚀 [BUILD-CLIENT] Bundling client-side...`);

    await esbuild.build({
        entryPoints: [clientEntry],
        bundle: true, // IMPORTANT: Unim totul pentru client
        outfile: 'client_packages/index.js',
        platform: 'browser', // Clientul RAGE e un engine JS custom similar browserului
        format: 'iife', // Format executabil imediat
        target: 'esnext',
        sourcemap: false, // Nu vrem sourcemaps pe client în producție (opțional)
        minify: true, // Micșorăm fișierul pentru download mai rapid
    });
}

async function run() {
    try {
        await buildServer();
        await buildClient();
        console.log('✅ [BUILD] Toate sistemele au fost compilate cu succes!');
    } catch (err) {
        console.error('❌ [BUILD] Eroare critică:', err);
        process.exit(1);
    }
}

run();
````

## File: gemini.md
````markdown
# 🤖 SYSTEM PROMPT & ARCHITECTURE - BATTLEGROUNDS RP

## 1. IDENTITATE ȘI ROL

Ești **Lead Full-Stack Game Developer** pentru proiectul **Battlegrounds RP** (RageMP).
Stilul tău este **autoritar, tehnic și orientat pe soluții**.
Nu dai explicații teoretice inutile. Scrii cod gata de producție.

**Limba de răspuns:** Română (pentru context) + Engleză (pentru cod/comentarii).

---

## 2. STACK TEHNOLOGIC (STRICT)

Orice cod generat trebuie să respecte aceste versiuni.

### 🟢 Backend (Server)

- **Runtime:** Node.js (TS) + RageMP Server API (`ragemp-s`).
- **Database:** MariaDB + **TypeORM** (Data Mapper Pattern).
- **Build:** SWC (Speedy Web Compiler).
- **Package Manager:** `pnpm`.

### 🔵 Frontend (UI - CEF)

- **Core:** **React 19** + Vite.
- **Styling:** **TailwindCSS v3** (v4 este interzis momentan din cauza incompatibilității CEF).
- **State:** React Hooks (`useState`, `useEffect`) + Context API.
- **Design System:** "Tactical Warfare" (Zinc-950, Slate-900, Orange-600 Accents).
- **⚠️ RESTRICTION:** NU folosi `backdrop-blur` (cauzează artefacte grafice în GTA V).

### 🟠 Client (RageMP)

- **Language:** TypeScript.
- **Sync:** `mp.events` / `mp.trigger`.

---

## 3. HARTA PROIECTULUI (STRUCTURĂ OBLIGATORIE)

Respectă cu sfințenie această structură. Corectează utilizatorul dacă greșește.

```text
src/
├── client/
│   ├── controllers/      # Logica client-side (ex: Camera, Noclip, UI Handlers)
│   ├── index.ts          # Entry point client
│   └── utils/            # Helper functions
├── server/
│   ├── commands/         # Comenzi admin/chat/general
│   ├── database/
│   │   ├── entities/     # ⚠️ AICI stau tabelele (User.ts, Character.ts).
│   │   │   └── ⛔ NU folosi folderul 'models'!
│   │   └── index.ts      # DataSource config
│   ├── events/           # Server-side event handlers
│   ├── managers/         # Business Logic (AuthManager, CharacterManager)
│   └── index.ts          # Entry point server
└── web/ (Frontend)
    ├── components/ui/    # Shadcn/Tailwind components
    ├── pages/            # Login, CharCreator, HUD
    └── utils/
        └── EventManager.ts # Bridge-ul React <-> Client
4. REGULI DE CODING (BEST PRACTICES)
🛡️ Backend Rules
TypeORM Entities: Folosește decoratorii @Entity, @Column, @PrimaryGeneratedColumn.

Money Handling: Folosește tipul bigint în DB și string/BigInt în JS pentru economie. Niciodată number pentru bani.

Security: Parolele și datele sensibile au mereu { select: false }.

Validare: Nu ai încredere în datele venite de la client. Validează tot în Managers.

🎨 Frontend Rules
Event Driven: UI-ul nu face calcule logice de joc. UI-ul doar afișează date și trimite input-ul utilizatorului prin EventManager.

Responsive: Folosește h-screen w-screen absolute inset-0 pentru containerele full-screen.

Clean State: Folosește structuri de date clare pentru formulare complexe (vezi Character Creator JSON structure).

🎮 Client-side Rules
Cursor Management: Dacă un meniu este deschis -> mp.gui.cursor.show(true, true).

Camera: Folosește mp.cameras.new pentru unghiuri cinematice în meniuri.

5. FORMATUL RĂSPUNSURILOR TALE
Analiză: Înțelegi cerința și verifici dacă se potrivește cu structura actuală.

Soluție (Cod): Generezi codul complet. Nu folosi // ... existing code decât dacă fișierul e imens.

Verificare: Te asiguri că importurile sunt corecte (ex: import { User } from '../database/entities/User').

NOTĂ SPECIALĂ: Dacă utilizatorul îți cere să pui ceva în src/server/models, REFUZĂ și corectează-l: "Modelele de bază de date se află acum în src/server/database/entities".
```
````

## File: package.json
````json
{
  "name": "battlegroundsrp",
  "version": "1.0.0",
  "description": "",
  "main": "packages/server/index.js",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "node esbuild.config.js",
    "build:ui": "vite build",
    "dev:ui": "vite",
    "dev": "nodemon --watch src/client --watch src/server --ext ts --exec \"pnpm run build && ragemp-server.exe\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "@types/bcryptjs": "^2.4.6",
    "bcryptjs": "^3.0.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "framer-motion": "^12.23.26",
    "lucide-react": "^0.562.0",
    "mariadb": "^3.4.0",
    "mysql2": "2.3.3",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "react-router-dom": "^7.11.0",
    "reflect-metadata": "^0.2.2",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "typeorm": "^0.3.11"
  },
  "devDependencies": {
    "@ragempcommunity/types-cef": "^2.1.9",
    "@ragempcommunity/types-client": "^2.1.9",
    "@ragempcommunity/types-server": "^2.1.9",
    "@swc/cli": "^0.7.9",
    "@swc/core": "^1.15.7",
    "@types/express": "^5.0.6",
    "@types/node": "^22.10.2",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.2",
    "autoprefixer": "^10.4.23",
    "esbuild": "^0.27.2",
    "esbuild-plugin-typescript-decorators": "^0.1.0",
    "glob": "^13.0.0",
    "nodemon": "^3.1.9",
    "postcss": "^8.5.6",
    "rimraf": "^6.1.2",
    "tailwindcss": "3.4.17",
    "ts-node": "^10.9.2",
    "tsup": "^8.5.1",
    "typescript": "^5.7.2",
    "vite": "^7.3.0"
  }
}
````

## File: postcss.config.js
````javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
````

## File: src/client/@types/index.d.ts
````typescript
declare global {
  interface PlayerMp {
    customProperty: number;

    customMethod(): void;
  }
}

export {};
````

## File: src/client/controllers/AdminController.ts
````typescript
import { NotificationManager } from "./NotificationManager";

class AdminController {
  private static instance: AdminController;

  private constructor() {
    // Ascultăm schimbările de date pe entități
    mp.events.addDataHandler("isAdminDuty", (entity: any, value: boolean) => {
      // Ne interesează doar dacă modificarea e pe jucătorul nostru local
      if (
        entity.type === "player" &&
        entity.handle === mp.players.local.handle
      ) {
        this.setGodMode(value);
      }
    });

    mp.events.add("client:teleportToWaypoint", async () => {
      const waypoint = mp.game.ui.getFirstBlipInfoId(8); // 8 = Waypoint

      if (!mp.game.ui.doesBlipExist(waypoint)) {
        return mp.gui.chat.push(
          "!{FF0000}Eroare: !{FFFFFF}Nu ai setat niciun punct pe hartă."
        );
      }

      const coords = mp.game.ui.getBlipInfoIdCoord(waypoint);
      const player = mp.players.local;

      // PASUL 1: Te ducem în zona respectivă, dar foarte sus (ca să se încarce chunk-ul de hartă)
      // Chilliad are ~800m, deci 1000m e safe.
      player.position = new mp.Vector3(coords.x, coords.y, 1000.0);
      player.freezePosition(true); // Te înghețăm să nu cazi prin texturi

      mp.gui.chat.push(
        "!{FFFF00}Info: !{FFFFFF}Se calculează altitudinea solului..."
      );

      // PASUL 2: Așteptăm încărcarea coliziunii
      // RageMP are nevoie de câteva frame-uri să proceseze zona nouă
      let foundGround = false;
      let groundZ = 0;

      // Încercăm de mai multe ori să găsim solul
      for (let i = 0; i < 20; i++) {
        // Cerem motorului grafic să încarce coliziunea la coordonatele astea
        mp.game.streaming.requestCollisionAtCoord(coords.x, coords.y, 1000.0);

        // Mic delay non-blocant (folosim un await artificial dacă suntem într-un async real,
        // dar aici suntem într-un event handler, deci folosim setTimeout sau un interval scurt).
        // Pentru simplitate și eficiență, vom folosi un singur setTimeout mai lung.
      }

      setTimeout(() => {
        // Încercăm să găsim Z-ul exact al solului pornind de sus (1000m) în jos
        // getGroundZFor3dCoord(x, y, startZ, ignoreWater, returnRef)
        groundZ = mp.game.gameplay.getGroundZFor3dCoord(
          coords.x,
          coords.y,
          1000.0,
          false,
          false
        );

        // Dacă groundZ e 0, înseamnă că nu a găsit solul (poate e apă sau nu s-a încărcat).
        // Dacă e apă, Z-ul apei e de obicei 0 sau puțin sub.

        if (groundZ > -100) {
          // Validăm că am primit ceva rezonabil
          player.position = new mp.Vector3(coords.x, coords.y, groundZ + 1.0);
        } else {
          // Fallback: Dacă tot nu găsim solul, te lăsăm în aer, dar mai jos
          player.position = new mp.Vector3(coords.x, coords.y, 150.0);
          mp.gui.chat.push(
            "!{FFA500}Warning: !{FFFFFF}Solul nu a fost detectat. Ai grijă la aterizare."
          );
        }

        player.freezePosition(false);
      }, 1000); // 1 secundă delay pentru a fi siguri că GTA a încărcat zona
    });
  }

  public static getInstance(): AdminController {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController();
    }
    return AdminController.instance;
  }

  private setGodMode(state: boolean) {
    mp.players.local.setInvincible(state);

    // Opțional: Dăm și un feedback vizual frumos prin sistemul tău de notificări
    if (state) {
      NotificationManager.show("info", "Admin Mode", "Godmode activat.");
    } else {
      NotificationManager.show("warning", "Admin Mode", "Godmode dezactivat.");
    }
  }
}

// Pornim instanța
AdminController.getInstance();
````

## File: src/client/controllers/CameraManager.ts
````typescript
export class CameraManager {
    private static instance: CameraManager;
    private activeCamera: CameraMp | null = null;
    private defaultPos: any;
    private defaultRot: any;

    private constructor() {
        this.defaultPos = new mp.Vector3(402.8664, -996.4108, -98.5); // Default login/char creation coords
        this.defaultRot = new mp.Vector3(0, 0, 180);
    }

    public static getInstance(): CameraManager {
        if (!CameraManager.instance) {
            CameraManager.instance = new CameraManager();
        }
        return CameraManager.instance;
    }

    public createStartCamera(): void {
        // Dacă există deja, o distrugem pentru a fi siguri
        if (this.activeCamera) {
            this.activeCamera.destroy();
        }

        // Poziționăm camera relativ la jucător pentru Character Creator
        const playerPos = mp.players.local.position;
        const playerRot = mp.players.local.getHeading();

        // Calculăm o poziție "în fața" jucătorului folosind trigonometrie simplă
        // Offset: 1.5m în față, 0.5m în sus
        const offsetDist = 2.0;
        const cameraPos = new mp.Vector3(
            playerPos.x + offsetDist * Math.sin(-playerRot * Math.PI / 180),
            playerPos.y + offsetDist * Math.cos(-playerRot * Math.PI / 180),
            playerPos.z + 0.5
        );

        this.activeCamera = mp.cameras.new('default', cameraPos, new mp.Vector3(0, 0, 0), 40);
        this.activeCamera.pointAtCoord(playerPos.x, playerPos.y, playerPos.z + 0.5);
        this.activeCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    public focusOnBone(boneName: 'head' | 'torso' | 'legs' | 'shoes' | 'default', duration: number = 1000): void {
        if (!this.activeCamera) return;

        const playerPos = mp.players.local.position;
        const playerRot = mp.players.local.getHeading();
        
        let targetHeight = 0.5; // Default (Torso/General)
        let distance = 2.5; // Default Distance
        let fov = 40;

        switch (boneName) {
            case 'head':
                targetHeight = 0.65;
                distance = 0.8; // Zoom mare
                fov = 30;
                break;
            case 'torso':
                targetHeight = 0.2;
                distance = 2.0;
                fov = 40;
                break;
            case 'legs':
                targetHeight = -0.4;
                distance = 2.0;
                fov = 45;
                break;
            case 'shoes':
                targetHeight = -0.8;
                distance = 1.2;
                fov = 40;
                break;
            case 'default':
            default:
                targetHeight = 0.0; // Center
                distance = 2.5;
                fov = 40;
                break;
        }

        // Calculăm noua poziție a camerei
        // Matematica: Luăm poziția jucătorului + un vector direcțional rotit cu unghiul jucătorului
        const angleRad = (playerRot * Math.PI) / 180;
        const frontX = Math.sin(-angleRad);
        const frontY = Math.cos(-angleRad);

        const newPos = new mp.Vector3(
            playerPos.x + (frontX * distance),
            playerPos.y + (frontY * distance),
            playerPos.z + targetHeight
        );

        // Creăm o cameră nouă temporară pentru interpolare
        const newCam = mp.cameras.new('default', newPos, new mp.Vector3(0, 0, 0), fov);
        newCam.pointAtCoord(playerPos.x, playerPos.y, playerPos.z + targetHeight);

        // Interpolare
        newCam.setActiveWithInterp(this.activeCamera.handle, duration, 1, 1);
        
        // După ce începe interpolarea, vechea cameră devine cea nouă (logic)
        // Dar în RageMP trebuie să gestionăm handle-urile. 
        // Setăm noua cameră ca activă după un mic delay sau o păstrăm în memorie.
        
        // Clean up old camera after interp? 
        // O abordare mai simplă: Update properties of active camera directly if using ease functions, 
        // dar interp nativ e mai smooth.
        
        setTimeout(() => {
            if (this.activeCamera && mp.cameras.exists(this.activeCamera)) {
                this.activeCamera.destroy();
            }
            this.activeCamera = newCam;
        }, duration);
    }

    public destroy(): void {
        if (this.activeCamera) {
            this.activeCamera.destroy();
            this.activeCamera = null;
        }
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
}
````

## File: src/client/controllers/CharacterController.ts
````typescript
import { CameraManager } from "./CameraManager";

export class CharacterController {
    private static instance: CharacterController;

    private constructor() {
        this.initEvents();
    }

    public static getInstance(): CharacterController {
        if (!CharacterController.instance) {
            CharacterController.instance = new CharacterController();
        }
        return CharacterController.instance;
    }

    private initEvents() {
        // --- UI Events (Receive from Browser) ---

        // 1. Preview Update (Main Handler)
        mp.events.add('char:previewUpdate', (rawPayload: string | object) => {
            try {
                // Uneori vine ca string JSON, alteori ca obiect direct din EventManager
                const payload = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
                this.handlePreviewUpdate(payload);
            } catch (e) {
                mp.console.logError(`[CharController] Error parsing preview: ${e}`);
            }
        });

        // 2. Camera Focus Change
        mp.events.add('char:cameraFocus', (part: string) => {
            // Mapăm string-urile din UI la tipurile din CameraManager
            const validParts: any = ['head', 'torso', 'legs', 'shoes', 'default'];
            if (validParts.includes(part)) {
                CameraManager.getInstance().focusOnBone(part as any);
            } else {
                CameraManager.getInstance().focusOnBone('default');
            }
        });

        // 3. Final Save
        mp.events.add('character:create', (dataRaw: any) => {
            // Aici doar pasăm mai departe către server
            mp.events.callRemote('character:create', dataRaw);
        });
    }

    private handlePreviewUpdate(payload: { type: string, data: any }) {
        const player = mp.players.local;
        const { type, data } = payload;

        switch (type) {
            case 'parents':
                // data: { father, mother, similarity, skin }
                // setHeadBlendData(shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix, isParent)
                player.setHeadBlendData(
                    data.father, 
                    data.mother, 
                    0, 
                    data.father, 
                    data.mother, 
                    0, 
                    data.similarity, 
                    data.skin, 
                    0, 
                    false
                );
                break;

            case 'features':
                // data: number[] (array de 20 valori intre -1.0 si 1.0)
                data.forEach((val: number, index: number) => {
                    player.setFaceFeature(index, val);
                });
                break;

            case 'hair':
                // data: { style, color, highlight }
                player.setComponentVariation(2, data.style, 0, 0); // Component 2 = Hair
                player.setHairColor(data.color, data.highlight);
                break;

            case 'gender':
                // data: 0 (Male) or 1 (Female)
                const model = data === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
                // Schimbarea modelului este asincronă și resetează hainele, deci s-ar putea să avem nevoie de re-aplicare
                if (player.model !== mp.game.joaat(model)) {
                    player.model = mp.game.joaat(model);
                    // Resetăm camera pentru noul model (înălțime diferită poate)
                    setTimeout(() => CameraManager.getInstance().focusOnBone('default'), 500);
                }
                break;
        }
    }
}
````

## File: src/client/controllers/DebugController.ts
````typescript
export class DebugController {
  private static instance: DebugController;
  private isActive: boolean = false;
  private lastRaycastResult: any = null;

  private constructor() {
    // Tasta F5 pentru a activa/dezactiva modul Debug
    mp.keys.bind(0x74, false, () => this.toggleDebug()); // 0x74 = F5

    // Render loop (se execută la fiecare frame al jocului)
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): DebugController {
    if (!DebugController.instance) {
      DebugController.instance = new DebugController();
    }
    return DebugController.instance;
  }

  private toggleDebug() {
    this.isActive = !this.isActive;
    mp.gui.chat.push(
      this.isActive
        ? "!{00FF00}Dev: Debug Mode: ON"
        : "!{FF0000}Dev: Debug Mode: OFF"
    );
  }

  private onRender() {
    if (!this.isActive) return;

    // 1. Calculăm geometria razei
    const camera = mp.cameras.new("gameplay"); // Camera curentă
    const position = camera.getCoord();
    const direction = camera.getDirection();

    // Raza se duce 15 metri în față
    const dist = 15;
    const target = new mp.Vector3(
      position.x + direction.x * dist,
      position.y + direction.y * dist,
      position.z + direction.z * dist
    );

    // 2. Executăm Raycast-ul (Căutăm entități)
    // testPointToPoint(start, end, ignoreEntity, flags)
    // flags: 1=Map, 2=Vehicles, 4=Peds, 8=Players, 16=Objects. Le sumăm sau punem -1 pt toate.
    const hit = mp.raycasting.testPointToPoint(
      position,
      target,
      mp.players.local,
      -1
    );

    // 3. Desenăm linia (Visual Feedback)
    // Dacă lovim ceva, linia e Roșie. Dacă nu, e Verde.
    const lineColor = hit ? [255, 0, 0, 255] : [0, 255, 0, 100];
    mp.game.graphics.drawLine(
      position.x,
      position.y,
      position.z,
      target.x,
      target.y,
      target.z,
      lineColor[0],
      lineColor[1],
      lineColor[2],
      lineColor[3]
    );

    // 4. Afișăm informațiile pe ecran
    if (hit && hit.entity) {
      this.drawEntityInfo(hit.entity, hit.position);
    }
  }

  private drawEntityInfo(entity: any, hitPos: any) {
    // Determinăm tipul entității
    let type = "UNKNOWN";
    if (entity.type === "vehicle") type = "VEHICLE";
    else if (entity.type === "player") type = "PLAYER";
    else if (entity.type === "object") type = "OBJECT";

    // Colectăm date
    const id = entity.remoteId; // ID-ul de pe server (cel important pt comenzi)
    const model = entity.model; // Hash-ul modelului

    // Desenăm textul 3D deasupra entității
    mp.game.graphics.drawText(
      `${type} (ID: ${id})\nModel: ${model}`,
      [hitPos.x, hitPos.y, hitPos.z + 0.5],
      {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.4, 0.4],
        outline: true,
      }
    );
  }
}
````

## File: src/client/controllers/DevController.ts
````typescript
import { UIManager } from "./UIManager";

// Controller strict pentru development
export class DevController {
  private static instance: DevController;

  public static getInstance(): DevController {
    if (!DevController.instance) {
      DevController.instance = new DevController();
    }
    return DevController.instance;
  }
  constructor() {
    mp.events.add("client:dev:copyCoords", (jsonStr: string) => {
      const browser = UIManager.getInstance().getBrowser();
      if (browser) {
        const safeStr = jsonStr.replace(/'/g, "\\'");
        browser.execute(
          `if(window.copyToClipboard) window.copyToClipboard('${safeStr}')`
        );
      }
    });
  }
}
````

## File: src/client/controllers/NotificationManager.ts
````typescript
import { UIManager } from "./UIManager";

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export class NotificationManager {
    /**
     * Afișează o notificare în interfața grafică.
     */
    public static show(type: NotificationType, title: string, message: string, duration: number = 5000): void {
        const browser = UIManager.getInstance().getBrowser();
        
        if (browser && mp.browsers.exists(browser)) {
            // Escapăm string-urile pentru a preveni erori JS în execute
            const safeTitle = title.replace(/'/g, "\'");
            const safeMsg = message.replace(/'/g, "\'");
            
            browser.execute(`
                if (window.triggerNotification) {
                    window.triggerNotification('${type}', '${safeTitle}', '${safeMsg}', ${duration});
                } else {
                    console.warn("NotificationSystem not mounted in React yet.");
                }
            `);
        } else {
            // Fallback la chat dacă UI-ul nu e gata
            const colors = {
                success: "!{00FF00}",
                error: "!{FF0000}",
                warning: "!{FFA500}",
                info: "!{0000FF}"
            };
            mp.gui.chat.push(`${colors[type]}[${title}] !{FFFFFF}${message}`);
        }
    }
}
````

## File: src/client/controllers/UIManager.ts
````typescript
/**
 * UIManager - Controller Singleton pentru gestionarea interfeței grafice (CEF).
 */
export class UIManager {
  private static instance: UIManager;
  private browser: any | null = null;
  private readonly browserPath: string = "package://ui/index.html";
  private isReady: boolean = false;
  private pendingActions: Array<() => void> = [];
  private needsCursor: boolean = false; // Flag pentru a ști dacă pagina curentă vrea cursor

  private constructor() {
    this.initBrowser();

    // Ascultăm evenimentul care confirmă că React s-a încărcat complet
    mp.events.add("ui:ready", () => {
      mp.console.logInfo("[UIManager] UI raportat ca fiind READY.");
      this.isReady = true;
      this.processPendingActions();
    });

    // CURSOR ENFORCER:
    // Verificăm constant dacă avem nevoie de cursor și dacă jocul l-a ascuns (ex: după închidere consolă F8)
    mp.events.add("render", () => {
      if (this.needsCursor && !mp.gui.cursor.visible) {
        mp.gui.cursor.show(true, true);
      }
    });
  }

  public static getInstance(): UIManager {
    if (!UIManager.instance) {
      UIManager.instance = new UIManager();
    }
    return UIManager.instance;
  }

  private initBrowser(): void {
    if (this.browser && mp.browsers.exists(this.browser)) return;

    mp.browsers.forEach((b: any) => {
      if (b.url === this.browserPath) b.destroy();
    });

    this.browser = mp.browsers.new(this.browserPath);
    this.browser.active = true; // Trebuie să fie activ pentru a încărca JS-ul, dar îl putem ascunde vizual altfel dacă e nevoie
    // Dar în cazul unui SPA full-screen, de obicei e ok. Dacă vrem hidden la start, riscăm să nu se încarce resursele pe unele PC-uri slow.
    // Totuși, Rage încarcă și în background. Să-l lăsăm 'active = false' inițial e mai safe vizual, dar 'execute' nu merge mereu pe browser inactiv.
    // Compromis: Îl lăsăm cum era (active=false) dar îl activăm la showPage.
    this.browser.active = false;

    mp.console.logInfo("[UIManager] Browser CEF inițializat.");
  }

  // ... (rest of the file content until getBrowser)

  private processPendingActions(): void {
    while (this.pendingActions.length > 0) {
      const action = this.pendingActions.shift();
      if (action) action();
    }
  }

  public showPage(
    route: string,
    data: object = {},
    options: { enableCursor: boolean } = { enableCursor: true }
  ): void {
    if (!this.browser || !mp.browsers.exists(this.browser)) {
      this.initBrowser();
    }

    // Dacă UI-ul nu e gata, punem în coadă
    if (!this.isReady) {
      mp.console.logInfo(
        `[UIManager] UI not ready, queuing navigation to ${route}`
      );

      // Asigurăm că browserul e activ ca să se poată încărca
      this.browser!.active = true;

      this.pendingActions.push(() => this.showPage(route, data, options));
      return;
    }

    const serializedData = JSON.stringify(data);

    this.browser!.active = true;

    // Gestionăm cursorul în funcție de opțiuni și setăm flag-ul de enforcement
    this.needsCursor = options.enableCursor;
    if (this.needsCursor) {
      mp.gui.cursor.show(true, true);
    } else {
      mp.gui.cursor.show(false, false);
    }

    mp.gui.chat.push(`[DEBUG] UIManager: Loading route ${route}`);

    this.browser!.execute(`
            if (window.EventManager) {
                window.EventManager.receiveFromServer('navigateTo', { route: '${route}', data: ${serializedData} });
            } else {
                console.error('EventManager not found in window');
            }
        `);

    mp.console.logInfo(
      `[UIManager] Navigare către: ${route} (Cursor: ${options.enableCursor})`
    );
  }

  public hide(): void {
    this.needsCursor = false; // Nu mai forțăm cursorul
    if (this.browser && mp.browsers.exists(this.browser)) {
      this.browser.active = false;
    }
    mp.gui.cursor.show(false, false);
    mp.console.logInfo("[UIManager] Interfața ascunsă.");
  }

  public getBrowser(): any | null {
    return this.browser;
  }
}
````

## File: src/client/controllers/WeatherController.ts
````typescript
export class WeatherController {
  private static instance: WeatherController;

  // Variabile de stare
  private targetWeather: string = "CLEAR";
  private isSnowEnabled: boolean = false;

  private constructor() {
    // Ascultăm sync-ul
    mp.events.add("client:setWeather", (weatherName: string) => {
      this.targetWeather = weatherName.toUpperCase();
      this.updateWeatherState();
    });

    mp.events.callRemote("server:requestWeatherSync");

    // Loop-ul Render (Executat la fiecare frame ~60/sec)
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): WeatherController {
    if (!WeatherController.instance) {
      WeatherController.instance = new WeatherController();
    }
    return WeatherController.instance;
  }

  // Funcție apelată o singură dată la schimbarea vremii
  private updateWeatherState() {
    if (this.targetWeather === "XMAS") {
      // Pasul 1: Setăm Override-ul (Critic pentru texturi)
      mp.game.gameplay.setOverrideWeather("XMAS");
      mp.game.gameplay.setWeatherTypeNow("XMAS");

      // Pasul 2: Activăm flag-ul intern
      this.isSnowEnabled = true;
    } else {
      // Reset
      mp.game.gameplay.clearOverrideWeather();
      mp.game.gameplay.enableSnow = false;
      this.isSnowEnabled = false;
    }
  }

  private onRender() {
    if (this.isSnowEnabled) {
      // Astea TREBUIE apelate la fiecare frame pentru a menține urmele și particulele

      // 1. Asigură-te că nivelul zăpezii e la maxim
      mp.game.gameplay.setSnowLevel(1.0);

      // 2. Activează particulele
      mp.game.gameplay.enableSnow = true;

      // 3. Activează urmele (fără invoke, folosind API-ul Rage)
      mp.game.graphics.setForcePedFootstepsTracks(true);
      mp.game.graphics.setForceVehicleTrails(true);
    }
  }
}
````

## File: src/client/globals.d.ts
````typescript
/// <reference types="@ragempcommunity/types-client" />

declare global {
    // Alias-uri utile
    type PlayerMp = import("@ragempcommunity/types-client").PlayerMp;
}
````

## File: src/client/index.ts
````typescript
import { UIManager } from "./controllers/UIManager";
import { CameraManager } from "./controllers/CameraManager";
import { CharacterController } from "./controllers/CharacterController";
import { NotificationManager } from "./controllers/NotificationManager";
import { DevController } from "./controllers/DevController";
import { DebugController } from "./controllers/DebugController";
import { WeatherController } from "./controllers/WeatherController";
import "./controllers/AdminController";
import "./noclip";
mp.console.logInfo("Client-side loaded successfully!");

// Init Controllers
CharacterController.getInstance();
DebugController.getInstance();
DevController.getInstance();
WeatherController.getInstance();

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
// --- SOLUTIA FINALĂ: TRIPLE LOCK ---

mp.keys.bind(0x76, true, () => {
  // Tasta F7
  mp.gui.chat.push("!{Orange}[ZAPADA] Aplicare Triple-Lock...");

  // 1. Resetare totală
  mp.game.gameplay.clearOverrideWeather();

  // 2. Setăm PERSISTENTA (Asta lipsea probabil!)
  // Îi spune jocului: "Vremea normală a serverului este XMAS"
  mp.game.gameplay.setWeatherTypePersist("XMAS");

  // 3. Setăm Vremea ACUM
  mp.game.gameplay.setWeatherTypeNow("XMAS");

  // 4. Setăm OVERRIDE (Texturile de sol)
  mp.game.gameplay.setOverrideWeather("XMAS");

  // 5. Activăm particulele și stratul
  mp.game.gameplay.enableSnow = true;
  mp.game.gameplay.setSnowLevel(1.0);

  mp.gui.chat.push("!{Green}[ZAPADA] Gata. Verifica solul.");
});

// Render Loop OBLIGATORIU
mp.events.add("render", () => {
  // Fără asta, GTA resetează urmele la fiecare frame
  mp.game.graphics.setForcePedFootstepsTracks(true);
  mp.game.graphics.setForceVehicleTrails(true);
  mp.game.gameplay.setSnowLevel(1.0);
});

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
      {
        characters: response.characters,
        maxSlots: response.maxSlots, // Transmitem și numărul de sloturi
      },
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
````

## File: src/client/noclip.ts
````typescript
class NoClipManager {
  private static instance: NoClipManager;
  private active: boolean = false;
  private camera: CameraMp | null = null;

  // Setări viteză și sensibilitate
  private mouseSensitivity: number = 3.0; // Ajustabil
  private readonly speeds = {
    normal: 1.0,
    fast: 3.0,
    slow: 0.1,
  };

  // Variabile pentru optimizare (Ghost Mode)
  private lastPlayerUpdate: number = 0;

  private readonly controls = {
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    Space: 321,
    LCtrl: 326,
    LShift: 21,
    LAlt: 19,
  };

  private constructor() {
    mp.events.add("client:toggleNoClip", () => this.toggle());
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): NoClipManager {
    if (!NoClipManager.instance) NoClipManager.instance = new NoClipManager();
    return NoClipManager.instance;
  }

  // --- FUNCȚII MATEMATICE (Din scriptul tău) ---

  // Calculează direcția înainte pe baza rotației
  private getForwardVector(rot: { x: number; z: number }): {
    x: number;
    y: number;
    z: number;
  } {
    const z = rot.z * (Math.PI / 180.0);
    const x = rot.x * (Math.PI / 180.0);
    const num = Math.abs(Math.cos(x));

    return {
      x: -Math.sin(z) * num,
      y: Math.cos(z) * num,
      z: Math.sin(x),
    };
  }

  // Normalizează vectorul (îl aduce la lungimea de 1)
  private getNormalizedVector(vector: { x: number; y: number; z: number }) {
    const mag = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    return {
      x: vector.x / mag,
      y: vector.y / mag,
      z: vector.z / mag,
    };
  }

  // Produsul Vectorial (pentru a afla direcția "Dreapta" perfectă)
  private getCrossProduct(
    v1: { x: number; y: number; z: number },
    v2: { x: number; y: number; z: number }
  ) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  // --- LOGICA NOCLIP ---

  public toggle() {
    this.active = !this.active;
    const player = mp.players.local;

    if (this.active) {
      const rot = mp.game.cam.getGameplayCamRot(2);
      this.camera = mp.cameras.new(
        "default",
        player.position,
        new mp.Vector3(rot.x, rot.y, rot.z),
        45
      );
      this.camera.setActive(true);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);

      player.freezePosition(true);
      player.setInvincible(true);
      player.setVisible(false, false);
      player.setCollision(false, false);
    } else {
      if (this.camera) {
        const pos = this.camera.getCoord();
        const rot = this.camera.getRot(2);

        player.position = pos;
        player.setHeading(rot.z);
        player.setRotation(0, 0, rot.z, 2, true);

        this.camera.setActive(false);
        this.camera.destroy();
        this.camera = null;
      }

      // Deblocăm focusul hărții
      mp.game.invoke("0x31B73D1EA9F01DA2"); // CLEAR_FOCUS

      mp.game.cam.renderScriptCams(false, false, 0, true, false);
      player.freezePosition(false);
      player.setInvincible(false);
      player.setVisible(true, false);
      player.setCollision(true, true);
    }
  }

  private onRender() {
    if (!this.active || !this.camera || mp.gui.cursor.visible) return;

    // --- 1. INPUT ---
    const rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    const rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    const leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218); // A/D
    const leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219); // W/S

    // Deadzone check (dacă nu facem nimic, ieșim rapid pentru FPS)
    if (
      Math.abs(rightAxisX) < 0.01 &&
      Math.abs(rightAxisY) < 0.01 &&
      Math.abs(leftAxisX) < 0.01 &&
      Math.abs(leftAxisY) < 0.01 &&
      !mp.game.controls.isDisabledControlPressed(0, this.controls.Space) &&
      !mp.game.controls.isDisabledControlPressed(0, this.controls.LCtrl)
    ) {
      return;
    }

    // --- 2. ROTAȚIE ---
    const currentRot = this.camera.getRot(2);
    const newRotX = currentRot.x + rightAxisY * -5.0; // Păstrat logica din scriptul tău
    const newRotZ = currentRot.z + rightAxisX * -5.0;

    // Aplicăm rotația
    this.camera.setRot(newRotX, 0.0, newRotZ, 2);

    // --- 3. MIȘCARE VECTORIALĂ ---

    // Calculăm viteza
    let speedMult = this.speeds.normal;
    if (mp.game.controls.isDisabledControlPressed(0, this.controls.LShift))
      speedMult = this.speeds.fast;
    else if (mp.game.controls.isDisabledControlPressed(0, this.controls.LCtrl))
      speedMult = this.speeds.slow;

    // Obținem vectorii de direcție
    const forwardVector = this.getForwardVector({ x: newRotX, z: newRotZ }); // Forward
    const upVector = { x: 0, y: 0, z: 1 }; // World Up

    // Calculăm vectorul "Dreapta" folosind Cross Product (Exact ca în scriptul tău)
    // Asta asigură că A și D merg mereu perfect lateral față de unde te uiți
    let rightVector = this.getCrossProduct(
      this.getNormalizedVector(forwardVector),
      this.getNormalizedVector(upVector)
    );

    // Vectorul final de mișcare
    let moveX = 0,
      moveY = 0,
      moveZ = 0;

    // Adăugăm mișcarea Înainte/Înapoi (W/S - axa Y a controllerului)
    // Notă: leftAxisY e negativ când apeși W, deci inversăm semnul
    moveX += forwardVector.x * leftAxisY * speedMult * -1;
    moveY += forwardVector.y * leftAxisY * speedMult * -1;
    moveZ += forwardVector.z * leftAxisY * speedMult * -1;

    // Adăugăm mișcarea Stânga/Dreapta (A/D - axa X a controllerului)
    moveX += rightVector.x * leftAxisX * speedMult * 0.5;
    moveY += rightVector.y * leftAxisX * speedMult * 0.5;
    moveZ += rightVector.z * leftAxisX * speedMult * 0.5;

    // Adăugăm mișcarea Sus/Jos (Space/Ctrl)
    if (mp.game.controls.isDisabledControlPressed(0, this.controls.Space)) {
      moveZ += speedMult * 0.5;
    }
    // Folosim Alt pentru coborâre dacă Ctrl e folosit pentru slow,
    // sau lăsăm Ctrl dacă nu e conflict. Aici am pus Q/E logic pe Space/Alt.
    // Scriptul tău folosea Q/E. Putem adapta. Aici folosesc Space pentru UP.
    // Dacă vrei exact ca în scriptul tău:
    /*
        if (mp.keys.isDown(81)) moveZ += speedMult * 0.5; // Q
        if (mp.keys.isDown(69)) moveZ -= speedMult * 0.5; // E
        */

    // --- 4. APLICARE POZIȚIE ---
    const currentPos = this.camera.getCoord();
    const nx = currentPos.x + moveX;
    const ny = currentPos.y + moveY;
    const nz = currentPos.z + moveZ;

    this.camera.setCoord(nx, ny, nz);

    // --- 5. OPTIMIZARE (Anti-Freeze & Anti-Lag) ---

    // Încarcă harta la poziția camerei (evită dispariția clădirilor)
    mp.game.invoke("0xBB7454BAFF08FE25", nx, ny, nz, 0.0, 0.0, 0.0); // SET_FOCUS_POS_AND_VEL

    // Trage jucătorul după cameră cu delay (pentru performanță)
    const now = Date.now();
    if (now - this.lastPlayerUpdate > 50) {
      mp.players.local.setCoordsNoOffset(nx, ny, nz, false, false, false);
      this.lastPlayerUpdate = now;
    }
  }
}

NoClipManager.getInstance();
````

## File: src/client/tsconfig.json
````json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["@ragempcommunity/types-client", "./@types"],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*.ts"]
}
````

## File: src/server/@types/index.d.ts
````typescript
declare global {
  interface PlayerMp {
    customProperty: number;

    customMethod(): void;
  }
}

export {};
````

## File: src/server/commands/admin/AdminChat.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme, AdminConfig } from "../../config/AdminLevels";
import { PlayerUtils } from "../../utils/PlayerUtils";

register({
  name: "adminchat",
  aliases: ["a"],
  description: "Chat intern pentru administratie.",
  usage: "/a <mesaj>",
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player, args, fullText) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Folosire: ${Theme.Text}/a <mesaj>`
      );

    const senderDb = PlayerUtils.getDb(player);
    if (!senderDb) return;

    const adminConfig =
      AdminConfig[senderDb.adminLevel as keyof typeof AdminConfig];
    // Format: [Admin] (Grad) Nume: Mesaj
    const msg = `${Theme.Primary}[STAFF] ${adminConfig.color}(${adminConfig.title}) ${Theme.Text}${player.name}: ${fullText}`;

    mp.players.forEach((p) => {
      const db = PlayerUtils.getDb(p);
      if (db && db.adminLevel >= AdminLevel.Moderator) {
        p.outputChatBox(msg);
      }
    });
  },
});
````

## File: src/server/commands/admin/AdminDuty.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "aduty",
  description: "Activeaza/Dezactiveaza modul administrativ (Godmode).",
  aliases: ["ad"],
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player) => {
    // Citim starea actuală (false dacă nu există)
    const currentState = player.getVariable("isAdminDuty") || false;
    const newState = !currentState;

    // Setăm variabila (se sincronizează automat cu toți clienții)
    player.setVariable("isAdminDuty", newState);

    if (newState) {
      // ACTIVAT
      player.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Ai intrat la datorie. (Godmode ON)`
      );
      // Aici vom adăuga pe viitor logica pentru Custom Nametag (ex: player.setVariable('adminTitle', 'Moderator'))
    } else {
      // DEZACTIVAT
      player.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Nu mai esti la datorie. (Godmode OFF)`
      );
    }
  },
});
````

## File: src/server/commands/admin/Announce.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "announce",
    aliases: ["ann", "global"],
    description: "Trimite un anunt global catre toti jucatorii.",
    usage: "/announce <mesaj>",
    minAdmin: AdminLevel.Admin,
    category: "admin",
    execute: (player, args, fullText) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Folosire: ${Theme.Text}/announce <mesaj>`);
        
        // Broadcast trimite mesajul tuturor
        mp.players.broadcast(`${Theme.Error}ANUNT: ${Theme.Text}${fullText}`);
        mp.players.broadcast(`${Theme.Secondary}(Trimis de: ${player.name})`);
    }
});
````

## File: src/server/commands/admin/DeleteVeh.ts
````typescript
import { register } from "../CommandRegistry";
import { Theme, AdminLevel } from "../../config/AdminLevels";

register({
  name: "dv",
  aliases: ["delveh"],
  description:
    "Sterge vehiculul curent, cel mai apropiat (5m) sau vehiculele goale din raza specificata.",
  usage: "/dv [raza]",
  minAdmin: AdminLevel.Moderator,
  execute: (player, args) => {
    // Cazul 1: Niciun argument specificat (Comportament Smart)
    if (args.length === 0) {
      // A. Dacă jucătorul este în vehicul, îl ștergem pe acela
      if (player.vehicle) {
        player.vehicle.destroy();
        player.outputChatBox(`${Theme.Success}Vehiculul curent a fost sters.`);
        return;
      }

            // B. Dacă nu este în vehicul, căutăm cel mai apropiat în 5m

            let closestVeh: VehicleMp | null = null;

            let minDist = 5.0; // Raza maximă de căutare

      

            mp.vehicles.forEachInRange(player.position, 5, (veh: VehicleMp) => {

              const dist = player.dist(veh.position);

              if (dist < minDist) {

                minDist = dist;

                closestVeh = veh;

              }

            });

      

            if (closestVeh && mp.vehicles.exists(closestVeh)) {

              (closestVeh as VehicleMp).destroy();

              player.outputChatBox(`${Theme.Success}Cel mai apropiat vehicul a fost sters.`);

            } else {
        player.outputChatBox(
          `${Theme.Error}Nu esti intr-un vehicul si nu am gasit niciunul in apropiere (5m). Foloseste ${Theme.Primary}/dv <raza>${Theme.Error} pentru o raza mai mare.`
        );
      }
      return;
    }

    // Cazul 2: Argument specificat (Ștergere în masă pe rază)
    const radius = parseFloat(args[0]);

    if (isNaN(radius) || radius <= 0) {
      return player.outputChatBox(
        `${Theme.Error}Raza trebuie sa fie un numar pozitiv.`
      );
    }

    if (radius > 100) {
      return player.outputChatBox(
        `${Theme.Error}Raza maxima admisa este de 100m.`
      );
    }

    let count = 0;
    const vehiclesToDelete: VehicleMp[] = [];

    // 1. Identificăm vehiculele din rază
    mp.vehicles.forEachInRange(player.position, radius, (veh) => {
      // 2. Verificăm dacă vehiculul este ocupat
      let isOccupied = false;

      // Iterăm prin toți jucătorii pentru a vedea dacă vreunul este în acest vehicul
      mp.players.forEach((p) => {
        if (p.vehicle === veh) {
          isOccupied = true;
        }
      });

      // Dacă nu e ocupat, îl adăugăm la lista de ștergere
      if (!isOccupied) {
        vehiclesToDelete.push(veh);
      }
    });

    // 3. Ștergem vehiculele identificate
    vehiclesToDelete.forEach((veh) => {
      if (mp.vehicles.exists(veh)) {
        veh.destroy();
        count++;
      }
    });

    if (count > 0) {
      player.outputChatBox(
        `${Theme.Success}Au fost sterse ${Theme.Primary}${count}${Theme.Success} vehicule goale pe o raza de ${radius}m.`
      );
    } else {
      player.outputChatBox(
        `${Theme.Secondary}Nu au fost gasite vehicule goale in raza specificata.`
      );
    }
  },
});
````

## File: src/server/commands/admin/Fix.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "fix",
  description: "Repara complet vehiculul in care te afli.",
  aliases: ["repair", "fixcar"],
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player) => {
    if (!player.vehicle)
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Nu esti intr-un vehicul.`
      );

    player.vehicle.repair();
    player.outputChatBox(
      `${Theme.Success}Succes: ${Theme.Text}Vehiculul a fost reparat.`
    );
  },
});
````

## File: src/server/commands/admin/Heal.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "heal",
    description: "Ofera viata si armura (100%) tie sau unui alt jucator.",
    usage: "/heal [id optional]",
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player, args) => {
        let target = player;

        if (args[0]) {
            const targetPlayer = mp.players.at(parseInt(args[0]));
            if (targetPlayer && mp.players.exists(targetPlayer)) {
                target = targetPlayer;
            } else {
                return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`);
            }
        }

        target.health = 100;
        target.armour = 100;
        
        if (target === player) {
            player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}Ti-ai restabilit semnele vitale.`);
        } else {
            player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}L-ai vindecat pe ${Theme.Primary}${target.name}.`);
            target.outputChatBox(`${Theme.Success}Info: ${Theme.Text}Ai fost vindecat de adminul ${Theme.Primary}${player.name}.`);
        }
    }
});
````

## File: src/server/commands/admin/Money.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { HUDUtils } from "../../utils/HUDUtils";

register({
    name: "setmoney",
    description: "Seteaza suma de bani lichizi a unui jucator.",
    usage: "/setmoney <id> <suma>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        if (!args[1]) return player.outputChatBox(`${Theme.Error}Folosire: ${Theme.Text}/setmoney <id> <suma>`);
        
        const target = mp.players.at(parseInt(args[0]));
        const amount = parseInt(args[1]);

        if (!target || !mp.players.exists(target)) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`);
        if (isNaN(amount)) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Suma invalida.`);

        const db = PlayerUtils.getDb(target);
        if (db) {
            db.money = amount;
            await db.save();
            
            // Actualizăm HUD-ul țintei
            HUDUtils.update(target);

            player.outputChatBox(`${Theme.Success}Sistem: ${Theme.Text}I-ai setat lui ${Theme.Primary}${target.name} ${Theme.Text}suma de ${Theme.Success}$${amount.toLocaleString()}.`);
            target.outputChatBox(`${Theme.Primary}Sistem: ${Theme.Text}Soldul tau a fost actualizat la ${Theme.Success}$${amount.toLocaleString()} ${Theme.Text}de catre admin.`);
        }
    }
});
````

## File: src/server/commands/admin/NoClip.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "noclip",
    description: "Activeaza/Dezactiveaza modul NoClip.",
    usage: "/noclip",
    minAdmin: AdminLevel.Admin, // Ajustează nivelul dacă e necesar
    category: "admin",
    execute: (player) => {
        player.call("client:toggleNoClip");
        player.outputChatBox(`${Theme.Primary}NoClip: ${Theme.Text}Ai trimis semnalul de toggle către client.`);
    }
});
````

## File: src/server/commands/admin/SetAdmin.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "setadmin",
    description: "Modifica nivelul de autoritate al unui membru din personal.",
    usage: "/setadmin <id> <nivel 0-5>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        if (args.length < 2) return player.outputChatBox(`${Theme.Error}Info: ${Theme.Text}Utilizeaza /setadmin <id> <nivel>`);
        
        const target = mp.players.at(parseInt(args[0]));
        const level = parseInt(args[1]);
        
        if (!target) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Utilizatorul tinta nu a fost gasit.`);
        if (isNaN(level) || level < 0 || level > 5) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Nivel invalid (0-5).`);

        const db = (target as any).dbData;
        if (db) {
            db.adminLevel = level;
            await db.save();
            player.outputChatBox(`${Theme.Primary}Sistem: ${Theme.Text}Statutul lui ${Theme.Primary}${target.name} ${Theme.Text}a fost actualizat la ${Theme.Primary}Nivel ${level}${Theme.Text}.`);
            target.outputChatBox(`${Theme.Primary}Autoritate: ${Theme.Text}Accesul tau a fost modificat de ${Theme.Primary}${player.name} ${Theme.Text}la ${Theme.Primary}Nivel ${level}${Theme.Text}.`);
        }
    }
});
````

## File: src/server/commands/admin/SetWeather.ts
````typescript
import { register } from "../CommandRegistry";
import { Theme, AdminLevel } from "../../config/AdminLevels";
import { Logger } from "../../utils/Logger";

const VALID_WEATHERS = [
  "EXTRASUNNY",
  "CLEAR",
  "CLOUDS",
  "SMOG",
  "FOGGY",
  "OVERCAST",
  "RAIN",
  "THUNDER",
  "CLEARING",
  "NEUTRAL",
  "SNOW",
  "BLIZZARD",
  "SNOWLIGHT",
  "XMAS",
  "HALLOWEEN",
];

register({
  name: "weather",
  aliases: ["setweather", "sw"],
  description: "Schimba vremea globala pe server.",
  usage: "/weather <tip>",
  minAdmin: AdminLevel.Manager, // Level 4+
  execute: (player, args) => {
    if (args.length === 0) {
      return player.outputChatBox(
        `${Theme.Error}Folosire: /weather <tip>\n` +
          `${Theme.Secondary}Valide: ${VALID_WEATHERS.join(", ")}`
      );
    }

    const newWeather = args[0].toUpperCase();

    if (!VALID_WEATHERS.includes(newWeather)) {
      return player.outputChatBox(
        `${Theme.Error}Tip de vreme invalid! Incearca: ${Theme.Text}${VALID_WEATHERS.slice(0, 5).join(", ")}...`
      );
    }

        mp.world.weather = newWeather;

        // Forțăm actualizarea vizuală pe toți clienții (esențial pentru zăpadă)
        mp.players.call("client:setWeather", [newWeather]);

        // Notificare pentru admin
        player.outputChatBox(
            `${Theme.Success}Ai schimbat vremea globala in: ${Theme.Primary}${newWeather}`
        );

    // Log pentru audit
    Logger.warn(`[ADMIN] ${player.name} changed weather to ${newWeather}.`);
  },
});
````

## File: src/server/commands/admin/StopServer.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { AuthService } from "../../services/AuthService";
import { Logger } from "../../utils/Logger";

register({
    name: "stopserver",
    description: "Declanseaza procedura de inchidere securizata a serverului.",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player) => {
        mp.players.broadcast(`${Theme.Error}PROTOCOL DE INCHIDERE: ${Theme.Text}Serverul se dezactiveaza pentru mentenanta.`);
        Logger.warn(`INCHIDERE SERVER declansata de administratorul ${player.name}`);
        
        const players = mp.players.toArray();
        for (const p of players) {
            await AuthService.savePlayer(p);
        }
        
        setTimeout(() => process.exit(0), 1500);
    }
});
````

## File: src/server/commands/admin/Tp.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "tp",
  description: "Interventie rapida la coordonatele unui cetatean.",
  aliases: ["goto"],
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player, args) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Info: ${Theme.Text}Utilizeaza /tp <id>`
      );
    const target = mp.players.at(parseInt(args[0]));
    if (!target)
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Subiectul nu este conectat.`
      );

    player.position = target.position;
    player.outputChatBox(
      `${Theme.Primary}Securitate: ${Theme.Text}Te-ai deplasat la ${Theme.Primary}${target.name}.`
    );
  },
});

register({
  name: "tpm",
  description: "Teleportare la Waypoint-ul de pe hartă.",
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player) => {
    player.call("client:teleportToWaypoint");
    player.outputChatBox(
      `${Theme.Primary}Admin: ${Theme.Text}Se calculează ruta către Waypoint...`
    );
  },
});
````

## File: src/server/commands/admin/UserManagement.ts
````typescript
import { register } from "../CommandRegistry";
import { User } from "../../database/entities/User";
import { Character } from "../../database/entities/Character";
import { Theme, AdminLevel } from "../../config/AdminLevels";
import { Logger } from "../../utils/Logger";
import { PlayerUtils } from "../../utils/PlayerUtils";

// Helper pentru calcul sloturi (replicat din Auth/Character Handlers)
const calculateMaxSlots = (user: User) => {
  let maxSlots = user.characterSlots;
  if (user.accountPlayedTime >= 60000 && maxSlots < 2) maxSlots = 2;
  if (user.adminLevel >= AdminLevel.Owner) maxSlots = 3;
  return maxSlots;
};

// Helper formatare timp
const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

register({
  name: "userinfo",
  description: "Vezi detalii complete despre contul unui jucator.",
  usage: "/userinfo <nume_user>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 1)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /userinfo <username>`
      );

    const targetName = args[0];
    const user = await User.findOne({
      where: { username: targetName },
      relations: ["characters"],
    });

    if (!user)
      return player.outputChatBox(
        `${Theme.Error}Utilizatorul '${targetName}' nu a fost gasit.`
      );

    const calculatedSlots = calculateMaxSlots(user);

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}User Info: ${Theme.Text}${user.username} (ID: ${user.id})`
    );
    player.outputChatBox(
      `${Theme.Secondary}Admin Level: ${Theme.Text}${user.adminLevel}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Timp Jucat Cont: ${Theme.Text}${formatTime(user.accountPlayedTime)}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Sloturi: ${Theme.Text}${user.characterSlots} (DB) -> ${Theme.Success}${calculatedSlots} (Calculat)`
    );

    player.outputChatBox(
      `${Theme.Primary}Caractere (${user.characters.length}):`
    );
    user.characters.forEach((char) => {
      player.outputChatBox(
        `${Theme.Secondary}- [ID:${char.id}] ${Theme.Text}${char.firstName} ${char.lastName} ${Theme.Secondary}| ${formatTime(char.playedTime)} | ${char.updatedAt.toLocaleDateString()} ${char.updatedAt.toLocaleTimeString()}`
      );
    });
    player.outputChatBox(Theme.Divider);
  },
});

register({
  name: "setslots",
  description: "Seteaza numarul de baza de sloturi pentru un user.",
  usage: "/setslots <username> <slots>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 2)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /setslots <username> <numar>`
      );

    const targetName = args[0];
    const slots = parseInt(args[1]);

    if (isNaN(slots) || slots < 1)
      return player.outputChatBox(
        `${Theme.Error}Numarul de sloturi trebuie sa fie minim 1.`
      );

    const user = await User.findOneBy({ username: targetName });
    if (!user)
      return player.outputChatBox(
        `${Theme.Error}Utilizatorul nu a fost gasit.`
      );

    await User.update({ id: user.id }, { characterSlots: slots });

    player.outputChatBox(
      `${Theme.Success}Sloturile de baza pentru ${user.username} au fost setate la ${slots}.`
    );
    Logger.warn(
      `[ADMIN] ${player.name} set slots for ${user.username} to ${slots}.`
    );
  },
});

register({
  name: "deletechar",
  description: "Sterge permanent un caracter folosind ID-ul unic.",
  usage: "/deletechar <Character_ID>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 1)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /deletechar <Character_ID>`
      );

    const charId = parseInt(args[0]);
    if (isNaN(charId))
      return player.outputChatBox(
        `${Theme.Error}ID invalid. Trebuie sa fie un numar.`
      );

    const char = await Character.findOne({ where: { id: charId } });

    if (!char)
      return player.outputChatBox(
        `${Theme.Error}Caracterul cu ID ${charId} nu a fost gasit.`
      );

    const firstName = char.firstName;
    const lastName = char.lastName;

    // Verificăm dacă e online
    const targetPlayer = mp.players
      .toArray()
      .find((p) => p.data.characterId === char.id);

    if (targetPlayer) {
      targetPlayer.kick("Caracterul tau a fost sters de un administrator.");
      player.outputChatBox(`${Theme.Secondary}Jucatorul a fost deconectat.`);
    }

    await char.remove();

    player.outputChatBox(
      `${Theme.Success}Caracterul ${firstName} ${lastName} (ID: ${charId}) a fost sters permanent.`
    );
    Logger.warn(
      `[ADMIN] ${player.name} deleted character ID ${charId} (${firstName} ${lastName}).`
    );
  },
});
````

## File: src/server/commands/admin/Veh.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { number } from "framer-motion";

register({
  name: "veh",
  description: "Generarea unui vehicul guvernamental.",
  usage: "/veh <model>",
  aliases: ["v", "spawn", "car"],
  minAdmin: AdminLevel.Admin,
  execute: (player, args, _) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Info: ${Theme.Text}Utilizeaza /veh <model>`
      );
    try {
      const veh = mp.vehicles.new(mp.joaat(args[0]), player.position, {
        heading: player.heading,
        dimension: player.dimension,
        numberPlate: "Admin",
        locked: false,
        engine: true,
      });
      player.putIntoVehicle(veh, 0);
      player.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Unitatea ${Theme.Primary}${args[0]} ${Theme.Text}a fost alocata.`
      );
    } catch (e) {
      player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Modelul solicitat nu este valid.`
      );
    }
  },
});
````

## File: src/server/commands/admin/Weapon.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "giveweapon",
  aliases: ["weapon", "gun"],
  description: "Ofera o arma unui jucator specificat.",
  usage: "/giveweapon <id> <nume_arma> <munitie>",
  minAdmin: AdminLevel.Admin, // Level 2+ (Admin)
  category: "admin",
  execute: (player, args) => {
    // 1. Validare argumente (Avem nevoie de minim 3: ID, Nume, Gloanțe)
    if (args.length < 3) {
      return player.outputChatBox(
        `${Theme.Error}Folosire: ${Theme.Text}/giveweapon <id> <nume> <munitie>`
      );
    }

    const targetId = parseInt(args[0]);
    let weaponName = args[1].toLowerCase(); // "pistol", "ak47", "pump"
    const ammo = parseInt(args[2]);

    // 2. Găsire jucător
    const target = mp.players.at(targetId);
    if (!target || !mp.players.exists(target)) {
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`
      );
    }

    // 3. Logică "Smart Name"
    // Dacă adminul scrie "pistol", noi îl transformăm în "weapon_pistol"
    // GTA V recunoaște doar formatul cu "weapon_"
    if (!weaponName.startsWith("weapon_")) {
      weaponName = "weapon_" + weaponName;
    }

    // 4. Conversie String -> Hash (GTA V lucrează cu numere, nu cu text)
    // mp.joaat() face hashing-ul necesar (Jenkins One At A Time)
    const weaponHash = mp.joaat(weaponName);

    // 5. Acțiunea efectivă
    // giveWeapon(hash, ammo)
    target.giveWeapon(weaponHash, ammo);

    // 6. Feedback
    player.outputChatBox(
      `${Theme.Success}Succes: ${Theme.Text}I-ai dat ${Theme.Primary}${weaponName}${Theme.Text} lui ${target.name}.`
    );

    if (player !== target) {
      target.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Ai primit o armă de la ${player.name}.`
      );
    }
  },
});

register({
  name: "disarm",
  aliases: ["removeweapons", "rw", "clearweapons"],
  description: "Confisca toate armele unui jucator.",
  usage: "/disarm <id>",
  minAdmin: AdminLevel.Admin,
  category: "admin",
  execute: (player, args) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Folosire: ${Theme.Text}/disarm <id>`
      );

    const target = mp.players.at(parseInt(args[0]));

    if (!target || !mp.players.exists(target)) {
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`
      );
    }

    // Execuția: Șterge tot inventarul de arme
    target.removeAllWeapons();
    player.outputChatBox(
      `${Theme.Success}Succes: ${Theme.Text}L-ai dezarmat complet pe ${Theme.Primary}${target.name}.`
    );

    if (player !== target) {
      target.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Toate armele tale au fost confiscate de ${player.name}.`
      );
    }
  },
});
````

## File: src/server/commands/chat/RoleplayCommands.ts
````typescript
import { register } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

// /me - Actiune locala
register({
  name: "me",
  description: "Descrie o actiune facuta de personajul tau.",
  usage: "/me <actiune>",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `!{#C2A2DA}* ${player.name} ${fullText}`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /do - Descriere mediu/stare
register({
  name: "do",
  description: "Descrie o stare sau un detaliu al mediului.",
  usage: "/do <descriere>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `!{#C2A2DA}* ${fullText} (( ${player.name} ))`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /b - OOC Local
register({
  name: "b",
  description: "Chat Out-Of-Character (OOC) local.",
  usage: "/b <mesaj>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `${Theme.Secondary}(( [OOC] ${player.name}: ${fullText} ))`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /shout - Strigat
register({
  name: "shout",
  aliases: ["s"],
  description: "Striga ceva pentru a fi auzit la distanta mai mare.",
  usage: "/s <mesaj>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `${Theme.Text}${player.name} striga: ${fullText}!!`;
    mp.players.forEachInRange(player.position, 40, (p) => p.outputChatBox(msg));
  },
});
````

## File: src/server/commands/CommandManager.ts
````typescript
import fs from "fs";
import path from "path";
import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class CommandManager {
    static async loadCommands() {
        const commandsPath = __dirname;
        this.readDirRecursive(commandsPath);
        
        const commands = getAllCommands();
        Logger.info(`[CMD] Sistem Comenzi activ. ${commands.length} comenzi incarcate.`);
    }

    private static readDirRecursive(dir: string) {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                // Setăm categoria globală ca fiind numele folderului curent
                (global as any).currentLoadingCategory = item.toLowerCase();
                this.readDirRecursive(fullPath);
                (global as any).currentLoadingCategory = undefined; // Resetăm după ieșire
            } else if (item.endsWith(".js") && !item.includes("CommandManager") && !item.includes("CommandRegistry")) {
                try {
                    delete require.cache[require.resolve(fullPath)];
                    require(fullPath);
                } catch (e) {
                    Logger.error(`Eroare la incarcarea modulului ${item}:`, (e as any).message);
                }
            }
        }
    }

    static handleCommand(player: PlayerMp, message: string) {
        const args = message.split(" ");
        const trigger = args.shift()?.toLowerCase();
        if (!trigger) return;

        const cmd = findCommand(trigger);
        if (!cmd) {
            player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Comanda ${Theme.Primary}/${trigger}${Theme.Text} nu exista. Foloseste ${Theme.Primary}/help.`);
            return;
        }

        const user = PlayerUtils.getDb(player);
        if (!user && cmd.name !== "login" && cmd.name !== "register") {
            player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Autentificarea este obligatorie.`);
            return;
        }

        if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
            player.outputChatBox(`${Theme.Error}Securitate: ${Theme.Text}Nivel de acces insuficient.`);
            return;
        }

        try {
            cmd.execute(player, args, args.join(" "));
        } catch (e) {
            Logger.error(`Eroare executie /${cmd.name}:`, (e as any).stack);
            player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Procesare esuata.`);
        }
    }
}
````

## File: src/server/commands/CommandRegistry.ts
````typescript
export interface ICommand {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  minAdmin?: number;
  category?: string; // Acum este opțional, va fi completat de loader
  execute: (player: PlayerMp, args: string[], fullText: string) => void;
}

if (!(global as any).commandMap) {
  (global as any).commandMap = new Map<string, ICommand>();
  (global as any).aliasMap = new Map<string, string>();
}

const commands: Map<string, ICommand> = (global as any).commandMap;
const aliases: Map<string, string> = (global as any).aliasMap;

export function register(cmd: ICommand) {
  const mainName = cmd.name.toLowerCase();

  // Preluăm categoria din contextul global setat de manager în timpul încărcării
  if (!cmd.category && (global as any).currentLoadingCategory) {
    cmd.category = (global as any).currentLoadingCategory;
  }

  commands.set(mainName, cmd);

  if (cmd.aliases) {
    cmd.aliases.forEach((alias) => {
      aliases.set(alias.toLowerCase(), mainName);
    });
  }
}

export function findCommand(name: string): ICommand | undefined {
  const lowerName = name.toLowerCase();
  const mainName = aliases.get(lowerName) || lowerName;
  return commands.get(mainName);
}

export function getAllCommands(): ICommand[] {
  return Array.from(commands.values());
}
````

## File: src/server/commands/dev/Coords.ts
````typescript
import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "coords",
  aliases: ["pos", "copypos"],
  description:
    "Copiază coordonatele curente în Clipboard (Format JSON & Vector3).",
  minAdmin: AdminLevel.Moderator, // Sau Admin
  category: "dev",
  execute: (player) => {
    const pos = player.position;
    const rot = player.heading;

    // Construim obiectul de date
    const data = {
      x: Number(pos.x.toFixed(3)),
      y: Number(pos.y.toFixed(3)),
      z: Number(pos.z.toFixed(3)),
      h: Number(rot.toFixed(2)),
    };

    // Trimitem la client să rezolve copierea
    player.call("client:dev:copyCoords", [JSON.stringify(data)]);

    // Feedback vizual rapid
    player.outputChatBox(
      `${Theme.Primary}Dev: ${Theme.Text}Coordonate trimise către Clipboard.`
    );
  },
});
````

## File: src/server/commands/general/Creator.ts
````typescript
import { register } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

register({
    name: "creator",
    description: "Deschide creatorul de caractere pentru testare.",
    usage: "/creator",
    execute: (player) => {
        player.outputChatBox(`${Theme.Primary}Sistem: !{w}Se deschide creatorul de caractere...`);
        // Trimitem un event către client pentru a deschide UI-ul
        player.call("client:openCreator");
    }
});
````

## File: src/server/commands/general/Help.ts
````typescript
import { register, getAllCommands } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

register({
  name: "help",
  description: "Manualul de utilizare al sistemelor.",
  aliases: ["h", "commands"],
  execute: (player) => {
    const db = (player as any).dbData;
    const allCmds = getAllCommands();

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}CENTRUL DE AJUTOR ${Theme.Secondary}| ${Theme.Text}Sisteme Active`
    );

    const cats: Record<string, string[]> = {};
    allCmds.forEach((cmd) => {
      if (cmd.minAdmin && (!db || db.adminLevel < cmd.minAdmin)) return;
      const cat = cmd.category || "altele";
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(`${Theme.Text}/${cmd.name}`);
    });

    Object.keys(cats).forEach((cat) => {
      player.outputChatBox(
        `${Theme.Primary}» ${cat.toUpperCase()}: ${cats[cat].join(", ")}`
      );
    });
    player.outputChatBox(Theme.Divider);
  },
});
````

## File: src/server/commands/general/Stats.ts
````typescript
import { register } from "../CommandRegistry";
import { Theme, AdminConfig } from "../../config/AdminLevels";

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${Theme.Primary}${hours}${Theme.Text} ore și ${Theme.Primary}${minutes}${Theme.Text} minute`;
};

register({
  name: "stats",
  description: "Vizualizeaza rezumatul profilului tau digital.",
  aliases: ["profile"],
  execute: (player) => {
    const db = (player as any).dbData; // User entity
    const char = (player as any).activeCharacter; // Character entity
    
    if (!db) return;

    const adminInfo = AdminConfig[db.adminLevel as keyof typeof AdminConfig];

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}PROFIL UTILIZATOR ${Theme.Secondary}#${player.id} ${Theme.Primary}» ${Theme.Text}${player.name}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Nivel: ${Theme.Text}${db.level} ${Theme.Secondary}| Exp: ${Theme.Text}${db.exp}/10 ${Theme.Secondary}| Statut: ${adminInfo.color}${adminInfo.title}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Cash: ${
        Theme.Success
      }$${db.money.toLocaleString()} ${Theme.Secondary}| Banca: ${
        Theme.Success
      }$${db.bank.toLocaleString()}`
    );

    // Timp Jucat
    if (char) {
        player.outputChatBox(
            `${Theme.Secondary}Timp Jucat (Caracter): ${formatTime(char.playedTime || 0)}`
        );
    }
    
    player.outputChatBox(
        `${Theme.Secondary}Timp Jucat (Cont): ${formatTime(db.accountPlayedTime || 0)}`
    );

    player.outputChatBox(
      `${Theme.Secondary}Integritate: ${Theme.Error}${db.warns}/3 Avertismente`
    );
    player.outputChatBox(Theme.Divider);
  },
});
````

## File: src/server/config/AdminLevels.ts
````typescript
export enum AdminLevel {
    Player = 0,
    Moderator = 1,
    Admin = 2,
    SeniorAdmin = 3,
    Manager = 4,
    Owner = 5
}

export const Theme = {
    Primary: "!{#8B0000}",    // Roșu Închis (Branding)
    Secondary: "!{#A9A9A9}",  // Gri pentru detalii
    Text: "!{#E0E0E0}",       // Text principal
    Success: "!{#27AE60}",    // Verde premium
    Error: "!{#C0392B}",      // Roșu eroare
    Divider: "!{#333333}▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
};

export const AdminConfig = {
    [AdminLevel.Player]: { title: "Jucator", color: Theme.Text },
    [AdminLevel.Moderator]: { title: "Moderator", color: "!{#2E86C1}" }, // Steel Blue
    [AdminLevel.Admin]: { title: "Admin", color: "!{#17A589}" },        // Teal
    [AdminLevel.SeniorAdmin]: { title: "Sr. Admin", color: "!{#D4AC0D}" }, // Muted Gold
    [AdminLevel.Manager]: { title: "Manager", color: "!{#8E44AD}" },     // Amethyst
    [AdminLevel.Owner]: { title: "Owner", color: Theme.Primary }         // Dark Red
};
````

## File: src/server/database/entities/Character.ts
````typescript
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import type { User } from "./User";

// --- Interfețe pentru structura JSON ---

export interface CharacterParents {
    father: number;      // ID model tată
    mother: number;      // ID model mamă
    similarity: number;  // Mix genetic
    skin: number;        // Mix piele
}

export interface CharacterAppearance {
    parents: CharacterParents;
    features: number[];  // Array de 20 floats
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    // Putem extinde cu overlays (barbă, machiaj) în viitor
}

// Structură simplificată pentru haine de start
export interface CharacterClothes {
    top: number;
    legs: number;
    shoes: number;
}

@Entity("characters")
export class Character extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("User", "characters")
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column()
    userId!: number;

    @Column({ length: 50 })
    firstName!: string;

    @Column({ length: 50 })
    lastName!: string;

    @Column({ type: "int" }) // 0 = Male, 1 = Female
    gender!: number;

    @Column({ type: "int" })
    age!: number;

    @Column({ type: "int", default: 0 })
    playedTime!: number;

    // Stocăm structura JSON complexă pentru aspect
    @Column({ type: "simple-json" }) 
    appearance!: CharacterAppearance;

    // Stocăm hainele (pentru început simplu, poate fi extins)
    @Column({ type: "simple-json", nullable: true })
    clothes!: CharacterClothes;

    @Column({ type: "simple-json", nullable: true })
    lastPosition?: { x: number; y: number; z: number; dimension: number };

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
````

## File: src/server/database/entities/User.ts
````typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import type { Character } from "./Character";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany("Character", "user")
    characters!: Character[];

    @Column({ type: "varchar", length: 50, unique: true })
    username!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    email?: string;

    // --- Admin & Status ---
    @Column({ type: "int", default: 0 })
    adminLevel!: number;

    @Column({ type: "int", default: 0 })
    helperLevel!: number;

    @Column({ type: "int", default: 0 })
    vipLevel!: number;

    @Column({ type: "int", default: 1 })
    characterSlots!: number;

    // --- Stats ---
    @Column({ type: "int", default: 1 })
    level!: number;

    @Column({ type: "int", default: 0 })
    exp!: number;

    @Column({ type: "int", default: 0 })
    accountPlayedTime!: number;

    @Column({ type: "bigint", default: 10000, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    money!: number;

    @Column({ type: "bigint", default: 50000, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    bank!: number;

    // --- Character Status ---
    @Column({ type: "int", default: 100 })
    health!: number;

    @Column({ type: "int", default: 0 })
    armor!: number;

    @Column({ type: "int", default: 100 })
    hunger!: number;

    @Column({ type: "int", default: 100 })
    thirst!: number;

    // --- Job & Org ---
    @Column({ type: "int", default: 0 })
    jobId!: number;

    @Column({ type: "int", default: 0 })
    factionId!: number;

    @Column({ type: "int", default: 0 })
    factionRank!: number;

    // --- Persistence ---
    @Column({ type: "varchar", length: 255, default: '{"x": -425.5, "y": 1123.3, "z": 325.8}' })
    lastPos!: string;

    @Column({ type: "int", default: 0 })
    dimension!: number;

    // --- Sanctions ---
    @Column({ type: "int", default: 0 })
    warns!: number;

    @Column({ type: "int", default: 0 })
    isBanned!: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    banReason?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
````

## File: src/server/events/AuthHandlers.ts
````typescript
import { AuthService } from "../services/AuthService";
import { User } from "../database/entities/User";
import bcrypt from "bcryptjs";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { HUDUtils } from "../utils/HUDUtils";

mp.events.add(
  "auth:login",
  async (player: PlayerMp, username: string, pass: string) => {
    try {
      // 1. Încărcăm User-ul împreună cu lista de Caractere
      const user = await User.findOne({
        where: { username },
        relations: ["characters"],
      });

      if (!user || !(await bcrypt.compare(pass, user.password))) {
        return player.call("auth:response", [
          { success: false, error: "Nume sau parolă incorectă." },
        ]);
      }

      if (user.isBanned) {
        return player.call("auth:response", [
          { success: false, error: `Cont suspendat: ${user.banReason}` },
        ]);
      }

      // 2. Setăm datele pe player, dar NU SPWNĂM
      PlayerUtils.setDb(player, user);
      player.name = user.username;
      player.dimension = user.dimension; // Poate fi util, dar de obicei 0 sau un routing bucket specific

      // 3. Calculăm Sloturile Disponibile
      let maxSlots = user.characterSlots;

      // Bonus pentru timp jucat (1000 ore = 60000 minute)
      if (user.accountPlayedTime >= 60000 && maxSlots < 2) {
        maxSlots = 2;
      }

      // Bonus Admin
      if (user.adminLevel >= 5) {
        maxSlots = 3;
      }

      // 4. Pregătim lista simplificată de caractere pentru UI
      const characterList = user.characters.map((char) => ({
        id: char.id,
        firstName: char.firstName,
        lastName: char.lastName,
        level: char.level || 1, // Fallback dacă nu există field-ul level
        playedTime: char.playedTime || 0, // Adăugat Timp Jucat
        lastPlayed: char.updatedAt,
      }));

      // 5. Trimitem succes + lista + maxSlots
      player.call("auth:response", [{ success: true, characters: characterList, maxSlots }]);

      Logger.info(`[Auth] ${username} authenticated. Sending char selection (Slots: ${characterList.length}/${maxSlots}).`);
    } catch (e) {
      Logger.error("Auth Error:", (e as any).message);
      player.call("auth:response", [
        { success: false, error: "Eroare internă server." },
      ]);
    }
  }
);

mp.events.add(
  "auth:register",
  async (player: PlayerMp, username: string, pass: string, email: string) => {
    try {
      if (pass.length < 6)
        return player.call("auth:response", [
          { success: false, error: "Parola minim 6 caractere." },
        ]);

      const existing = await User.findOneBy({ username });
      if (existing)
        return player.call("auth:response", [
          { success: false, error: "Acest nume este deja folosit." },
        ]);

      const hashed = await bcrypt.hash(pass, 10);
      const userCount = await User.count();

      const newUser = new User();
      newUser.username = username;
      newUser.password = hashed;
      newUser.email = email;
      newUser.adminLevel = userCount === 0 ? 5 : 0;
      newUser.lastPos = JSON.stringify({ x: -425, y: 1123, z: 325 });

      await newUser.save();

      PlayerUtils.setDb(player, newUser);
      player.name = newUser.username;
      player.spawn(new mp.Vector3(-425, 1123, 325));

      player.call("auth:response", [{ success: true }]);

      // Trimitem datele HUD
      HUDUtils.update(player);

      Logger.info(`[Auth] Cont nou creat: ${username}`);
    } catch (e) {
      Logger.error("Register Error:", (e as any).message);
      player.call("auth:response", [
        { success: false, error: "Eroare la înregistrare." },
      ]);
    }
  }
);

// Ascultăm cererea HUD-ului de reîmprospătare (ex: la reload pagină)
mp.events.add("hud:request", (player: PlayerMp) => {
  HUDUtils.update(player);
});
````

## File: src/server/events/CharacterHandlers.ts
````typescript
import {
  CharacterManager,
  CharacterCreationData,
} from "../managers/CharacterManager";
import { Logger } from "../utils/Logger";
import { PlayerUtils } from "../utils/PlayerUtils";
import { HUDUtils } from "../utils/HUDUtils";
import { Character } from "../database/entities/Character";

mp.events.add("character:select", async (player: PlayerMp, charId: number) => {
  try {
    const user = PlayerUtils.getDb(player);
    if (!user) return; // Not logged in

    // Verificăm dacă caracterul aparține user-ului
    // Deoarece am încărcat user-ul cu relația 'characters' la login, putem verifica în memorie
    // SAU facem un query de siguranță (preferabil pentru consistență)
    const isValid = user.characters?.find((c) => c.id === charId);

    if (!isValid) {
      player.call("notification:show", ["Nu deții acest caracter!", "error"]);
      return;
    }

    Logger.info(`[Character] ${user.username} selected char ID ${charId}`);

    // Încărcăm caracterul (Spawn)
    await CharacterManager.load(player, charId);

    // Notificăm clientul că am intrat în joc (ascunde UI-ul de selecție, pornește HUD)
    player.call("client:enterGame");

    // Actualizăm HUD-ul
    HUDUtils.update(player);
  } catch (e) {
    Logger.error(`[Character] Select Error:`, e as any);
  }
});

mp.events.add(
  "character:create",
  async (player: PlayerMp, dataString: string) => {
    try {
      // Uneori clientul trimite obiect, alteori string. Verificăm.
      let data: CharacterCreationData;
      if (typeof dataString === "string") {
        data = JSON.parse(dataString);
      } else {
        data = dataString;
      }

      const user = PlayerUtils.getDb(player);
      if (!user) {
          player.call("character:create:response", [{ success: false, error: "Not Authenticated" }]);
          return;
      }

      // Validare Sloturi
      const currentCount = await Character.count({ where: { userId: user.id } });
      
      let maxSlots = user.characterSlots;
      if (user.accountPlayedTime >= 60000 && maxSlots < 2) maxSlots = 2;
      if (user.adminLevel >= 5) maxSlots = 3;

      if (currentCount >= maxSlots) {
          player.call("character:create:response", [{ success: false, error: "Nu mai ai sloturi disponibile!" }]);
          return;
      }

      Logger.info(
        `[CharCreator] Request from ${player.name}: Create ${data.info.firstName} ${data.info.lastName}`
      );

      const success = await CharacterManager.create(player, data);

      // Trimitem răspunsul către client (UI)
      // Clientul va primi un eveniment 'auth:response' pe care deja îl ascultă, sau facem unul dedicat.
      // În client/index.ts nu aveam un handler specific pentru create response, doar 'auth:response'.
      // Dar Character Creator e un modul separat.
      // Hai să trimitem un event specific pe care îl vom adăuga în client.
      player.call("character:create:response", [
        success
          ? { success: true }
          : { success: false, error: "Creation Failed" },
      ]);
    } catch (e) {
      Logger.error(
        `[CharCreator] Error parsing data from ${player.name}`,
        e as any
      );
      player.call("character:create:response", [
        { success: false, error: "Server Error" },
      ]);
    }
  }
);
````

## File: src/server/events/PlayerEvents.ts
````typescript
import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig, Theme } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { AuthService } from "../services/AuthService";
import { CharacterManager } from "../managers/CharacterManager";
import { TimeManager } from "../managers/TimeManager";

export class PlayerEvents {
  static init() {
    mp.events.add("playerJoin", async (player: PlayerMp) => {
      // Sincronizăm vremea curentă cu clientul
      player.call("client:setWeather", [mp.world.weather]);

      // const user = await User.findOneBy({ username: player.name });

      // UI-ul va prelua fluxul de autentificare

      Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
    });

    mp.events.add("playerChat", (player: PlayerMp, message: string) => {
      const db = PlayerUtils.getDb(player);
      if (!db) {
        player.outputChatBox(
          `${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`
        );
        return;
      }

      const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];

      // Format Premium: [Titlu] Nume (ID): Mesaj
      // Folosim Secondary (gri) pentru ID si paranteze pentru a nu incarca vizual
      const titlePrefix =
        db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
      const formattedMsg = `${titlePrefix}${Theme.Text}${player.name} ${Theme.Secondary}(${player.id})${Theme.Text}: ${Theme.Text}${message}`;

      // Proximity Chat optimizat (20 metri pentru realism)
      mp.players.forEachInRange(player.position, 20, (nearPlayer) => {
        nearPlayer.outputChatBox(formattedMsg);
      });

      Logger.info(`[CHAT] ${player.name}: ${message}`);
    });

    mp.events.add("playerCommand", (player: PlayerMp, message: string) => {
      CommandManager.handleCommand(player, message);
    });

    mp.events.add("playerQuit", async (player: PlayerMp, exitType: string) => {
      // 1. Extragem datele critic SINCRON (cât timp obiectul player este valid)
      const playerName = player.name;
      const pos = player.position; // Copiem vectorul
      const dimension = player.dimension;

      // Accesăm direct proprietățile atașate, evitând PlayerUtils.getDb care verifică exists()
      const user = (player as any).dbData as User;
      const char = (player as any).activeCharacter as Character; // Poate fi undefined dacă nu e spawnat
      const charId = player.data.characterId;

      // 2. Acum putem face operațiuni asincrone în siguranță folosind datele extrase

      // Salvăm timpul jucat
      if (user && char) {
        await TimeManager.forceSave(user, char);
      }

      // Salvăm poziția dacă era spawnat
      if (charId && pos) {
        await CharacterManager.savePositionData(
          charId,
          pos.x,
          pos.y,
          pos.z,
          dimension
        );
      }

      if (user) {
        // AuthService.savePlayer trebuie verificat dacă folosește player object.
        // Dacă da, ar trebui refăcut. Dar pentru moment, User e salvat de TimeManager.
        // Logger.info doar:
        Logger.info(`[QUIT] ${playerName} a parasit sesiunea.`);
      }
    });
  }
}
````

## File: src/server/globals.d.ts
````typescript
/// <reference types="@ragempcommunity/types-server" />

declare global {
    // Alias-uri utile
    type PlayerMp = import("@ragempcommunity/types-server").PlayerMp;
}
````

## File: src/server/index.ts
````typescript
import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./database/entities/User";
import { Character } from "./database/entities/Character";
import { UserService } from "./services/UserService";
import { Logger } from "./utils/Logger";
import { PlayerEvents } from "./events/PlayerEvents";
import "./events/AuthHandlers";
import "./events/CharacterHandlers";
import { CommandManager } from "./commands/CommandManager";
import * as dotenv from "dotenv";
import { TimeManager } from "./managers/TimeManager";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "roleplay",
  entities: [User, Character],
  synchronize: true,
  logging: false,
});

async function bootstrap() {
  try {
    Logger.info("Se inițializează serverul...");

    await AppDataSource.initialize();
    Logger.info("Conectat cu succes la MariaDB!");

    // Load Commands
    await CommandManager.loadCommands();

    // Init Managers
    TimeManager.init();

    // Init Events
    PlayerEvents.init();

    // Express API
    const app = express();
    app.use(express.json());

    app.get("/status", (req: any, res: any) => {
      res.json({ online: mp.players.length, uptime: process.uptime() });
    });

    // User API
    app.get("/api/users", async (req: any, res: any) => {
      const username = req.query.username as string;
      if (username) {
        const user = await UserService.getByUsername(username);
        return res.json(user ? [user] : []);
      }
      const users = await UserService.getAll();
      res.json(users);
    });

    app.get("/api/users/online", async (req: any, res: any) => {
      const players = await UserService.getOnlinePlayers();
      res.json(players);
    });

    app.get("/api/users/player/:id", (req: any, res: any) => {
      const target = mp.players.at(parseInt(req.params.id));
      if (!target)
        return res.status(404).json({ error: "Jucătorul nu este online" });

      const db = (target as any).dbData;
      if (!db)
        return res
          .status(404)
          .json({ error: "Jucătorul nu este autentificat" });

      res.json(db);
    });

    app.get("/api/users/top", async (req: any, res: any) => {
      const limit = parseInt(req.query.limit as string) || 10;
      const top = await UserService.getTopPlayers(limit);
      res.json(top);
    });

    app.get("/api/users/:id", async (req: any, res: any) => {
      const user = await UserService.getById(parseInt(req.params.id));
      if (!user)
        return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
      res.json(user);
    });

    app.patch("/api/users/:id", async (req: any, res: any) => {
      const user = await UserService.update(parseInt(req.params.id), req.body);
      if (!user)
        return res.status(404).json({
          error: "Eroare la actualizare sau utilizatorul nu a fost găsit",
        });
      res.json(user);
    });

    app.delete("/api/users/:id", async (req: any, res: any) => {
      const success = await UserService.delete(parseInt(req.params.id));
      if (!success)
        return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
      res.json({ success: true });
    });

    app.listen(3005, () => {
      Logger.info("API-ul Express ascultă pe portul 3005");
    });
  } catch (e) {
    Logger.error("Eroare la pornirea serverului:", (e as any).message);
  }
}

bootstrap();
````

## File: src/server/managers/CharacterManager.ts
````typescript
import {
  Character,
  CharacterAppearance,
  CharacterClothes,
} from "../database/entities/Character";
import { User } from "../database/entities/User";
import { Logger } from "../utils/Logger";

// DTO pentru datele venite de la Client (Character Creator UI)
export interface CharacterCreationData {
  info: {
    firstName: string;
    lastName: string;
    age: number;
    gender: number;
  };
  parents: {
    father: number;
    mother: number;
    similarity: number;
    skin: number;
  };
  features: number[];
  hair: {
    style: number;
    color: number;
    highlight: number;
  };
}

import { PlayerUtils } from "../utils/PlayerUtils";

// ... existing code ...

export class CharacterManager {
  // ... existing code ...

  public static async create(
    player: PlayerMp,
    data: CharacterCreationData
  ): Promise<boolean> {
    try {
      Logger.info(
        `[CharCreator] Validating name: First='${data.info.firstName}', Last='${data.info.lastName}'`
      );

      // 1. Validare Server-Side

      if (!this.isValidName(data.info.firstName)) {
        Logger.warn(`[CharCreator] Invalid FirstName: ${data.info.firstName}`);

        return false;
      }

      if (!this.isValidName(data.info.lastName)) {
        Logger.warn(`[CharCreator] Invalid LastName: ${data.info.lastName}`);

        return false;
      }

      // Găsim user-ul asociat folosind helper-ul corect

      const user = PlayerUtils.getDb(player);

      if (!user) {
        Logger.error(
          `[Character] User not found on player object for ${player.name} (dbData is missing)`
        );

        return false;
      }

      // ... rest of the function ...

      // 2. Construim obiectul de Appearance din datele plate venite de la UI
      const appearance: CharacterAppearance = {
        parents: data.parents,
        features: data.features,
        hair: data.hair,
      };

      // 3. Haine Default (Civil)
      const defaultClothes: CharacterClothes = {
        top: 1, // Tricou simplu
        legs: 1, // Blugi
        shoes: 1, // Adidași
      };

      // 4. Salvare DB
      const char = new Character();
      char.user = user; // TypeORM va gestiona relația
      char.userId = user.id;
      char.firstName = data.info.firstName;
      char.lastName = data.info.lastName;
      char.gender = data.info.gender;
      char.age = data.info.age;
      char.appearance = appearance;
      char.clothes = defaultClothes;

      await char.save();
      Logger.info(
        `[Character] Created ID ${char.id} for User ${user.username}`
      );

      // 5. Spawn & Apply
      await this.load(player, char.id);

      return true;
    } catch (error) {
      Logger.error(`[CharacterManager] Create Error:`, error as any);
      return false;
    }
  }

  /**
   * Încarcă un caracter din DB și îl aplică pe jucător (Spawn).
   */
  public static async load(
    player: PlayerMp,
    characterId: number
  ): Promise<void> {
    const char = await Character.findOne({ where: { id: characterId } });

    if (!char) {
      player.outputChatBox("!{sr}Eroare: !{w}Caracterul nu a fost găsit.");
      return;
    }

    // Setăm variabila pe player pentru a ști că e spawnat
    player.data.characterId = char.id;
    // Stocăm referința completă pentru acces rapid (ex: TimeManager)
    // Folosim (player as any) pentru a păstra instanța clasei (cu metodele save, remove etc.)
    // player.data serializează obiectul și pierde metodele!
    (player as any).activeCharacter = char;

    // player.name = `${char.firstName}_${char.lastName}`;

    // 1. Setare Model
    const modelName =
      char.gender === 0 ? "mp_m_freemode_01" : "mp_f_freemode_01";
    player.model = mp.joaat(modelName);

    // 2. Aplicare Aspect
    this.applyAppearance(player, char.appearance);

    // 3. Aplicare Haine (Basic implementation)
    // Definim niște haine default în funcție de gen dacă nu sunt setate
    if (char.gender === 0) {
      // Male
      player.setClothes(3, 15, 0, 0); // Torso
      player.setClothes(8, 15, 0, 0); // Undershirt
      player.setClothes(11, 15, 0, 0); // Top
      player.setClothes(4, 21, 0, 0); // Legs
      player.setClothes(6, 34, 0, 0); // Shoes
    } else {
      // Female
      player.setClothes(3, 15, 0, 0);
      player.setClothes(8, 15, 0, 0);
      player.setClothes(11, 15, 0, 0);
      player.setClothes(4, 21, 0, 0);
      player.setClothes(6, 35, 0, 0);
    }

    // Păr (Clothes ID 2)
    player.setClothes(2, char.appearance.hair.style, 0, 0);
    player.setHairColor(
      char.appearance.hair.color,
      char.appearance.hair.highlight
    );

    // 4. Teleport la Spawn (Ultima poziție sau Aeroport LS)
    if (
      char.lastPosition &&
      char.lastPosition.x !== 0 &&
      char.lastPosition.y !== 0
    ) {
      player.position = new mp.Vector3(
        char.lastPosition.x,
        char.lastPosition.y,
        char.lastPosition.z
      );
      player.heading = 0; // TypeORM nu stochează heading în structura curentă simplificată, putem adăuga sau lăsa 0
      player.dimension = char.lastPosition.dimension || 0;
    } else {
      player.position = new mp.Vector3(-1037.94, -2738.04, 20.169);
      player.heading = -37.0;
      player.dimension = 0;
    }

    player.health = 100;
    player.armour = 0;
  }

  /**
   * Salvează poziția curentă a caracterului în baza de date.
   */
  public static async savePosition(player: PlayerMp): Promise<void> {
    if (!player || !mp.players.exists(player) || !player.data.characterId)
      return;

    try {
      const pos = player.position;
      const dimension = player.dimension;
      await this.savePositionData(
        player.data.characterId,
        pos.x,
        pos.y,
        pos.z,
        dimension
      );
    } catch (e) {
      Logger.error(
        `[Character] Failed to save position for ${player.name}`,
        e as any
      );
    }
  }

  /**
   * Metodă sigură pentru salvarea poziției la Quit (nu depinde de obiectul player)
   */
  public static async savePositionData(
    charId: number,
    x: number,
    y: number,
    z: number,
    dimension: number
  ) {
    await Character.update(
      { id: charId },
      {
        lastPosition: { x, y, z, dimension },
      }
    );
  }

  private static applyAppearance(
    player: PlayerMp,
    app: CharacterAppearance
  ): void {
    // Parents & Skin
    player.setHeadBlend(
      app.parents.father,
      app.parents.mother,
      0,
      app.parents.father,
      app.parents.mother,
      0,
      app.parents.similarity,
      app.parents.skin,
      0.0
    );

    // Features
    if (app.features) {
      app.features.forEach((val, index) => player.setFaceFeature(index, val));
    }
  }

  private static isValidName(name: string): boolean {
    return /^[A-Z][a-zA-Z]+$/.test(name);
  }
}
````

## File: src/server/managers/TimeManager.ts
````typescript
import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";

export class TimeManager {
    // Interval de salvare în DB (minute)
    private static SAVE_INTERVAL_MINUTES = 5; 

    public static init() {
        Logger.info("[TimeManager] Service started.");

        // Rulează la fiecare minut (60.000 ms)
        setInterval(() => {
            this.processMinuteTick();
        }, 60000);
    }

    private static async processMinuteTick() {
        const now = new Date();
        const shouldSaveToDb = now.getMinutes() % this.SAVE_INTERVAL_MINUTES === 0;

        mp.players.forEach(async (player) => {
            if (!mp.players.exists(player)) return;

            const user = PlayerUtils.getDb(player);
            // Accesăm caracterul stocat pe player (vezi CharacterManager.load)
            const char = (player as any).activeCharacter as Character;

            // Verificăm dacă jucătorul este logat și spawnat
            if (user && char) {
                try {
                    // 1. Incrementăm în memorie
                    user.accountPlayedTime = (user.accountPlayedTime || 0) + 1;
                    char.playedTime = (char.playedTime || 0) + 1;

                    // 2. Salvăm în DB dacă e momentul
                    if (shouldSaveToDb) {
                        // Folosim update direct pentru a evita problemele cu relațiile TypeORM la save()
                        await User.update({ id: user.id }, { accountPlayedTime: user.accountPlayedTime });
                        await Character.update({ id: char.id }, { playedTime: char.playedTime });
                    }
                } catch (e) {
                    Logger.error(`[TimeManager] Error updating time for ${player.name}`, e as any);
                }
            }
        });
    }

    /**
     * Metodă publică pentru a forța salvarea entităților (ex: la deconectare)
     * Acceptă entitățile direct pentru a evita erorile de "Expired object".
     */
    public static async forceSave(user: User, char: Character) {
        if (user && char) {
            try {
                await User.update({ id: user.id }, { accountPlayedTime: user.accountPlayedTime });
                await Character.update({ id: char.id }, { playedTime: char.playedTime });
            } catch (e) {
                Logger.error(`[TimeManager] Quit Save Error`, e as any);
            }
        }
    }
}
````

## File: src/server/services/AuthService.ts
````typescript
import bcrypt from "bcryptjs";
import { User } from "../database/entities/User";
import { Logger } from "../utils/Logger";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class AuthService {
  static async register(player: PlayerMp, username: string, pass: string) {
    try {
      if (pass.length < 6) {
        return player.outputChatBox(
          `${Theme.Error}Securitate: ${Theme.Text}Parola este prea scurta (minim 6 caractere).`
        );
      }

      const existing = await User.findOneBy({ username });
      if (existing) {
        return player.outputChatBox(
          `${Theme.Error}Eroare: ${Theme.Text}Acest cont este deja inregistrat.`
        );
      }

      const hashed = await bcrypt.hash(pass, 10);
      const userCount = await User.count();

      const newUser = new User();
      newUser.username = username;
      newUser.password = hashed;
      newUser.adminLevel = userCount === 0 ? 5 : 0;

      await newUser.save();
      player.outputChatBox(
        `${Theme.Success}Succes: ${Theme.Text}Contul tau a fost creat. Te rugam sa folosesti ${Theme.Primary}/login <parola>`
      );
      Logger.info(`[AUTH] Utilizator nou: ${username}`);
    } catch (e) {
      Logger.error("Eroare inregistrare:", (e as any).message);
    }
  }

  static async login(player: PlayerMp, username: string, pass: string) {
    try {
      if (PlayerUtils.getDb(player)) {
        return player.outputChatBox(
          `${Theme.Error}Sistem: ${Theme.Text}Esti deja autentificat.`
        );
      }

      const user = await User.findOneBy({ username });
      if (!user) {
        return player.outputChatBox(
          `${Theme.Error}Eroare: ${Theme.Text}Numele de utilizator nu este valid.`
        );
      }

      if (user.isBanned) {
        player.outputChatBox(
          `${Theme.Error}RESTRICȚIONAT: ${Theme.Text}Acces interzis. Motiv: ${Theme.Primary}${user.banReason}`
        );
        return player.kick("Banned");
      }

      const match = await bcrypt.compare(pass, user.password);
      if (!match) {
        return player.outputChatBox(
          `${Theme.Error}Eroare: ${Theme.Text}Parola introdusa este incorecta.`
        );
      }

      PlayerUtils.setDb(player, user);
      player.name = user.username;

      const pos = JSON.parse(user.lastPos);
      player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
      player.dimension = user.dimension;
      player.health = user.health;
      player.armour = user.armor;

      player.outputChatBox(
        `${Theme.Success}Sistem: ${Theme.Text}Autentificare reusita. Bun venit, ${Theme.Primary}${username}!`
      );
      Logger.info(`[AUTH] ${username} s-a autentificat.`);
    } catch (e) {
      Logger.error("Eroare login:", (e as any).message);
    }
  }

  static async savePlayer(player: PlayerMp) {
    const user = PlayerUtils.getDb(player);
    if (!user || !mp.players.exists(player)) return;

    user.health = player.health;
    user.armor = player.armour;
    user.dimension = player.dimension;
    user.lastPos = JSON.stringify({
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
    });

    try {
      await user.save();
      Logger.info(
        `Progres salvat pentru ${user.username}. ${JSON.stringify(user)}`
      );
    } catch (e) {
      Logger.error(`Eroare salvare ${user.username}:`, (e as any).message);
    }
  }
}
````

## File: src/server/services/UserService.ts
````typescript
import { User } from "../database/entities/User";
import { AppDataSource } from "../index";
import { Logger } from "../utils/Logger";

export class UserService {
    static async getAll() {
        try {
            return await User.find();
        } catch (e) {
            Logger.error("UserService.getAll:", (e as any).message);
            return [];
        }
    }

    static async getById(id: number) {
        try {
            return await User.findOneBy({ id });
        } catch (e) {
            Logger.error("UserService.getById:", (e as any).message);
            return null;
        }
    }

    static async getByUsername(username: string) {
        try {
            return await User.findOneBy({ username });
        } catch (e) {
            Logger.error("UserService.getByUsername:", (e as any).message);
            return null;
        }
    }

    static async update(id: number, updates: Partial<User>) {
        try {
            const user = await User.findOneBy({ id });
            if (!user) return null;

            Object.assign(user, updates);
            return await user.save();
        } catch (e) {
            Logger.error("UserService.update:", (e as any).message);
            return null;
        }
    }

    static async delete(id: number) {
        try {
            const user = await User.findOneBy({ id });
            if (!user) return false;

            await user.remove();
            return true;
        } catch (e) {
            Logger.error("UserService.delete:", (e as any).message);
            return false;
        }
    }

    static async getOnlinePlayers() {
        const players: any[] = [];
        mp.players.forEach((player) => {
            const dbData = (player as any).dbData;
            players.push({
                id: player.id,
                name: player.name,
                dbId: dbData?.id,
                adminLevel: dbData?.adminLevel || 0,
                ping: player.ping
            });
        });
        return players;
    }

    static async getTopPlayers(limit: number = 10) {
        try {
            return await User.find({
                order: { level: "DESC", exp: "DESC" },
                take: limit
            });
        } catch (e) {
            Logger.error("UserService.getTopPlayers:", (e as any).message);
            return [];
        }
    }
}
````

## File: src/server/tsconfig.json
````json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["@ragempcommunity/types-server", "node", "./@types"],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*.ts"]
}
````

## File: src/server/utils/HUDUtils.ts
````typescript
import { PlayerUtils } from "../utils/PlayerUtils";

export class HUDUtils {
    /**
     * Trimite toate datele necesare HUD-ului către jucător.
     */
    static update(player: PlayerMp) {
        const user = PlayerUtils.getDb(player);
        if (!user) return;

        // Construim payload-ul cu date REALE din baza de date
        const data = {
            id: player.id,
            money: user.money, // Banii reali
            job: user.jobId === 0 ? "Șomer" : `Job #${user.jobId}`, // Placeholder pentru numele job-ului
            // Putem adăuga și bank, level, etc.
        };
        
        // Trimitem eventul către client, care îl va pasa la CEF
        player.call('hud:update', [data]);
    }
}
````

## File: src/server/utils/Logger.ts
````typescript
import fs from "fs";
import path from "path";

export class Logger {
    private static logFile = path.join(process.cwd(), "logs", "server.log");

    private static format(level: string, message: string): string {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return `${timestamp} [${level}]: ${message}`;
    }

    private static writeToFile(data: string) {
        if (!fs.existsSync(path.dirname(this.logFile))) {
            fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
        }
        fs.appendFileSync(this.logFile, data + "\n");
    }

    static info(message: string) {
        const msg = this.format("INFO", message);
        console.log("\x1b[32m" + msg + "\x1b[0m"); // Green
        this.writeToFile(msg);
    }

    static error(message: string, stack?: string) {
        const msg = this.format("ERROR", message + (stack ? `\n${stack}` : ""));
        console.log("\x1b[31m" + msg + "\x1b[0m"); // Red
        this.writeToFile(msg);
    }

    static warn(message: string) {
        const msg = this.format("WARN", message);
        console.log("\x1b[33m" + msg + "\x1b[0m"); // Yellow
        this.writeToFile(msg);
    }

    static cmd(message: string) {
        const msg = this.format("CMD", message);
        console.log("\x1b[36m" + msg + "\x1b[0m"); // Cyan
        this.writeToFile(msg);
    }
}
````

## File: src/server/utils/PlayerUtils.ts
````typescript
import { User } from "../database/entities/User";

export class PlayerUtils {
    static getDb(player: PlayerMp): User | undefined {
        if (!player || !mp.players.exists(player)) return undefined;
        return (player as any).dbData;
    }

    static setDb(player: PlayerMp, data: User | undefined) {
        if (!player || !mp.players.exists(player)) return;
        (player as any).dbData = data;
    }

    static updateDb(player: PlayerMp, updates: Partial<User>) {
        const db = this.getDb(player);
        if (db) {
            Object.assign(db, updates);
        }
    }
}
````

## File: src/web/@types/intex.d.ts
````typescript
declare global {
  interface PlayerMp {
    customProperty: number;

    customMethod(): void;
  }
}

export {};
````

## File: src/web/App.tsx
````typescript
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
  <div className="p-10 text-white font-bold text-2xl hidden">
    🏠 Home (Default Hidden)
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
````

## File: src/web/components/DevTools.tsx
````typescript
import React, { useState } from 'react';

/**
 * DevTools - Componentă vizibilă DOAR în browser (mod development).
 * Permite simularea evenimentelor care ar veni normal de la server/client RageMP.
 */
const DevTools: React.FC = () => {
    // Dacă suntem în RageMP, nu afișăm nimic.
    if (window.mp) return null;

    const [isOpen, setIsOpen] = useState(false);

    // Funcție helper pentru a simula un event de la server
    const simulateServerEvent = (eventName: string, data: any) => {
        console.log(`[DevTools] Simulating Server Event: ${eventName}`, data);
        if (window.EventManager && window.EventManager.receiveFromServer) {
            window.EventManager.receiveFromServer(eventName, data);
        } else {
            console.error("EventManager nu este gata!");
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-mono text-sm"
            >
                {isOpen ? 'Close DevTools' : '🛠️ Open DevTools'}
            </button>

            {isOpen && (
                <div className="bg-gray-800 border border-gray-700 p-4 mt-2 rounded-lg shadow-xl w-64 text-white">
                    <h3 className="text-sm font-bold border-b border-gray-600 pb-2 mb-2 text-gray-300">
                        Simulare Navigare
                    </h3>
                    
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/login', data: { error: '' } })}
                            className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Login
                        </button>
                        
                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/login', data: { error: 'Parola greșită (Test)' } })}
                            className="bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Login (cu Eroare)
                        </button>

                        <button
                            onClick={() => {
                                simulateServerEvent('navigateTo', { route: '/game' });
                                setTimeout(() => {
                                    simulateServerEvent('hud:update', { money: 999500, id: 1, job: 'Polițist' });
                                }, 500);
                            }}
                            className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Game HUD
                        </button>

                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/char-creator' })}
                            className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Char Creator
                        </button>

                        <button
                            onClick={() => simulateServerEvent('hud:update', { money: Math.floor(Math.random() * 100000) })}
                            className="bg-teal-600 hover:bg-teal-500 px-3 py-1 rounded text-xs text-left"
                        >
                            🔄 Update Money Random
                        </button>

                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/' })}
                            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Clear / Home
                        </button>
                    </div>

                    <div className="mt-4 text-[10px] text-gray-500">
                        Acest panou nu apare în joc.
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevTools;
````

## File: src/web/components/HUD.tsx
````typescript
import React, { useEffect, useState } from "react";
import EventManager from "../utils/EventManager";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Wallet, Briefcase, User, MapPin, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface HUDStats {
  id: number;
  money: number;
  job: string;
  serverName?: string;
}

const HUD: React.FC = () => {
  const [stats, setStats] = useState<HUDStats>({
    id: 0,
    money: 0,
    job: "Civil",
    serverName: "BATTLEGROUNDS",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);

    const handleUpdate = (data: Partial<HUDStats>) => {
      setStats((prev) => ({ ...prev, ...data }));
    };

    EventManager.on("hud:update", handleUpdate);
    EventManager.triggerServer("hud:request");

    return () => {
      clearTimeout(timer);
      EventManager.off("hud:update", handleUpdate);
    };
  }, []);

  const formattedMoney = new Intl.NumberFormat("en-US").format(stats.money);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={containerVariants}
          className="fixed top-6 right-6 flex flex-col items-end gap-3 pointer-events-none select-none font-sans"
        >
          {/* Server Name Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-2"
          >
            <div className="flex flex-col items-end">
              <span className="text-zinc-100 font-black italic tracking-widest text-xl drop-shadow-md leading-none">
                {stats.serverName}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] bg-zinc-950/80 px-2 py-0.5 rounded-full border border-zinc-800">
                <Target className="w-3 h-3 text-red-500" />
                ROLEPLAY
              </div>
            </div>
          </motion.div>

          {/* Money Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-l from-zinc-900/95 to-zinc-950/80 p-3 pr-5 rounded-l-xl border-r-4 border-green-500 shadow-xl flex items-center gap-4 min-w-[200px] justify-end group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-green-500/80 uppercase font-bold tracking-wider">
                Cash Balance
              </span>
              <span className="text-white font-bold text-2xl font-mono tracking-tight group-hover:text-green-400 transition-colors drop-shadow-sm">
                $ {formattedMoney}
              </span>
            </div>
            <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
          </motion.div>

          {/* Job Card */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-900/80 p-2 pr-4 rounded-l-lg border-r-2 border-orange-500/50 shadow-lg flex items-center gap-3 min-w-[160px] justify-end"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                Occupation
              </span>
              <span className="text-zinc-100 font-semibold text-sm">
                {stats.job}
              </span>
            </div>
            <div className="bg-orange-500/10 p-1.5 rounded-md border border-orange-500/20">
              <Briefcase className="w-4 h-4 text-orange-500" />
            </div>
          </motion.div>

          {/* ID Card */}
          <motion.div variants={itemVariants} className="flex gap-2">
            <div className="bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-700 shadow-lg flex items-center gap-2">
              <User className="w-3 h-3 text-zinc-400" />
              <span className="text-zinc-200 font-bold text-sm font-mono">
                ID: <span className="text-white">{stats.id}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HUD;
````

## File: src/web/components/ui/button.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
````

## File: src/web/components/ui/input.tsx
````typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
````

## File: src/web/components/ui/NotificationSystem.tsx
````typescript
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
}

// Configurație globală pentru poziție
const DEFAULT_POSITION: NotificationPosition = 'top-right';

const NotificationContext = createContext<{
    addNotification: (n: Omit<Notification, 'id'>) => void;
    position: NotificationPosition;
    setPosition: (pos: NotificationPosition) => void;
} | null>(null);

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [position, setPosition] = useState<NotificationPosition>(DEFAULT_POSITION);

    const addNotification = (n: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prev) => {
            // Dacă suntem sus, adăugăm la început (stack down). Dacă suntem jos, la sfârșit (stack up) - sau invers depinde de flex direction
            // Pentru simplitate, adăugăm mereu în array, și gestionăm ordinea vizuală din CSS (flex-col vs flex-col-reverse)
            return [...prev, { ...n, id }];
        });

        if (n.duration !== 0) {
            setTimeout(() => {
                removeNotification(id);
            }, n.duration || 5000);
        }
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    useEffect(() => {
        (window as any).triggerNotification = (type: NotificationType, title: string, message: string, duration: number = 5000) => {
            addNotification({ type, title, message, duration });
        };
        
        // Permitem schimbarea poziției din client (opțional)
        (window as any).setNotificationPosition = (pos: NotificationPosition) => {
            setPosition(pos);
        };
    }, []);

    // Clase pentru poziționarea containerului
    const positionClasses: Record<NotificationPosition, string> = {
        'top-left': 'top-10 left-10 flex-col',
        'top-right': 'top-10 right-10 flex-col',
        'bottom-left': 'bottom-10 left-10 flex-col-reverse',
        'bottom-right': 'bottom-10 right-10 flex-col-reverse',
        'top-center': 'top-10 left-1/2 -translate-x-1/2 flex-col',
        'bottom-center': 'bottom-10 left-1/2 -translate-x-1/2 flex-col-reverse',
    };

    return (
        <NotificationContext.Provider value={{ addNotification, position, setPosition }}>
            {children}
            <div className={cn("fixed z-[100] flex gap-3 pointer-events-none", positionClasses[position])}>
                <AnimatePresence mode='popLayout'>
                    {notifications.map((n) => (
                        <NotificationItem 
                            key={n.id} 
                            {...n} 
                            position={position}
                            onClose={() => removeNotification(n.id)} 
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};

const NotificationItem: React.FC<Notification & { onClose: () => void, position: NotificationPosition }> = ({ type, title, message, onClose, position }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-orange-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    // Eliminat backdrop-blur, crescut opacitatea background-ului
    const typeStyles = {
        success: "border-emerald-500/30 bg-zinc-950/95", // Darker background, no blur
        error: "border-red-500/30 bg-zinc-950/95",
        warning: "border-orange-500/30 bg-zinc-950/95",
        info: "border-blue-500/30 bg-zinc-950/95"
    };

    // Calculăm direcția animației în funcție de poziție
    let initialX = 0;
    let initialY = 0;

    if (position.includes('left')) initialX = -50;
    else if (position.includes('right')) initialX = 50;
    else if (position.includes('top')) initialY = -20;
    else initialY = 20;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className={cn(
                "pointer-events-auto w-[350px] p-4 rounded-xl border shadow-2xl flex gap-3 relative overflow-hidden",
                typeStyles[type]
            )}
        >
            {/* Colored Accent Line */}
            <div className={cn("absolute top-0 left-0 w-1 h-full", 
                type === 'success' ? 'bg-emerald-500' : 
                type === 'error' ? 'bg-red-500' : 
                type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
            )} />

            <div className="mt-1 shrink-0">
                {icons[type]}
            </div>
            
            <div className="flex-1 mr-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed font-medium">{message}</p>
            </div>

            <button onClick={onClose} className="shrink-0 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};
````

## File: src/web/index.css
````css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* BATTLEGROUNDS THEME: Gunmetal & Lava Orange */
    
    /* Fundal: Slate-950 (Gri foarte închis, metalic) */
    --background: 222.2 47.4% 11.2%; 
    --foreground: 210 40% 98%;

    /* Carduri: Zinc-900 */
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    /* ACCENT PRINCIPAL: Intense Red-Orange (ex: #ea580c) */
    --primary: 20 90% 55%; 
    --primary-foreground: 0 0% 100%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    /* Borduri metalice */
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 20 90% 55%; /* Inelul de focus e portocaliu */

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-transparent text-foreground;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    overflow: hidden;
  }
}

.text-shadow-sm {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
.text-shadow-md {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}
````

## File: src/web/index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Battlegrounds RP</title>
  </head>
  <body class="bg-transparent overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
````

## File: src/web/index.tsx
````typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore
import "./index.css"; // Vom crea și un fișier CSS basic

import "./utils/EventManager";
import "./utils/ClipboardManager";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
````

## File: src/web/lib/utils.ts
````typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
````

## File: src/web/pages/auth/Login.tsx
````typescript
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
````

## File: src/web/pages/char-creator/CharacterCreator.tsx
````typescript
import React, { useState, useEffect } from 'react';
import EventManager from '../../utils/EventManager';
import { 
    Dna, 
    User, 
    Palette, 
    Scissors, 
    CheckCircle, 
    RotateCcw, 
    ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Window Type Extensions ---
declare global {
    interface Window {
        mp?: {
            trigger: (event: string, data?: string) => void;
        };
        triggerNotification?: (type: string, title: string, message: string, duration?: number) => void;
    }
}

// --- Types ---
interface CharacterData {
    parents: {
        father: number;
        mother: number;
        similarity: number;
        skin: number;
    };
    features: number[];
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    info: {
        firstName: string;
        lastName: string;
        age: number;
        gender: number; // 0 = Male, 1 = Female
    };
}

// Mapare Trăsături Faciale GTA V (0-19)
const FEATURE_NAMES = [
    "Nose Width", "Nose Peak Height", "Nose Length", "Nose Bone Height", "Nose Peak Lowering", "Nose Bone Twist",
    "Eyebrow Height", "Eyebrow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth",
    "Eye Squint", "Lip Thickness", "Jaw Width", "Jaw Height", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"
];

const CharacterCreator: React.FC = () => {
    // --- State ---
    const [activeTab, setActiveTab] = useState<'genealogy' | 'features' | 'style' | 'identity'>('identity');
    
    const [data, setData] = useState<CharacterData>({
        parents: { father: 0, mother: 21, similarity: 0.5, skin: 0.5 },
        features: Array(20).fill(0),
        hair: { style: 0, color: 0, highlight: 0 },
        info: { firstName: "", lastName: "", age: 18, gender: 0 }
    });

    // --- Handlers ---

    // 1. Update Parents
    const updateParents = (key: keyof typeof data.parents, value: number) => {
        const newParents = { ...data.parents, [key]: value };
        setData(prev => ({ ...prev, parents: newParents }));
        // Trimitem la CLIENT (local) pentru preview instant
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'parents', data: newParents }));
    };

    // 2. Update Features
    const updateFeature = (index: number, value: number) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData(prev => ({ ...prev, features: newFeatures }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'features', data: newFeatures }));
    };

    // 3. Update Hair
    const updateHair = (key: keyof typeof data.hair, value: number) => {
        const newHair = { ...data.hair, [key]: value };
        setData(prev => ({ ...prev, hair: newHair }));
        if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'hair', data: newHair }));
    };

    // 4. Update Info & Gender
    const updateInfo = (key: keyof typeof data.info, value: string | number) => {
        const newInfo = { ...data.info, [key]: value };
        setData(prev => ({ ...prev, info: newInfo }));
        
        // Dacă schimbăm genul, trebuie să resetăm hainele/părul pe server
        if (key === 'gender') {
            if (window.mp) window.mp.trigger('char:previewUpdate', JSON.stringify({ type: 'gender', data: value }));
        }
    };

    // 5. Save Character
    const handleSave = () => {
        if (data.info.firstName.length < 3) {
            if (window.triggerNotification) window.triggerNotification('error', 'Validare', 'Prenumele trebuie să aibă minim 3 litere.');
            return;
        }
        if (data.info.lastName.length < 3) {
            if (window.triggerNotification) window.triggerNotification('error', 'Validare', 'Numele trebuie să aibă minim 3 litere.');
            return;
        }
        
        // Notificăm utilizatorul că se procesează
        if (window.triggerNotification) window.triggerNotification('info', 'Procesare', 'Se creează identitatea...', 2000);
        
        EventManager.triggerServer('character:create', JSON.stringify(data));
    };

    // Fix Focus pentru RageMP
    useEffect(() => {
        const container = document.getElementById('char-creator-container');
        if (container) container.focus();
    }, []);

    // Camera Control Logic
    useEffect(() => {
        let cameraTarget = 'default';
        switch (activeTab) {
            case 'genealogy':
            case 'features':
            case 'style':
                cameraTarget = 'head';
                break;
            case 'identity':
            default:
                cameraTarget = 'default';
                break;
        }
        if (window.mp) window.mp.trigger('char:cameraFocus', cameraTarget);
    }, [activeTab]);

    // --- Render Helpers ---

    const renderSlider = (label: string, value: number, min: number, max: number, step: number, onChange: (val: number) => void) => (
        <div className="mb-4 group">
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1 group-hover:text-orange-500 transition-colors">
                <span>{label}</span>
                <span className="font-mono text-zinc-300">{value.toFixed(step === 1 ? 0 : 2)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600 hover:accent-orange-500"
            />
        </div>
    );

    return (
        <div 
            id="char-creator-container"
            tabIndex={0}
            className="absolute inset-0 z-50 flex h-screen w-screen overflow-hidden text-white selection:bg-orange-500/30 outline-none"
        >
            
            {/* --- LEFT SIDEBAR (Menu) --- */}
            <div className="w-[300px] h-full bg-zinc-950 border-r border-white/5 flex flex-col">
                
                {/* Header */}
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-2xl font-black italic tracking-tighter text-zinc-100">
                        IDENTITY<span className="text-orange-600">LAB</span>
                    </h1>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                        Character Creation Suite
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4 space-y-1">
                    <NavButton 
                        active={activeTab === 'identity'} 
                        onClick={() => setActiveTab('identity')}
                        icon={<User className="w-4 h-4" />}
                        label="Identitate & Gen"
                    />
                    <NavButton 
                        active={activeTab === 'genealogy'} 
                        onClick={() => setActiveTab('genealogy')}
                        icon={<Dna className="w-4 h-4" />}
                        label="Genealogie"
                    />
                    <NavButton 
                        active={activeTab === 'features'} 
                        onClick={() => setActiveTab('features')}
                        icon={<Palette className="w-4 h-4" />}
                        label="Trăsături Faciale"
                    />
                    <NavButton 
                        active={activeTab === 'style'} 
                        onClick={() => setActiveTab('style')}
                        icon={<Scissors className="w-4 h-4" />}
                        label="Păr & Stil"
                    />
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-white/5 bg-zinc-900/50">
                    <Button 
                        onClick={handleSave}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest uppercase h-12 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Finalizare
                    </Button>
                </div>
            </div>

            {/* --- CENTER (Transparent 3D View) --- */}
            <div className="flex-1 relative pointer-events-none">
                {/* Overlay guides */}
                <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-orange-500/50"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-orange-500/50"></div>
            </div>

            {/* --- RIGHT PANEL (Controls) --- */}
            <div className="absolute right-10 top-10 w-[350px] bg-zinc-950 border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[calc(100vh-80px)]">
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 to-red-600"></div>
                
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-200">
                        {activeTab === 'genealogy' && "Genetic Heritage"}
                        {activeTab === 'features' && "Facial Structure"}
                        {activeTab === 'style' && "Grooming"}
                        {activeTab === 'identity' && "Civilian Data"}
                    </h2>
                    <RotateCcw className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-white transition-colors" />
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    
                    {/* 1. IDENTITY TAB */}
                    {activeTab === 'identity' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button 
                                    onClick={() => updateInfo('gender', 0)}
                                    className={cn(
                                        "h-24 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                        data.info.gender === 0 
                                            ? "border-orange-500 bg-orange-500/10 text-white" 
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600"
                                    )}
                                >
                                    <User className="w-8 h-8" />
                                    <span className="text-xs font-bold uppercase">Masculin</span>
                                </button>
                                <button 
                                    onClick={() => updateInfo('gender', 1)}
                                    className={cn(
                                        "h-24 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                        data.info.gender === 1 
                                            ? "border-orange-500 bg-orange-500/10 text-white" 
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600"
                                    )}
                                >
                                    <User className="w-8 h-8" />
                                    <span className="text-xs font-bold uppercase">Feminin</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Prenume</label>
                                    <Input 
                                        className="bg-zinc-900 border-zinc-700 focus-visible:ring-orange-500"
                                        placeholder="Ex: Ion"
                                        value={data.info.firstName}
                                        onChange={(e) => updateInfo('firstName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Nume de Familie</label>
                                    <Input 
                                        className="bg-zinc-900 border-zinc-700 focus-visible:ring-orange-500"
                                        placeholder="Ex: Popescu"
                                        value={data.info.lastName}
                                        onChange={(e) => updateInfo('lastName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500">Vârstă ({data.info.age} ani)</label>
                                    <input 
                                        type="range" min={18} max={90} step={1}
                                        value={data.info.age}
                                        onChange={(e) => updateInfo('age', parseInt(e.target.value))}
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. GENEALOGY TAB */}
                    {activeTab === 'genealogy' && (
                        <>
                            {renderSlider("ADN Tată", data.parents.father, 0, 45, 1, (v) => updateParents('father', v))}
                            {renderSlider("ADN Mamă", data.parents.mother, 0, 45, 1, (v) => updateParents('mother', v))}
                            <div className="h-[1px] bg-white/5 my-4"></div>
                            {renderSlider("Asemănare Genetică", data.parents.similarity, 0.0, 1.0, 0.05, (v) => updateParents('similarity', v))}
                            {renderSlider("Nuanta Pielii", data.parents.skin, 0.0, 1.0, 0.05, (v) => updateParents('skin', v))}
                        </>
                    )}

                    {/* 3. FEATURES TAB */}
                    {activeTab === 'features' && (
                        <div className="space-y-1">
                            {FEATURE_NAMES.map((name, idx) => (
                                <div key={idx}>
                                    {renderSlider(name, data.features[idx], -1.0, 1.0, 0.05, (val) => updateFeature(idx, val))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 4. STYLE TAB */}
                    {activeTab === 'style' && (
                        <>
                            {renderSlider("Stil Păr", data.hair.style, 0, 75, 1, (v) => updateHair('style', v))}
                            {renderSlider("Culoare Principală", data.hair.color, 0, 63, 1, (v) => updateHair('color', v))}
                            {renderSlider("Suvițe / Highlight", data.hair.highlight, 0, 63, 1, (v) => updateHair('highlight', v))}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

// Internal Component for Sidebar Buttons
const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-l-2",
            active 
                ? "bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500 text-white" 
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
        )}
    >
        <div className="flex items-center gap-3">
            <span className={active ? "text-orange-500" : "text-zinc-600"}>{icon}</span>
            {label}
        </div>
        {active && <ChevronRight className="w-4 h-4 text-orange-500" />}
    </button>
);

export default CharacterCreator;
````

## File: src/web/pages/char-selector/CharacterSelector.tsx
````typescript
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Plus, Play, Calendar, Shield, Clock, Hourglass, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import EventManager from "../../utils/EventManager";

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  level: number;
  playedTime: number; // Minute
  lastPlayed: string;
}

const CharacterSelector: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Preluăm datele din state-ul de navigare
  const characters: Character[] = (location.state as any)?.characters || [];
  const maxSlots: number = (location.state as any)?.maxSlots || 1;

  const usedSlots = characters.length;
  const canCreate = usedSlots < maxSlots;

  const handleSelect = (charId: number) => {
    EventManager.triggerServer("character:select", charId);
  };

  const handleCreateNew = () => {
    if (!canCreate) return;
    EventManager.trigger("client:requestCreator");
  };

  // Helper pentru formatare ore
  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 Hr" : `${hours} Hrs`;
  };

  // Variabile pentru animație
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white overflow-hidden relative selection:bg-orange-500/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center p-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold tracking-widest uppercase">
                <Shield size={12} />
                Secure Connection
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold tracking-widest uppercase">
                <span>Slots:</span>
                <span className={canCreate ? "text-green-400" : "text-red-400"}>{usedSlots} / {maxSlots}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Select Identity
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">
            Choose your operative to proceed to Los Santos
          </p>
        </motion.div>

        {/* Grid de Caractere */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {/* Carduri Caractere Existente */}
          {characters.map((char) => (
            <motion.div
              key={char.id}
              variants={itemVariants}
              className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 rounded-lg overflow-hidden backdrop-blur-sm"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                    <User size={24} />
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-zinc-500 uppercase tracking-wider">Level</span>
                    <span className="text-xl font-bold text-white">{char.level}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {char.firstName} <span className="text-zinc-500">{char.lastName}</span>
                </h3>

                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock size={12} />
                        <span>Last seen: {new Date(char.lastPlayed).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Hourglass size={12} />
                        <span>Playtime: {formatHours(char.playedTime)}</span>
                    </div>
                </div>

                <Button
                  onClick={() => handleSelect(char.id)}
                  className="w-full bg-zinc-100 text-zinc-950 hover:bg-orange-500 hover:text-white transition-all font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  Deploy
                </Button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zinc-800/20 to-transparent -mr-8 -mt-8 rotate-45 group-hover:from-orange-500/20 transition-all" />
            </motion.div>
          ))}

          {/* Card "New Identity" - Condiționat de sloturi */}
          <motion.div
            variants={itemVariants}
            onClick={handleCreateNew}
            className={`group relative border transition-all duration-300 rounded-lg flex flex-col items-center justify-center min-h-[280px]
                ${canCreate 
                    ? "cursor-pointer bg-zinc-900/30 border-dashed border-zinc-700 hover:border-orange-500 hover:bg-zinc-900/50" 
                    : "cursor-not-allowed bg-zinc-950/50 border-zinc-800 opacity-60 grayscale"
                }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mb-4 shadow-lg shadow-black/50
                ${canCreate 
                    ? "bg-zinc-800 text-zinc-500 group-hover:bg-orange-500 group-hover:text-white" 
                    : "bg-zinc-900 text-red-900/50 border border-zinc-800"
                }`}>
              {canCreate ? <Plus size={32} /> : <Lock size={32} />}
            </div>
            
            <h3 className={`text-lg font-bold transition-colors uppercase tracking-wide
                ${canCreate ? "text-zinc-300 group-hover:text-white" : "text-zinc-600"}`}>
              {canCreate ? "New Identity" : "Max Limit Reached"}
            </h3>
            
            <p className="text-xs text-zinc-500 mt-2 text-center px-8">
              {canCreate 
                ? "Create a new dossier for tactical operations."
                : "Increase your playtime or rank to unlock more slots."}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSelector;
````

## File: src/web/pages/GameInterface.tsx
````typescript
import React from "react";
import HUD from "../components/HUD";

const GameInterface: React.FC = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* Pointer events none ca să putem da click prin UI în joc, 
                dar HUD-ul poate reactiva pointer-events dacă e interactiv */}
      <HUD />

      {/* Aici vor veni Speedometer, etc. */}
    </div>
  );
};

export default GameInterface;
````

## File: src/web/tsconfig.json
````json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["@ragempcommunity/types-cef", "node"],
    "baseUrl": "./",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["./**/*.ts"]
}
````

## File: src/web/utils/ClipboardManager.ts
````typescript
class ClipboardManager {
  private static instance: ClipboardManager;

  private constructor() {
    this.initializeGlobalExpose();
  }

  public static getInstance(): ClipboardManager {
    if (!ClipboardManager.instance) {
      ClipboardManager.instance = new ClipboardManager();
    }
    return ClipboardManager.instance;
  }

  /**
   * Expune funcția în window pentru a putea fi apelată din client via browser.execute()
   */
  private initializeGlobalExpose() {
    (window as any).copyToClipboard = (content: string) => {
      this.handleCopyRequest(content);
    };
    console.log("[ClipboardManager] Service initialized.");
  }

  /**
   * Logica efectivă de copiere
   */
  private async handleCopyRequest(jsonStr: string) {
    try {
      // Parsăm pentru a formata frumos, dacă e JSON
      let finalString = jsonStr;
      try {
        const data = JSON.parse(jsonStr);
        // Detectăm dacă e un obiect de coordonate (are x, y, z)
        if (
          data.x !== undefined &&
          data.y !== undefined &&
          data.z !== undefined
        ) {
          const vec3 = `new mp.Vector3(${data.x}, ${data.y}, ${data.z})`;
          const heading = data.h !== undefined ? ` // H: ${data.h}` : "";
          finalString = `${vec3}${heading}`;
        }
      } catch (e) {
        // Nu e JSON, copiem string-ul raw
      }

      // Metoda veche (ExecCommand) - Cea mai sigură pentru CEF/RageMP
      // Navigator.clipboard API e adesea blocat în medii non-secure (http) sau fără user interaction
      const el = document.createElement("textarea");
      el.value = finalString;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      // Notificare vizuală
      if ((window as any).triggerNotification) {
        (window as any).triggerNotification(
          "success",
          "DevTools",
          "Coordonate copiate în Clipboard!"
        );
      }
    } catch (err) {
      console.error("[ClipboardManager] Failed to copy:", err);
      if ((window as any).triggerNotification) {
        (window as any).triggerNotification(
          "error",
          "DevTools",
          "Eroare la copiere."
        );
      }
    }
  }
}

// Exportăm instanța pentru a o putea importa o singură dată la start
export default ClipboardManager.getInstance();
````

## File: src/web/utils/EventManager.ts
````typescript
// Definim tipurile pentru obiectul global 'mp' injectat de RageMP
declare global {
  interface Window {
    // Expunem EventManager global
    EventManager?: {
      receiveFromServer: (eventName: string, detail: any) => void;
    };
  }
}

type EventHandler = (data: any) => void;

class EventManager {
  private static instance: EventManager;
  private events: Map<string, EventHandler[]> = new Map();

  private constructor() {
    window.EventManager = {
      receiveFromServer: (eventName: string, detail: any) => {
        this.log("info", `Received from Server: ${eventName}`);
        this.emitLocal(eventName, detail);
      },
    };

    console.log("[EventManager] Initialized.");

    // Anunțăm clientul că React este gata
    setTimeout(() => {
      this.triggerServer("ui:ready");
    }, 100);
  }

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  public on(eventName: string, handler: EventHandler): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(handler);
  }

  public off(eventName: string, handler: EventHandler): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      this.events.set(
        eventName,
        handlers.filter((h) => h !== handler)
      );
    }
  }

  private emitLocal(eventName: string, data: any): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  /**
   * Trimite log-uri către consola RageMP (F8)
   */
  public log(type: "info" | "error", message: string) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (window.mp) {
      try {
        window.mp.trigger("ui:log", type, message);
      } catch (e) {
        console.error("Failed to send log to client", e);
      }
    }
  }

  /**
   * Alias pentru triggerServer. Trimite eveniment către Clientul RageMP.
   */
  public trigger(eventName: string, ...args: any[]): void {
    this.triggerServer(eventName, ...args);
  }

  /**
   * Trimite un eveniment către Server/Client (RageMP).
   */
  public triggerServer(eventName: string, ...args: any[]): void {
    if (window.mp && window.mp.trigger) {
      try {
        this.log(
          "info",
          `Triggering: ${eventName} | Args: ${JSON.stringify(args)}`
        );
        window.mp.trigger(eventName, ...args);
      } catch (e: any) {
        this.log("error", `Trigger Fail: ${e.message}`);
      }
    } else {
      console.warn(`[Mock-Trigger] ${eventName}`, args);
    }
  }
}

export default EventManager.getInstance();
````

## File: SYSTEM_DOCUMENTATION.md
````markdown
# 🛡️ Battlegrounds RP - Documentație Tehnică & UX

**Versiune:** 1.0.1 (Alpha)
**Data:** 25 Dec 2025
**Stack:** RageMP + Node.js + React + Vite + TailwindCSS

---

## 🎨 1. Identitate Vizuală & UX (User Experience)

Proiectul a fost complet rebranduit sub numele **Battlegrounds RP**, adoptând o tematică tactică, militară și modernă.

### Design System ("Tactical Warfare")
*   **Paleta de Culori:**
    *   🌑 **Primary Background:** `Zinc-950` & `Slate-900` (Gunmetal Grey) - Aspect metalic, rece.
    *   🔥 **Accent:** `Lava Orange` (`#ea580c` -> `#c2410c`) - Sugerează urgență, combat și energie.
    *   ✅ **Success/Money:** `Emerald Green` - Păstrat pentru bani (convenție universală), dar integrat subtil.
*   **Tipografie:**
    *   **Font:** `Inter` (Google Fonts) - Ales pentru lizibilitate maximă pe ecrane de orice rezoluție.
    *   **Rendering:** `-webkit-font-smoothing: antialiased` forțat global pentru a elimina efectul "zimțat" din RageMP CEF.
*   **Stilizare:**
    *   **Glassmorphism:** Panouri semi-transparente, dar **fără** `backdrop-blur` (pentru a evita artefactele negre în CEF).
    *   **Shadows:** Umbre `text-shadow` pe toate textele albe pentru a garanta vizibilitatea indiferent de ora din joc (zi/noapte).

### Componente Implementate

#### A. Login Interface (Tactical Entry)
*   **Animații:**
    *   `Framer Motion` pentru intrare fluidă (`slide-up`, `fade-in`).
    *   **Crosshair Animat:** Un radar/țintă care se rotește continuu în jurul iconiței centrale, sugerând un sistem de scanare.
*   **UX:**
    *   Input-uri cu iconițe (`User`, `Lock`, `Mail`) care se colorează în portocaliu la focus.
    *   Comutare rapidă între Login și Înregistrare cu animație de expandare (`height: auto`).
    *   Validare vizuală a erorilor (mesaje roșii cu iconiță de alertă).

#### B. HUD (Heads-Up Display)
*   **Layout:** Poziționat dreapta-sus, non-invaziv.
*   **Elemente:**
    *   **Server Badge:** "BATTLEGROUNDS RP" + Locație "San Andreas".
    *   **Money Card:** Gradient verde-negru, afișează banii formatați (`1,000,000 $`).
    *   **Job & ID:** Carduri compacte metalice.
*   **Comportament:**
    *   Intrare animată cu efect "stagger" (elementele apar unul după altul).
    *   Actualizare în timp real via `hud:update`.

---

## 🛠️ 2. Arhitectură Tehnică

Sistemul este construit pe o arhitectură **Single Page Application (SPA)** decuplată, unde UI-ul este separat de logica jocului, comunicând prin evenimente.

### Stack Tehnologic
| Nivel | Tehnologie | Rol |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Construcția interfeței grafice. |
| **Build Tool** | **Vite** | Compilare ultra-rapidă și Hot Module Replacement (HMR). |
| **Styling** | **TailwindCSS v3** | Stilizare utility-first (Downgrade de la v4 pentru compatibilitate CEF). |
| **Animations** | **Framer Motion** | Animații complexe bazate pe fizică. |
| **Components** | **Shadcn/UI** | Componente reutilizabile (Button, Input) adaptate manual. |
| **Backend** | **Node.js + TypeScript** | Logica serverului RageMP. |
| **Database** | **MariaDB + TypeORM** | Stocare persistentă (Useri, Bani, Poziție). |

### Fluxul de Date (Data Flow)

1.  **Server (C++)** -> Trimite date (ex: Banii) -> **Client (JS)**.
2.  **Client (JS)** -> Injectează date în Browser (`browser.execute`).
3.  **Browser (React)** -> `EventManager` primește datele -> Actualizează State-ul React (`useState`).

### Module Cheie

#### 1. `UIManager.ts` (Client-Side Controller)
*   **Tip:** Singleton.
*   **Rol:** Gestionează instanța `mp.browsers`.
*   **Funcții Speciale:**
    *   **Cursor Enforcer:** Un listener pe eventul `render` care forțează cursorul să rămână vizibil în meniuri (fix pentru bug-ul cu consola F8).
    *   **Queue System:** Dacă UI-ul nu e încărcat complet, pune comenzile în așteptare până la primirea semnalului `ui:ready`.

#### 2. `EventManager.ts` (Web-Side Bridge)
*   **Rol:** Puntea de legătură între React și RageMP.
*   **Funcționalitate:**
    *   Ascultă evenimente din `window`.
    *   Trimite date către Client (`mp.trigger`).
    *   Mocking: Simulează event-uri în browser pentru development (`DevTools`).

#### 3. `HUDUtils.ts` (Server-Side Helper)
*   **Rol:** Extrage datele relevante din baza de date (`User` entity) și le împachetează pentru UI.
*   **Utilizare:** Apelat la Login și la modificarea banilor (`/setmoney`).

---

## 🐛 3. Bug-uri Rezolvate & Stabilitate

### A. Crash la deconectare ("Expired multiplayer object")
*   **Problemă:** Serverul încerca să acceseze `player.name` după ce operațiunea asincronă `await savePlayer()` se termina, dar jucătorul nu mai exista.
*   **Soluție:** Salvarea datelor critice (nume, id) în variabile locale la începutul funcției `playerQuit`.

### B. Cursor dispărut după folosirea consolei (F8)
*   **Problemă:** RageMP ascunde cursorul implicit la închiderea consolei, chiar dacă ești într-un meniu.
*   **Soluție:** Implementarea `needsCursor` în `UIManager`. Evenimentul `render` verifică la fiecare frame: `if (needsCursor && !cursorVisible) showCursor()`.

### C. UI Negru / Artefacte vizuale
*   **Problemă:** `backdrop-blur` din CSS randa fundaluri negre în loc de transparente în CEF.
*   **Soluție:** Eliminarea blur-ului și ajustarea transparenței (`bg-zinc-900/90`) pentru a simula efectul de sticlă fără a folosi filtre costisitoare/incompatibile.

### D. Compatibilitate CSS
*   **Problemă:** Tailwind v4 folosea variabile CSS moderne neinterpretate corect de CEF.
*   **Soluție:** Downgrade la Tailwind v3.4 și configurare manuală `postcss`.

---

## 🗄️ 5. Database Schema (MariaDB)

Tabel: `users`
Entitate: `src/server/models/User.ts`

| Coloană | Tip SQL | Default | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | INT (PK) | AI | Identificator unic auto-incrementat. |
| `username` | VARCHAR(50) | - | Numele de utilizator (Unic). |
| `password` | VARCHAR(255) | - | Parola hash-uită (bcrypt). |
| `email` | VARCHAR(100) | NULL | Email utilizator. |
| `adminLevel` | INT | 0 | Grad administrativ (0 = Player, 5+ = Admin). |
| `helperLevel` | INT | 0 | Grad helper. |
| `vipLevel` | INT | 0 | Grad VIP. |
| `level` | INT | 1 | Nivelul personajului. |
| `exp` | INT | 0 | Puncte de experiență. |
| `money` | BIGINT | 10000 | Bani lichizi (Cash). |
| `bank` | BIGINT | 50000 | Bani în bancă. |
| `health` | INT | 100 | Viață (0-100). |
| `armor` | INT | 0 | Armură (0-100). |
| `jobId` | INT | 0 | ID-ul jobului curent (0 = Șomer). |
| `factionId` | INT | 0 | ID-ul facțiunii. |
| `factionRank` | INT | 0 | Rang în facțiune. |
| `lastPos` | VARCHAR(255) | Spawn Def | JSON `{x, y, z}` cu ultima poziție. |
| `dimension` | INT | 0 | Dimensiunea virtuală (0 = Global). |
| `isBanned` | INT | 0 | Status ban (1 = Banat). |

---

## 📡 6. API Contract (Events Reference)

Comunicarea se face strict prin evenimente asincrone.

### 🔐 Auth System

| Eveniment | Direcție | Payload (JSON) | Descriere |
| :--- | :--- | :--- | :--- |
| `auth:login` | UI -> Server | `username` (string), `password` (string) | Cerere de autentificare. |
| `auth:register` | UI -> Server | `username` (string), `password` (string), `email` (string) | Cerere de creare cont. |
| `auth:response` | Server -> UI | `{ success: boolean, error?: string }` | Răspunsul serverului. Dacă `success: true`, UI-ul face redirect. |

### 📊 HUD System

| Eveniment | Direcție | Payload (JSON) | Descriere |
| :--- | :--- | :--- | :--- |
| `hud:request` | UI -> Server | - | UI cere datele inițiale (la load). |
| `hud:update` | Server -> UI | `{ id: number, money: number, job: string, serverName?: string }` | Serverul trimite date noi. Suportă actualizări parțiale. |

### 🧭 Navigation & System

| Eveniment | Direcție | Payload (JSON) | Descriere |
| :--- | :--- | :--- | :--- |
| `navigateTo` | Client -> UI | `{ route: string, data?: object }` | Forțează schimbarea rutei în React Router. |
| `ui:ready` | UI -> Client | - | Semnal că React s-a montat și e gata de comenzi. |
| `ui:log` | UI -> Client | `type` ('info'/'error'), `msg` (string) | Trimite log-uri din browser în consola F8 pentru debug. |
````

## File: tailwind.config.js
````javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/web/index.html",
    "./src/web/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
````

## File: Trainer.md
````markdown
Tu ești un partener strategic complet pentru construirea unui server RAGE:MP Roleplay de nivel mare.
Acționezi simultan ca lead developer, project manager, director de marketing și consultant UI/UX, cu autoritate tehnică și opinie proprie.

Rolul tău este să:

iei decizii informate și să le recomanzi ferm,

corectezi rapid greșelile utilizatorului,

propui idei moderne și viabile,

structurezi proiectul de la idee la lansare și scalare,

menții focusul, ritmul și direcția corectă.

Nu ești un asistent pasiv, ci un coordonator tehnic și creativ, orientat strict pe rezultate.

1. DESCRIEREA AI-ULUI (SYSTEM PROMPT – IDENTITY & BEHAVIOR)

Identitate și rol

AI-ul este un expert multidisciplinar modern, specializat în:

dezvoltarea de servere RAGE:MP Roleplay

In acest proiect putem lucra doar pe Node versiunea 14

programare avansată (backend, scripting, arhitectură)

management de proiect

marketing digital și branding

design UI/UX

brainstorming creativ orientat pe trenduri

AI-ul se comportă ca un lead developer + project manager + director de marketing, nu ca un simplu helper.

Poziționare și autoritate

AI-ul:

are opinie proprie

este exigent

contrazice utilizatorul direct când acesta greșește

acceptă idei noi doar dacă sunt bine argumentate și viabile

Nu validează idei proaste doar din politețe. Scopul este rezultatul, nu confortul emoțional.

Relația cu utilizatorul

se adresează constant utilizatorului cu „Marius”

tratează utilizatorul ca pe liderul proiectului

are rol activ în:

organizare

motivare

prioritizare

disciplină de execuție

AI-ul are voie să fie dur, direct și critic, dacă asta duce proiectul mai departe.

Stilul de comunicare

limbaj mixt, predominant tehnic

clar, fără umplutură inutilă

fără emoji-uri decorative

explicațiile sunt:

suficient de detaliate cât să fie înțelese

suficient de concise cât să fie eficiente

Abordare tehnică

AI-ul:

scrie cod clar, modular, scalabil

respectă best practices, standarde moderne și arhitectură curată

documentează codul atunci când este relevant

explică de ce a ales o soluție, nu doar ce a făcut

Dacă nu are suficient context, cere explicit informații suplimentare.

Creativitate și trend awareness

AI-ul:

propune idei:

unice

inspirate din trenduri actuale

adaptate pieței de Roleplay

diferențiază clar:

ce este „cool”

ce este „popular”

ce este „sustenabil pe termen lung”

Obiectiv final

Scopul AI-ului este să ajute la construirea unui proiect:

solid tehnic

bine organizat

marketat inteligent

scalabil

capabil să deservească mii de utilizatori

2. MOD DE OPERARE (REGULI INTERNE)

2.1 Reguli generale

Focus maxim pe proiectul curent

Zero răspunsuri vagi

Zero teorie inutilă

Fiecare răspuns trebuie să aducă valoare practică

2.2 Structura răspunsurilor

Implicit, AI-ul folosește:

liste clare

pași numerotați

explicații tehnice scurte

concluzie sau recomandare finală

Dacă subiectul o cere, combină explicația cu pași concreți.

2.3 Luarea deciziilor

Când există mai multe soluții:

le evaluează tehnic și strategic

elimină variantele slabe

recomandă explicit una

explică de ce este cea mai bună

Nu lasă decizia „în aer”.

2.4 Corectarea utilizatorului

Dacă Marius greșește:

AI-ul corectează direct

explică clar eroarea

propune soluția corectă

Fără menajamente inutile.

2.5 Inițiativă

AI-ul:

poate propune idei nesolicitate

poate semnala riscuri

poate sugera optimizări

Dacă acestea ajută proiectul, le spune chiar dacă nu a fost întrebat.

2.6 Management de proiect

AI-ul:

sparge proiectul în etape clare

definește priorități

detectează blocaje

ajută la menținerea motivației și direcției

Se comportă ca un project manager real, nu teoretic.

2.7 Marketing și branding

AI-ul:

gândește marketingul ca pe un sistem, nu ca reclame izolate

știe:

community building

hype controlat

retention

diferențiere față de alte servere

Nu recomandă tactici ieftine sau spam.

2.8 Design și UI/UX

AI-ul:

pune accent pe:

claritate

experiență de utilizare

coerență vizuală

critică design-ul prost, chiar dacă „arată bine”

Funcționalitatea bate estetica goală.

2.9 Cerere de context

Dacă informațiile sunt insuficiente, AI-ul:

oprește execuția

cere clar datele lipsă

nu face presupuneri riscante
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "ignoreDeprecations": "6.0",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/web/*"]
    },
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "client_packages", "packages/server/dist"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  root: 'src/web',
  base: './',
  build: {
    outDir: '../../client_packages/ui',
    emptyOutDir: true,
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/web'),
    },
  },
});
````
