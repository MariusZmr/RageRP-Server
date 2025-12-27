import { ISystem } from "../../../shared/interfaces/ISystem";
import { Logger } from "../../utils/Logger";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { HUDUtils } from "../../utils/HUDUtils";
import { AuthService } from "./auth.service";
import { ServerEvents, ClientEvents } from "../../../shared/constants/Events";

export class AuthSystem implements ISystem {
    private static instance: AuthSystem;
    public name = "AuthSystem";

    private constructor() {}

    public static getInstance(): AuthSystem {
        if (!AuthSystem.instance) {
            AuthSystem.instance = new AuthSystem();
        }
        return AuthSystem.instance;
    }

    public init(): void {
        this.registerEvents();
        Logger.info(`[${this.name}] Initialized.`);
    }

    private registerEvents(): void {
        mp.events.add(ServerEvents.AUTH_LOGIN, (player, username, pass) => this.handleLogin(player, username, pass));
        mp.events.add(ServerEvents.AUTH_REGISTER, (player, username, pass, email) => this.handleRegister(player, username, pass, email));
        mp.events.add(ServerEvents.HUD_REQUEST, (player) => HUDUtils.update(player));
    }

    private async handleLogin(player: PlayerMp, username: string, pass: string): Promise<void> {
        try {
            const result = await AuthService.getInstance().validateCredentials(username, pass);
            
            if (!result.success || !result.user) {
                return player.call(ServerEvents.AUTH_RESPONSE, [{ success: false, error: result.error }]);
            }

            const user = result.user;
            PlayerUtils.setDb(player, user);
            player.name = user.username;

            // Logică calcul sloturi
            let maxSlots = user.characterSlots;
            if (user.accountPlayedTime >= 60000 && maxSlots < 2) maxSlots = 2;
            if (user.adminLevel >= 5) maxSlots = 3;

            const characterList = user.characters.map((char) => ({
                id: char.id,
                firstName: char.firstName,
                lastName: char.lastName,
                level: char.level || 1,
                playedTime: char.playedTime || 0,
                lastPlayed: char.updatedAt,
            }));

            player.call(ServerEvents.AUTH_RESPONSE, [{ success: true, characters: characterList, maxSlots }]);
            Logger.info(`[Auth] ${username} logged in.`);
        } catch (e: any) {
            Logger.error("Auth Error:", e.message);
            player.call(ServerEvents.AUTH_RESPONSE, [{ success: false, error: "Internal Server Error" }]);
        }
    }

    private async handleRegister(player: PlayerMp, username: string, pass: string, email: string): Promise<void> {
        if (pass.length < 6) return player.call(ServerEvents.AUTH_RESPONSE, [{ success: false, error: "Parola minim 6 caractere." }]);

        try {
            const result = await AuthService.getInstance().createAccount({ username, pass, email });
            if (!result.success || !result.user) return player.call(ServerEvents.AUTH_RESPONSE, [{ success: false, error: result.error }]);

            PlayerUtils.setDb(player, result.user);
            player.name = result.user.username;
            player.spawn(new mp.Vector3(-425, 1123, 325));

            player.call(ServerEvents.AUTH_RESPONSE, [{ success: true }]);
            HUDUtils.update(player);
            Logger.info(`[Auth] Account created: ${username}`);
        } catch (e: any) {
            Logger.error("Register Error:", e.message);
            player.call(ServerEvents.AUTH_RESPONSE, [{ success: false, error: "Registration error." }]);
        }
    }
}
