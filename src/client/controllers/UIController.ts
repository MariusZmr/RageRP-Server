import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./UIManager";

export class UIController implements ISystem {
    private static instance: UIController;
    public name = "UIController";

    private constructor() {}

    public static getInstance(): UIController {
        if (!UIController.instance) {
            UIController.instance = new UIController();
        }
        return UIController.instance;
    }

    public init(): void {
        // Logs from UI to Console
        mp.events.add("ui:log", (type: string, msg: string) => {
            mp.console.logInfo(`[UI-${type.toUpperCase()}] ${msg}`);
        });

        // Proxy HUD Request UI -> Server
        mp.events.add("hud:request", () => {
            mp.events.callRemote("hud:request");
        });

        // Proxy HUD Update Server -> UI
        mp.events.add("hud:update", (dataRaw: any) => {
            const data = typeof dataRaw === "string" ? JSON.parse(dataRaw) : dataRaw;
            const browser = UIManager.getInstance().getBrowser();
            if (browser && mp.browsers.exists(browser)) {
                browser.execute(`window.EventManager.receiveFromServer('hud:update', ${JSON.stringify(data)})`);
            }
        });

        // Navigation Proxy
        mp.events.add("navigateTo", (payloadRaw: any) => {
            const payload = typeof payloadRaw === "string" ? JSON.parse(payloadRaw) : payloadRaw;
            const browser = UIManager.getInstance().getBrowser();
            if (browser && mp.browsers.exists(browser)) {
                browser.execute(`window.EventManager.receiveFromServer('navigateTo', ${JSON.stringify(payload)})`);
            }
        });
    }
}