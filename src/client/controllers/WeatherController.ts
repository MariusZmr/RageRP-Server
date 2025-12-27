import { ISystem } from "@shared/interfaces/ISystem";

export class WeatherController implements ISystem {
  private static instance: WeatherController;
  public name = "WeatherController";

  private targetWeather: string = "CLEAR";
  private isXmasActive: boolean = false;

  private readonly NATIVE_SNOW_PASS = "0x6E9EF3A33C8899F8";
  private readonly NATIVE_SNOW_INTENSITY = "0x7F06937B0CDCBC1A";

  private constructor() {}

  public static getInstance(): WeatherController {
    if (!WeatherController.instance) {
      WeatherController.instance = new WeatherController();
    }
    return WeatherController.instance;
  }

  public init(): void {
    mp.events.add("client:setWeather", (weatherName: string) => {
      if (!weatherName) return;
      this.targetWeather = weatherName.toUpperCase();
      this.applyWeather();
    });

    mp.events.callRemote("server:requestWeatherSync");
    mp.events.add("render", () => this.onRender());
  }

  private applyWeather() {
    if (this.targetWeather === "XMAS") {
      mp.game.gameplay.clearOverrideWeather();
      mp.game.gameplay.setOverrideWeather("XMAS");
      mp.game.gameplay.setWeatherTypeNow("XMAS");
      mp.game.gameplay.enableSnow = true;
      mp.game.gameplay.setSnowLevel(1.0);
      mp.game.invoke(this.NATIVE_SNOW_PASS, true);
      mp.game.invoke(this.NATIVE_SNOW_INTENSITY, 1.0);
      this.isXmasActive = true;
    } else {
      mp.game.gameplay.clearOverrideWeather();
      mp.game.gameplay.enableSnow = false;
      mp.game.invoke(this.NATIVE_SNOW_PASS, false);
      mp.game.invoke(this.NATIVE_SNOW_INTENSITY, 0.0);
      this.isXmasActive = false;
    }
  }

  private onRender() {
    if (this.isXmasActive) {
      mp.game.graphics.setForcePedFootstepsTracks(true);
      mp.game.graphics.setForceVehicleTrails(true);
      mp.game.gameplay.setSnowLevel(1.0);
    }
  }
}