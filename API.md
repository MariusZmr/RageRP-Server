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
