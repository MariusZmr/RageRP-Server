import { ISystem } from "@shared/interfaces/ISystem";
import { ClientEvents } from "@shared/constants/Events";

export class WeatherController implements ISystem {
  private static instance: WeatherController;
  public name = "WeatherController";

  // 0x6E9EF3A33C8899F8 -> _SET_FORCE_PED_FOOTSTEPS_TRACKS
  private readonly NATIVE_SNOW_PASS = "0x6E9EF3A33C8899F8";
  // 0x7F06937B0CDCBC1A -> _SET_SNOW_LEVEL
  private readonly NATIVE_SNOW_INTENSITY = "0x7F06937B0CDCBC1A";

  private constructor() {}

  public static getInstance(): WeatherController {
    if (!WeatherController.instance) {
      WeatherController.instance = new WeatherController();
    }
    return WeatherController.instance;
  }

  public init(): void {
    mp.events.add(ClientEvents.SET_WEATHER, (weatherName: string) => {
      mp.game.gameplay.setWeatherTypeNow(weatherName);
      mp.game.gameplay.setWeatherTypePersist(weatherName);

      if (weatherName === "XMAS") {
        // Enable snow footprints/tracks
        mp.game.invoke(this.NATIVE_SNOW_PASS, true);
        // Set snow level to max
        mp.game.invoke(this.NATIVE_SNOW_INTENSITY, 1.0);
      } else {
        // Disable snow footprints/tracks
        mp.game.invoke(this.NATIVE_SNOW_PASS, false);
        // Reset snow level
        mp.game.invoke(this.NATIVE_SNOW_INTENSITY, 0.0);
      }
    });
  }
}
