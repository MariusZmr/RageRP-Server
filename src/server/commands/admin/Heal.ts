import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "heal",
    description: "Ofera viata si armura (100%) tie sau unui alt jucator.",
    usage: "/heal [id optional]",
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player, args) => {
        let target = player;

        if (args[0]) {
            const targetPlayer = mp.players.at(parseInt(args[0]));
            if (targetPlayer && mp.players.exists(targetPlayer)) {
                target = targetPlayer;
            } else {
                return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`);
            }
        }

        target.health = 100;
        target.armour = 100;
        
        if (target === player) {
            player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}Ti-ai restabilit semnele vitale.`);
        } else {
            player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}L-ai vindecat pe ${Theme.Primary}${target.name}.`);
            target.outputChatBox(`${Theme.Success}Info: ${Theme.Text}Ai fost vindecat de adminul ${Theme.Primary}${player.name}.`);
        }
    }
});
