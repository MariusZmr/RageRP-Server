import { ISystem } from "@shared/interfaces/ISystem";
import { ClientEvents } from "@shared/constants/Events";

export class WeatherController implements ISystem {
    private static instance: WeatherController;
    public name = "WeatherController";

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
        });
    }
}