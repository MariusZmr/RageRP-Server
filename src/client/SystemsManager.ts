import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./controllers/UIManager";
import { UIController } from "./controllers/UIController";
import { AuthController } from "./controllers/AuthController";
import { CharacterController } from "./controllers/CharacterController";
import { VehicleUIController } from "./controllers/VehicleUIController";
import { WeatherController } from "./controllers/WeatherController";
import { DebugController } from "./controllers/DebugController";

export class SystemsManager {
    private static instance: SystemsManager;
    private systems: ISystem[] = [];

    private constructor() {}

    public static getInstance(): SystemsManager {
        if (!SystemsManager.instance) {
            SystemsManager.instance = new SystemsManager();
        }
        return SystemsManager.instance;
    }

    public init(): void {
        mp.console.logInfo(`[SystemsManager] Initializing systems...`);

        // Instanțiem sistemele aici, nu în constructor, pentru a evita problemele de circularitate la import
        try {
            this.systems = [
                UIManager.getInstance(),
                UIController.getInstance(),
                AuthController.getInstance(),
                CharacterController.getInstance(),
                VehicleUIController.getInstance(),
                WeatherController.getInstance(),
                DebugController.getInstance()
            ];

            this.systems.forEach(system => {
                if (system && system.init) {
                    system.init();
                    mp.console.logInfo(`[SystemsManager] System ${system.name} initialized.`);
                }
            });
        } catch (e: any) {
            mp.console.logError(`[SystemsManager] FATAL ERROR during initialization: ${e.message}`);
            // Log-uim stack-ul pentru a vedea exact care clasa e problematica
            if (e.stack) mp.console.logError(e.stack);
        }
    }
}
