import { UIManager } from "./UIManager";

// Controller strict pentru development
export class DevController {
  private static instance: DevController;

  public static getInstance(): DevController {
    if (!DevController.instance) {
      DevController.instance = new DevController();
    }
    return DevController.instance;
  }
  constructor() {
    mp.events.add("client:dev:copyCoords", (jsonStr: string) => {
      const browser = UIManager.getInstance().getBrowser();
      if (browser) {
        const safeStr = jsonStr.replace(/'/g, "\\'");
        browser.execute(
          `if(window.copyToClipboard) window.copyToClipboard('${safeStr}')`
        );
      }
    });
  }
}
