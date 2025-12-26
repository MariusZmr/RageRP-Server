export class WeatherController {
  private static instance: WeatherController;

  // Variabile de stare
  private targetWeather: string = "CLEAR";
  private isSnowEnabled: boolean = false;

  private constructor() {
    // Ascultăm sync-ul
    mp.events.add("client:setWeather", (weatherName: string) => {
      this.targetWeather = weatherName.toUpperCase();
      this.updateWeatherState();
    });

    mp.events.callRemote("server:requestWeatherSync");

    // Loop-ul Render (Executat la fiecare frame ~60/sec)
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): WeatherController {
    if (!WeatherController.instance) {
      WeatherController.instance = new WeatherController();
    }
    return WeatherController.instance;
  }

  // Funcție apelată o singură dată la schimbarea vremii
  private updateWeatherState() {
    if (this.targetWeather === "XMAS") {
      // Pasul 1: Setăm Override-ul (Critic pentru texturi)
      mp.game.gameplay.setOverrideWeather("XMAS");
      mp.game.gameplay.setWeatherTypeNow("XMAS");

      // Pasul 2: Activăm flag-ul intern
      this.isSnowEnabled = true;
    } else {
      // Reset
      mp.game.gameplay.clearOverrideWeather();
      mp.game.gameplay.enableSnow = false;
      this.isSnowEnabled = false;
    }
  }

  private onRender() {
    if (this.isSnowEnabled) {
      // Astea TREBUIE apelate la fiecare frame pentru a menține urmele și particulele

      // 1. Asigură-te că nivelul zăpezii e la maxim
      mp.game.gameplay.setSnowLevel(1.0);

      // 2. Activează particulele
      mp.game.gameplay.enableSnow = true;

      // 3. Activează urmele (fără invoke, folosind API-ul Rage)
      mp.game.graphics.setForcePedFootstepsTracks(true);
      mp.game.graphics.setForceVehicleTrails(true);
    }
  }
}
