import { UIManager } from "./UIManager";

export class VehicleUIController {
  private static instance: VehicleUIController;
  private updateInterval: number | null = null;
  private readonly UPDATE_RATE_MS = 100; // 10 FPS for UI is enough

  private constructor() {
    this.initEvents();
  }

  public static getInstance(): VehicleUIController {
    if (!VehicleUIController.instance) {
      VehicleUIController.instance = new VehicleUIController();
    }
    return VehicleUIController.instance;
  }

  private initEvents() {
    mp.events.add("playerEnterVehicle", (vehicle: VehicleMp, seat: number) => {
      this.startUpdates(vehicle);
    });

    mp.events.add("playerLeaveVehicle", () => {
      this.stopUpdates();
    });

    // Handle case where player spawns inside vehicle (rare but possible)
    if (mp.players.local.vehicle) {
      this.startUpdates(mp.players.local.vehicle);
    }
  }

  private startUpdates(vehicle: VehicleMp) {
    if (this.updateInterval) clearInterval(this.updateInterval);

    // Initial state
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

      const speedKmh = vehicle.getSpeed() * 3.6; // m/s to km/h
      const rpm = vehicle.rpm || 0;
      const gear = vehicle.gear || 0;
      
      // Get indicators (Using natives if RageMP properties are insufficient)
      // For now, basic properties
      
      this.sendUpdate({
        inVehicle: true,
        speed: Math.floor(speedKmh),
        rpm: rpm,
        gear: gear,
        fuel: 85, // Dummy value until server syncs fuel
        engineHealth: vehicle.getEngineHealth(),
        locked: vehicle.getDoorLockStatus() === 2,
        lights: false, // Need native to check lights state properly
        seatbelt: false // Need seatbelt system
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
      // Use efficient string building
      const js = `window.EventManager.receiveFromServer('vehicle:update', ${JSON.stringify(data)})`;
      browser.execute(js);
    }
  }
}
