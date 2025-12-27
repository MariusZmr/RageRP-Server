import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./UIManager";

export class VehicleUIController implements ISystem {
  private static instance: VehicleUIController;
  public name = "VehicleUIController";
  private updateInterval: number | null = null;
  private readonly UPDATE_RATE_MS = 100;

  private constructor() {}

  public static getInstance(): VehicleUIController {
    if (!VehicleUIController.instance) {
      VehicleUIController.instance = new VehicleUIController();
    }
    return VehicleUIController.instance;
  }

  public init(): void {
    mp.events.add("playerEnterVehicle", (vehicle: VehicleMp, seat: number) => {
      this.startUpdates(vehicle);
    });

    mp.events.add("playerLeaveVehicle", () => {
      this.stopUpdates();
    });

    if (mp.players.local.vehicle) {
      this.startUpdates(mp.players.local.vehicle);
    }
  }

  private startUpdates(vehicle: VehicleMp) {
    if (this.updateInterval) clearInterval(this.updateInterval);

    this.sendUpdate({
      inVehicle: true,
      locked: vehicle.getDoorLockStatus() === 2,
      engineHealth: vehicle.getEngineHealth(),
    });

    this.updateInterval = setInterval(() => {
      if (!vehicle || !mp.vehicles.exists(vehicle)) {
        this.stopUpdates();
        return;
      }

      this.sendUpdate({
        inVehicle: true,
        speed: Math.floor(vehicle.getSpeed() * 3.6),
        rpm: vehicle.rpm || 0,
        gear: vehicle.gear || 0,
        fuel: 85,
        engineHealth: vehicle.getEngineHealth(),
        locked: vehicle.getDoorLockStatus() === 2,
        lights: false,
        seatbelt: false
      });

    }, this.UPDATE_RATE_MS) as unknown as number;
  }

  private stopUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    this.sendUpdate({
      inVehicle: false,
      speed: 0,
      rpm: 0
    });
  }

  private sendUpdate(data: any) {
    const browser = UIManager.getInstance().getBrowser();
    if (browser && mp.browsers.exists(browser)) {
      browser.execute(`window.EventManager.receiveFromServer('vehicle:update', ${JSON.stringify(data)})`);
    }
  }
}