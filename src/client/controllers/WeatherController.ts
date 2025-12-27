export class WeatherController {
  private static instance: WeatherController;

  private targetWeather: string = "CLEAR";
  private isXmasActive: boolean = false;

  // Definim hash-urile native ca și constante pentru claritate și performanță
  // 0x6E9EF3A33C8899F8 -> _SET_FORCE_PED_FOOTSTEPS_TRACKS (dar folosit aici pt texturi snow pass)
  // 0x7F06937B0CDCBC1A -> _SET_SNOW_LEVEL (Nativa raw, mai puternică decât wrapper-ul Rage)
  private readonly NATIVE_SNOW_PASS = "0x6E9EF3A33C8899F8";
  private readonly NATIVE_SNOW_INTENSITY = "0x7F06937B0CDCBC1A";

  private constructor() {
    // 1. Ascultăm evenimentul de la server
    mp.events.add("client:setWeather", (weatherName: string) => {
      // Verificare de siguranță
      if (!weatherName) return;

      this.targetWeather = weatherName.toUpperCase();
      this.applyWeather();
    });

    // 2. Cerem vremea la conectare
    mp.events.callRemote("server:requestWeatherSync");

    // 3. Render Loop pentru efectele continue (urme)
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): WeatherController {
    if (!WeatherController.instance) {
      WeatherController.instance = new WeatherController();
    }
    return WeatherController.instance;
  }

  private applyWeather() {
    if (this.targetWeather === "XMAS") {
      mp.game.gameplay.clearOverrideWeather();

      mp.game.gameplay.setOverrideWeather("XMAS");
      mp.game.gameplay.setWeatherTypeNow("XMAS");

      mp.game.gameplay.enableSnow = true;
      mp.game.gameplay.setSnowLevel(1.0);
      mp.game.gameplay.setFadeOutAfterDeath(false);

      mp.game.invoke(this.NATIVE_SNOW_PASS, true);
      mp.game.invoke(this.NATIVE_SNOW_INTENSITY, 1.0); // 1.0 pentru acoperire completă

      this.isXmasActive = true;
    } else {
      mp.game.gameplay.clearOverrideWeather();
      mp.game.gameplay.enableSnow = false;
      mp.game.gameplay.setSnowLevel(0.0);
      mp.game.gameplay.setFadeOutAfterDeath(true);

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
