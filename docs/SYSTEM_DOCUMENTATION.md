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