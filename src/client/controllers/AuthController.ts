import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./UIManager";
import { NotificationManager } from "./NotificationManager";

export class AuthController implements ISystem {
    private static instance: AuthController;
    public name = "AuthController";

    private constructor() {}

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    public init(): void {
        // UI -> Client proxy
        mp.events.add("auth:login", (username: string, password: string) => {
            mp.events.callRemote("auth:login", username, password);
        });

        mp.events.add("auth:register", (username: string, password: string, email: string) => {
            mp.events.callRemote("auth:register", username, password, email);
        });

        // Server -> Client response
        mp.events.add("auth:response", (responseRaw: any) => {
            let response = typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
            if (Array.isArray(response)) response = response[0];

            if (response.success) {
                UIManager.getInstance().showPage("/char-selector", {
                    characters: response.characters,
                    maxSlots: response.maxSlots,
                }, { enableCursor: true });

                NotificationManager.show("success", "Autentificare", "Bine ai venit! Selectează identitatea.");
            } else {
                UIManager.getInstance().showPage("/login", { error: response.error });
                NotificationManager.show("error", "Eroare Login", response.error || "Date incorecte.");
            }
        });
    }
}