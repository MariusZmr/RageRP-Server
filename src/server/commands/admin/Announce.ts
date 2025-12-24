import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "announce",
    aliases: ["ann", "global"],
    description: "Trimite un anunt global catre toti jucatorii.",
    usage: "/announce <mesaj>",
    minAdmin: AdminLevel.Admin,
    category: "admin",
    execute: (player, args, fullText) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Folosire: ${Theme.Text}/announce <mesaj>`);
        
        // Broadcast trimite mesajul tuturor
        mp.players.broadcast(`${Theme.Error}ANUNT: ${Theme.Text}${fullText}`);
        mp.players.broadcast(`${Theme.Secondary}(Trimis de: ${player.name})`);
    }
});
