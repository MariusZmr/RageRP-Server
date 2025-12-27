import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./UIManager";
import { ServerEvents } from "@shared/constants/Events";

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
        mp.events.add(ServerEvents.HUD_UPDATE, (dataRaw: any) => {
            const browser = UIManager.getInstance().getBrowser();
            if (!browser) return;

            const data = typeof dataRaw === "string" ? JSON.parse(dataRaw) : dataRaw;
            browser.execute(`window.EventManager.receiveFromServer('${ServerEvents.HUD_UPDATE}', ${JSON.stringify(data)})`);
        });
    }
}