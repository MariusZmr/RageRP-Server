import { ISystem } from "../shared/interfaces/ISystem";
import { Logger } from "./utils/Logger";
import { AuthSystem } from "./modules/auth/auth.system";
import { CharacterSystem } from "./modules/character/character.system";

class SystemsManager {
  private static instance: SystemsManager;
  private systems: ISystem[] = [];

  private constructor() {
    // Register ALL systems here using direct class imports
    this.systems = [AuthSystem.getInstance(), CharacterSystem.getInstance()];
  }

  public static getInstance(): SystemsManager {
    if (!SystemsManager.instance) {
      SystemsManager.instance = new SystemsManager();
    }
    return SystemsManager.instance;
  }

  public async initAll(): Promise<void> {
    for (const system of this.systems) {
      if (system.init) await system.init();
    }

    for (const system of this.systems) {
      if (system.start) await system.start();
    }

    Logger.info(
      `[SystemsManager] Modulele au fost incarcate cu succes. (${this.systems.length})`
    );
  }

  public async shutdownAll(): Promise<void> {
    for (const system of this.systems) {
      if (system.shutdown) await system.shutdown();
    }
  }
}

export default SystemsManager.getInstance();
