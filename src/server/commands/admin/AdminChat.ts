import { register } from "../CommandRegistry";
import { AdminLevel, Theme, AdminConfig } from "../../config/AdminLevels";
import { PlayerUtils } from "../../utils/PlayerUtils";

register({
    name: "adminchat",
    aliases: ["a"],
    description: "Chat intern pentru administratie.",
    usage: "/a <mesaj>",
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player, args, fullText) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Folosire: ${Theme.Text}/a <mesaj>`);
        
        const senderDb = PlayerUtils.getDb(player);
        if (!senderDb) return;

        const adminConfig = AdminConfig[senderDb.adminLevel as keyof typeof AdminConfig];
        // Format: [ADMIN] (Grad) Nume: Mesaj
        const msg = `${Theme.Primary}[STAFF] ${adminConfig.color}(${adminConfig.title}) ${Theme.Text}${player.name}: ${fullText}`;

        mp.players.forEach((p) => {
            const db = PlayerUtils.getDb(p);
            if (db && db.adminLevel >= AdminLevel.Moderator) {
                p.outputChatBox(msg);
            }
        });
    }
});
