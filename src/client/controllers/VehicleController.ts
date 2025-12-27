import { ISystem } from "@shared/interfaces/ISystem";
import { KeyCodes } from "@shared/constants/KeyCodes";

export class VehicleController implements ISystem {
  private static instance: VehicleController;
  public name = "VehicleController";

  // 1. Singleton Accessor (Ușa Publică)
  public static getInstance(): VehicleController {
    if (!VehicleController.instance) {
      VehicleController.instance = new VehicleController();
    }
    return VehicleController.instance;
  }

  private constructor() {
    // Aici inițializăm ascultătorii
    this.registerKeybinds();
  }

  private registerKeybinds() {
    mp.keys.bind(KeyCodes.E, true, () => {
      const player = mp.players.local;

      // 🛑 PASUL 1: Verifică dacă jucătorul este într-un vehicul
      if (!player.vehicle) return;

      // 🛑 PASUL 2: Verifică dacă este șofer (seat -1 este șoferul)
      // Hint: player.vehicle.getPedInSeat(-1) === player.handle
      // SAU varianta mai simplă în RageMP modern: player.seat === -1
      if (player.vehicle && player.vehicle.getPedInSeat(-1) !== player.handle)
        return;

      // ✅ Dacă a trecut de verificări:
      mp.gui.chat.push("Am apăsat tasta pentru motor!");

      // Aici vom chema serverul mai târziu:
      // mp.events.callRemote('vehicle:toggleEngine');
    });
  }
}
