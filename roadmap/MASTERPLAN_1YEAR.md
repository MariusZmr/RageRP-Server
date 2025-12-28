# 🏙️ Battlegrounds RP - The 1-Year Masterplan
**Vision:** A fully autonomous, high-fidelity Roleplay ecosystem built In-House.
**Developer:** Solo ("One Man Army")
**Stack:** TypeScript (Server/Client) + React (UI)

---

## 📅 Q1: THE FOUNDATION (Luni 1-3)
**Obiectiv:** Serverul este "Jucabil". Poți trăi, munci și salva progresul.

### 🚗 1. Sistem Avansat de Vehicule (The Garage 2.0)
Nu doar spawn. Vehicule care se simt "ale tale".
- **Persistență Totală:** Unde lași mașina, acolo o găsești peste 2 săptămâni (până la restart).
- **Sistem Chei:** Poți da cheile prietenilor (digital keys management).
- **Portbagaj:** Inventar unic pentru fiecare mașină (salvat în JSON).
- **Tuning:** Modificări vizuale și de performanță salvate.

### 🎒 2. Inventar & Economie de Bază
- **Grid Inventory System:** Drag & Drop în React.
- **Item Metadata:** Armele au serii unice și durabilitate. Mâncarea expiră.
- **Shops:** Magazine dinamice (pot rămâne fără stoc).

### 🏠 3. Housing System (Instanced)
- Cumpărare case/apartamente.
- **Furniture System:** (Complex) Jucătorul își poate mobila casa singur (editor in-game). *Asta e un feature de top care ține jucătorii ocupați ore întregi.*

---

## 📅 Q2: THE SOCIETY (Luni 4-6)
**Obiectiv:** Jucătorii au uneltele necesare pentru a crea conflicte și alianțe (RP).

### 📱 1. High-Fidelity Phone (Smartphone)
Nu doar un meniu, ci un OS complet în React.
- **Apps:** Whatsapp (Chat real), Twitter (Feed server), Banking, Camera (Poze reale uploadate pe un CDN/Discord).
- **Contacts:** Salvare numere, share location.

### 👮 2. Factions: Law & Order
- **MDT (Mobile Data Terminal):** Tableta poliției conectată la baza de date (Cazier, Amenzi, Mandate).
- **Jail System:** Muncă în folosul comunității pentru a scădea timpul.
- **Evidence System:** Gloanțele lasă tuburi cartuș pe jos care pot fi scanate de poliție.

### 🏴 3. Factions: Crime & Gangs
- **Turf System:** Zone pe hartă colorate dinamic. Gang-urile se luptă pentru control.
- **Drug Labs:** Laboratoare ascunse unde se procesează droguri (minigames în React).
- **Black Market:** Locație dinamică care se mută zilnic.

---

## 📅 Q3: THE BUSINESS & PROGRESSION (Luni 7-9)
**Obiectiv:** "Endgame"-ul economic. Jucătorii devin patroni și influenceri.

### 💼 1. Player Owned Businesses
Orice afacere de pe server (Benzinărie, Magazin de haine, Dealer Auto) poate fi cumpărată.
- **Management:** Patronul setează prețurile, angajează jucători reali, comandă marfă.
- **Logistica:** Jucătorii (Truckers) trebuie să aducă marfa la business-uri.

### 🛠️ 2. Skills & Perks (RPG Elements)
- Sistem de nivele pe abilități: `Stamina`, `Shooting`, `Driving`, `Cooking`.
- **Crafting:** Nu oricine poate face arme. Îți trebuie skill `Gunsmithing` lvl 5.

### 👗 3. Dynamic Clothing
- Sistem de haine stratificat (Layered).
- Posibilitatea de a salva outfit-uri.
- Coafor & Tatuaje sincronizate perfect.

---

## 📅 Q4: THE POLISH & UNIQUE FEATURES (Luni 10-12)
**Obiectiv:** Diferențierea de restul serverelor. "Wow Factor".

### 🎰 1. Leisure & Minigames
- **Casino:** Poker, Blackjack, Ruletă (toate sync-uite multiplayer).
- **Arcade:** Jocuri retro în baruri.
- **Sport:** Biliard, Tenis funcțional.

### 🤖 2. Advanced NPCs & AI
- NPC-uri care reacționează la acțiunile jucătorilor (ex: vânzători care ridică mâinile dacă scoți arma).
- Trafic (Mașini) sincronizat (opțional, e greu pe RageMP, dar posibil).

###  heist 3. Complex Heists (Jafuri Scriptate)
- Nu doar "du-te la punct și ia banii".
- Jafuri gen GTA Online: Hacking (minigame), Termal Drill, ostatici, negociere.

---

## 🛠️ DEVOPS & INFRASTRUCTURE (Pe tot parcursul anului)
*Ca One Man Army, trebuie să automatizezi tot ce nu e cod.*

- **Automated Backups:** Script care arhivează baza de date și codul la fiecare 6 ore și le urcă pe un cloud (Google Drive/S3).
- **CI/CD:** Când dai `git push`, serverul de test se actualizează singur.
- **Monitoring:** Dashboard (Grafana) care îți arată CPU usage, erori live și câți jucători sunt on.

---

### 🌟 VIZIUNEA FINALA (După 1 An)
Vei avea un ecosistem complet. Nu vei mai scrie cod pentru "funcții de bază". Vei scrie cod doar pentru **Event-uri** și **Content Nou**.
Vei avea o comunitate care depinde de sistemele create de tine.

> *"The goal is not to finish the project, but to build a world that lives on its own."*
