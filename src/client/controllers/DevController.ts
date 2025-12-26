import { UIManager } from "./UIManager";

// Controller strict pentru development
export class DevController {
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
