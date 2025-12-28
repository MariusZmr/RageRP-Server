# 🗺️ Battlegrounds RP - Development Roadmap

Acest roadmap este conceput pentru a menține motivația ridicată prin livrarea constantă de funcționalități vizuale și jucabile ("Dopamine Driven Development").

## 🏁 Phase 1: The Essentials (Fundația Jucabilă)
*Status: În desfășurare*

### ✅ Checkpoint 0: Core Architecture (Finalizat)
- [x] Structura Proiectului (Client/Server/Web)
- [x] TypeScript & Environment Setup
- [x] Database ORM (TypeORM) & Entities Separation (User vs Character)
- [x] Authentication System (Login/Register/Char Creator)
- [x] Basic HUD & UI Bridge

### 🚗 Checkpoint 1: "The Garage" (Vehicule Personale)
*Obiectiv: Persistență tangibilă în lumea jocului.*
- [ ] **Database:** Entitatea `Vehicle` (ownerId, model, color, plate, position, health, fuel).
- [ ] **Dealership:** Comandă sau UI simplu pentru a cumpăra o mașină.
- [ ] **Management:** Comenzi `/v park` (salvare poziție), `/v lock` (incuiere).
- [ ] **Interacțiune:** Motor on/off, lumini, interacțiune fizică.

### 💸 Checkpoint 2: "The Grind" (Primul Job)
*Obiectiv: Testarea ciclului economic complet.*
- [ ] **Job Center:** Locație unde te angajezi (NPC sau Marker).
- [ ] **Curier/Poștaș:**
    - Preluare vehicul de job.
    - Ruta de checkpoint-uri (A -> B).
    - Animație de livrare (crată în mână).
    - Plată (Update HUD + Database).

## 📦 Phase 2: The Economy (Sistemele Complexe)

### 🎒 Checkpoint 3: "The Black Hole" (Inventarul)
*Obiectiv: Inima economiei serverului.*
- [ ] **Backend:** Structura items în DB, ItemFactory, Stack-uri.
- [ ] **Frontend (React):** UI cu Drag & Drop (simplu la început).
- [ ] **Interacțiuni:**
    - `Use` (Mănâncă măr -> +HP).
    - `Drop` (Aruncă pe jos -> obiect 3D în lume).
    - `Give` (Dă altui jucător).

### 🏪 Checkpoint 4: "Commerce" (Magazine & Tranzacții)
*Obiectiv: Circuitul banilor.*
- [ ] **24/7 Shops:** Cumpărare items (pâine, apă, telefon).
- [ ] **Clothing Stores:** Salvarea hainelor pe caracter (costumizare).
- [ ] **Banking:** ATM-uri, transfer bancar între jucători.

## 🏠 Phase 3: The Lifestyle (Social & Proprietăți)

### 🏘️ Checkpoint 5: "Real Estate" (Locuințe)
- [ ] Sistem de case (cumpărare/vânzare).
- [ ] Intrare/Ieșire (Teleport în interior sau IPL).
- [ ] Depozitare (Stash în casă).

### 📱 Checkpoint 6: "Connectivity" (Telefonul)
- [ ] UI Telefon (React).
- [ ] Aplicații de bază: Contacte, Mesaje, GPS, Banking.
- [ ] (Opțional) Camera foto.

## 👮 Phase 4: Factions & Power (Endgame)

- [ ] **Police System:** Cătușe, închisoare, amenzi, MDT.
- [ ] **Medical System:** Revive, tratamente, spital.
- [ ] **Gangs:** Teritorii, craftare arme, vânzare droguri.

---
**Notă:** Nu sări peste etape. Termină complet o fază înainte de a trece la următoarea. Un sistem neterminat este o datorie tehnică care te va demotiva.
