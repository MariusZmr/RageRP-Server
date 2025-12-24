import { register, getAllCommands } from "../CommandRegistry";
import { AuthService } from "../../services/AuthService";
import { AdminTitles } from "../../config/AdminLevels";

register({
    name: "help",
    description: "Afiseaza toate comenzile disponibile in functie de categoria lor.",
    aliases: ["h", "comenzi"],
    category: "general",
    execute: (player) => {
        const user = (player as any).dbData;
        const allCmds = getAllCommands();
        
        player.outputChatBox("!{#FFFF00}======= [ LISTA COMENZI ] =======");
        
        const categories: Record<string, string[]> = {};
        allCmds.forEach(cmd => {
            if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) return;
            
            if (!categories[cmd.category]) categories[cmd.category] = [];
            const aliasStr = cmd.aliases ? ` (${cmd.aliases.join(", ")})` : "";
            categories[cmd.category].push(`!{#FFFFFF}/${cmd.name}${aliasStr}`);
        });

        Object.keys(categories).forEach(cat => {
            player.outputChatBox(`!{#55FF55}[${cat.toUpperCase()}]: !{#FFFFFF}${categories[cat].join(", ")}`);
        });
        player.outputChatBox("!{#FFFF00}==================================");
    }
});

register({
    name: "register",
    description: "Creeaza un cont nou de utilizator pe server.",
    usage: "/register <parola>",
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/register <parola>");
        AuthService.register(player, player.name, args[0]);
    }
});

register({
    name: "login",
    description: "Autentifica-te pe contul tau existent.",
    usage: "/login <parola>",
    aliases: ["l", "auth"],
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/login <parola>");
        AuthService.login(player, player.name, args[0]);
    }
});

register({
    name: "stats",
    description: "Vizualizeaza informatiile detaliate despre personajul tau.",
    aliases: ["s", "myinfo"],
    category: "general",
    execute: (player) => {
        const db = (player as any).dbData;
        if (!db) return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Nu esti logat.");

        const title = AdminTitles[db.adminLevel] || "Jucator";
        player.outputChatBox(`!{#FFFF00}--- Statistica Personaj: ${db.username} ---`);
        player.outputChatBox(`!{#FFFFFF}ID: !{#55FF55}${player.id} !{#FFFFFF}| Level: !{#55FF55}${db.level} !{#FFFFFF}| Exp: !{#55FF55}${db.exp}/5`);
        player.outputChatBox(`!{#FFFFFF}Grad: !{#55FF55}${title} !{#FFFFFF}| Bani: !{#00FF00}$${db.money.toLocaleString()}`);
        player.outputChatBox(`!{#FFFFFF}Banca: !{#00FF00}$${db.bank.toLocaleString()} !{#FFFFFF}| Warns: !{#FF0000}${db.warns}/3`);
        player.outputChatBox("!{#FFFF00}---------------------------------------");
    }
});