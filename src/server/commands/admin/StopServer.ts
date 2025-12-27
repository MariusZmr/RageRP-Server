import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { Logger } from "../../utils/Logger";
import { TimeManager } from "../../managers/TimeManager";
import { User } from "../../database/entities/User";
import { Character } from "../../database/entities/Character";

register({
    name: "stopserver",
    description: "Declanseaza procedura de inchidere securizata a serverului.",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player) => {
        mp.players.broadcast(`${Theme.Error}PROTOCOL DE INCHIDERE: ${Theme.Text}Serverul se dezactiveaza pentru mentenanta.`);
        Logger.warn(`INCHIDERE SERVER declansata de administratorul ${player.name}`);
        
        const players = mp.players.toArray();
        Logger.info(`[SHUTDOWN] Se salveaza datele pentru ${players.length} jucatori...`);

        for (const p of players) {
            const user = (p as any).dbData as User;
            const char = (p as any).activeCharacter as Character;
            
            if (user && char) {
                await TimeManager.forceSave(user, char);
            }
        }
        
        Logger.info(`[SHUTDOWN] Toate datele au fost salvate. Inchidere proces...`);
        setTimeout(() => process.exit(0), 1500);
    }
});