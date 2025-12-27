import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { HUDUtils } from "../../utils/HUDUtils";

register({
    name: "setmoney",
    description: "Seteaza suma de bani lichizi a unui jucator.",
    usage: "/setmoney <id> <suma>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        if (!args[1]) return player.outputChatBox(`${Theme.Error}Folosire: ${Theme.Text}/setmoney <id> <suma>`);
        
        const target = mp.players.at(parseInt(args[0]));
        const amount = parseInt(args[1]);

        if (!target || !mp.players.exists(target)) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`);
        if (isNaN(amount)) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Suma invalida.`);

        const char = PlayerUtils.getCharacter(target);
        if (char) {
            char.money = amount;
            await char.save();
            
            // Actualizăm HUD-ul țintei
            HUDUtils.update(target);

            player.outputChatBox(`${Theme.Success}Sistem: ${Theme.Text}I-ai setat lui ${Theme.Primary}${target.name} ${Theme.Text}suma de ${Theme.Success}$${amount.toLocaleString()} (Caracter: ${char.firstName} ${char.lastName}).`);
            target.outputChatBox(`${Theme.Primary}Sistem: ${Theme.Text}Soldul caracterului a fost actualizat la ${Theme.Success}$${amount.toLocaleString()} ${Theme.Text}de catre admin.`);
        } else {
             player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu are un caracter selectat.`);
        }
    }
});
