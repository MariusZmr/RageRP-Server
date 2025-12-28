# 💡 Tips & Tricks pentru Dezvoltare RageMP

Sfaturi "din tranșee" pentru a-ți păstra sănătatea mintală și motivația.

## 🧠 Mentalitate & Motivație

### 1. Regula de 15 minute
Dacă te blochezi la o problemă tehnică (ex: CSS care nu se aliniază, o eroare ciudată de DB) mai mult de **15 minute**:
- Oprește-te.
- Ia o pauză / Bea apă / Ieși pe balcon.
- Sau schimbă task-ul complet (lucrează la altceva).
*Frustrarea este inamicul nr. 1 al proiectelor hobby. Nu o lăsa să se acumuleze.*

### 2. "Dopamine Driven Development"
Lucrează la chestii vizuale.
- Nu scrie 3 zile la un sistem de loguri invizibil.
- Scrie o comandă care spawnează o mașină, pune-i neoane și condu-o.
- Vezi rezultatul muncii tale în joc cât mai des. Asta îți dă energia să continui.

### 3. Joacă-te pe serverul tău
La finalul fiecărei sesiuni de codare (sau la început):
- Intră în joc.
- Nu ca developer, ci ca jucător.
- Plimbă-te, admiră harta, imaginează-ți scenarii de RP.
*Îți reamintește "DE CE" muncești atât de mult.*

## 🛠️ Tehnic & Arhitectură

### 4. Fake it till you make it (UI Design)
Nu pierde timpul făcând design de la zero în Figma dacă nu ești designer.
- Folosește componente gata făcute (Shadcn/UI, Tailwind Components).
- Un UI funcțional și curat e mai bun decât unul "artistic" dar neterminat.
- Jucătorii vor funcționalitate, nu artă abstractă.

### 5. Nu optimiza prematur (Capcana 2000 Players)
Nu scrie cod pentru 2000 de jucători când ai 0.
- Scrie codul să fie citibil și ușor de modificat.
- Dacă ajungi la performanță bottleneck (lag), atunci optimizezi.
- **Excepție:** Nu face query-uri în buclă (`for loop` + `await db.save()`). Asta e interzis din start.

### 6. Folosește Nativele GTA
Nu totul trebuie să fie interfață Web (React).
- Pentru mesaje scurte ("Ai încuiat ușa"), folosește notificările native GTA (deasupra hărții).
- Sunt instantanee, nu consumă resurse CEF și sunt imersive.
- Folosește `mp.game.ui.setTextComponentFormat` și prietenii lui.

### 7. Debugging Inteligent
- Folosește `Logger`-ul creat.
- În browser (CEF), folosește `chrome://inspect` pentru a vedea consola React. E mult mai puternic decât consola jocului.
- Dacă ceva nu merge, verifică lanțul: `React -> EventManager -> Client -> Server -> DB`. De obicei se rupe o verigă.

## ⚠️ "Capcane" Comune

- **Sistemul de Inventar:** E cel mai complex sistem. Nu-l începe până nu ai o bază solidă. Începe cu o listă simplă, nu cu grid tetris.
- **Sync-ul:** Nu încerca să sincronizezi fiecare glonț sau fiecare pas. Lasă GTA-ul să facă ce știe el mai bine. Sincronizează doar ce e critic (HP, Haine, Vehicule).
- **Feature Creep:** Nu adăuga idei noi în roadmap până nu termini ce ai început. "Ar fi mișto să avem și avioane..." -> NU. Terminăm mașinile întâi.
