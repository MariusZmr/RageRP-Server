# Jurnal de Bord & Arhitectură - ServerServeros

## 🎯 Obiectiv Strategic
- **Capacitate:** High-Load (1000+ Jucători simultan).
- **Stabilitate:** Zero crashes, tranzacții sigure (ACID).
- **Cod:** Clean Architecture, Modular, TypeScript Strict.

## 🏗️ Arhitectură Tehnică (Modernizată)

### 1. Core & Runtime
- **Engine:** Node.js v14.10.1 (RAGE MP Environment).
- **Entry Point:** `packages/server/index.js` -> `packages/server/dist/index.js`.
- **Package Manager:** **pnpm** (Viteză & Eficiență).
- **Build System:** **SWC** (Rust-based, Ultra-fast).

### 2. Data Layer
- **Database:** MariaDB + TypeORM 0.3.11.
- **Strategie:** Direct DB Access pentru siguranță.

## 📜 Jurnal Modificări (Checkpoints)

### ✅ Checkpoint 3: Refactorizare Profesională (24 Dec 2025)
- **Feature:** Sistem dinamic de încărcare comenzi (Command Loader).
- **Feature:** Categorizare și Help automatizat.
- **Feature:** Sistem Admin ierarhic (Config + Validare).
- **Feature:** Graceful Shutdown (`/stopserver`).

### 🔄 MIGRATION POINT (Acum)
- Trecere de la `npm` la `pnpm`.
- Trecere de la `tsc` (build) la `swc` (build).

## 🛠️ Configurație Curentă
- **API:** Port 3005.
- **Admin:** Level 0-5.
