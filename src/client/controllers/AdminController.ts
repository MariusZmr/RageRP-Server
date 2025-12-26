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
