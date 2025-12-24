import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "setadmin",
    description: "Modifica nivelul de autoritate al unui membru din personal.",
    usage: "/setadmin <id> <nivel 0-5>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        if (args.length < 2) return player.outputChatBox(`${Theme.Error}Info: ${Theme.Text}Utilizeaza /setadmin <id> <nivel>`);
        
        const target = mp.players.at(parseInt(args[0]));
        const level = parseInt(args[1]);
        
        if (!target) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Utilizatorul tinta nu a fost gasit.`);
        if (isNaN(level) || level < 0 || level > 5) return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Nivel invalid (0-5).`);

        const db = (target as any).dbData;
        if (db) {
            db.adminLevel = level;
            await db.save();
            player.outputChatBox(`${Theme.Primary}Sistem: ${Theme.Text}Statutul lui ${Theme.Primary}${target.name} ${Theme.Text}a fost actualizat la ${Theme.Primary}Nivel ${level}${Theme.Text}.`);
            target.outputChatBox(`${Theme.Primary}Autoritate: ${Theme.Text}Accesul tau a fost modificat de ${Theme.Primary}${player.name} ${Theme.Text}la ${Theme.Primary}Nivel ${level}${Theme.Text}.`);
        }
    }
});
