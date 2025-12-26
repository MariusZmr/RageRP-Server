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
