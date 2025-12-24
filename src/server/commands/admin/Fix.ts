import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "fix",
    description: "Repara complet vehiculul in care te afli.",
    aliases: ["repair"],
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player) => {
        if (!player.vehicle) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Nu esti intr-un vehicul.`);
        
        player.vehicle.repair();
        player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}Vehiculul a fost reparat.`);
    }
});
