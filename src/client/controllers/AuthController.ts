import { ISystem } from "@shared/interfaces/ISystem";
import { UIManager } from "./UIManager";
import { NotificationManager } from "./NotificationManager";
import { ServerEvents } from "@shared/constants/Events";

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
        mp.events.add(ServerEvents.AUTH_LOGIN, (u: string, p: string) => mp.events.callRemote(ServerEvents.AUTH_LOGIN, u, p));
        mp.events.add(ServerEvents.AUTH_REGISTER, (u: string, p: string, e: string) => mp.events.callRemote(ServerEvents.AUTH_REGISTER, u, p, e));

        mp.events.add(ServerEvents.AUTH_RESPONSE, (responseRaw: any) => {
            let response = typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
            if (Array.isArray(response)) response = response[0];

            if (response.success) {
                if (response.characters) {
                    UIManager.getInstance().showPage("/char-selector", { 
                        characters: response.characters,
                        maxSlots: response.maxSlots 
                    });
                } else {
                    UIManager.getInstance().showPage("/login");
                }
            } else {
                NotificationManager.show("error", "Eroare Autentificare", response.error);
            }
        });
    }
}