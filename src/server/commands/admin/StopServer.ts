import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { AuthService } from "../../services/AuthService";
import { Logger } from "../../utils/Logger";

register({
    name: "stopserver",
    description: "Declanseaza procedura de inchidere securizata a serverului.",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player) => {
        mp.players.broadcast(`${Theme.Error}PROTOCOL DE INCHIDERE: ${Theme.Text}Serverul se dezactiveaza pentru mentenanta.`);
        Logger.warn(`INCHIDERE SERVER declansata de administratorul ${player.name}`);
        
        const players = mp.players.toArray();
        for (const p of players) {
            await AuthService.savePlayer(p);
        }
        
        setTimeout(() => process.exit(0), 1500);
    }
});
