import { register, getAllCommands } from "../CommandRegistry";
import { AuthService } from "../../services/AuthService";

register({
    name: "help",
    description: "Vizualizeaza lista de comenzi si informatii despre server.",
    aliases: ["h", "cmds", "commands"],
    category: "general",
    execute: (player) => {
        const db = (player as any).dbData;
        const allCmds = getAllCommands();
        
        player.outputChatBox("!{#AA0000}==== [ ServerServeros - Help ] ====");
        
        const cats: Record<string, string[]> = {};
        allCmds.forEach(cmd => {
            if (cmd.minAdmin && (!db || db.adminLevel < cmd.minAdmin)) return;
            if (!cats[cmd.category]) cats[cmd.category] = [];
            cats[cmd.category].push(`!{#FFFFFF}/${cmd.name}`);
        });

        Object.keys(cats).forEach(category => {
            player.outputChatBox(`!{#AA0000}>> !{#FFFFFF}${category.toUpperCase()}: ${cats[category].join(", ")}`);
        });
        player.outputChatBox("!{#AA0000}==================================");
    }
});

register({
    name: "stats",
    description: "Afiseaza statisticile detaliate ale contului tau.",
    aliases: ["s", "status", "me"],
    category: "general",
    execute: (player) => {
        const db = (player as any).dbData;
        if (!db) return;

        player.outputChatBox(`!{#AA0000}==== [ Informatii Personaj: ${player.name} ] ====`);
        player.outputChatBox(`!{#FFFFFF}ID: !{#AA0000}${player.id} !{#FFFFFF}| Level: !{#AA0000}${db.level} !{#FFFFFF}| Exp: !{#AA0000}${db.exp}/10`);
        player.outputChatBox(`!{#FFFFFF}Bani Cash: !{#55FF55}$${db.money.toLocaleString()} !{#FFFFFF}| Banca: !{#55FF55}$${db.bank.toLocaleString()}`);
        player.outputChatBox(`!{#FFFFFF}Sanatate: !{#FF5555}${player.health}% !{#FFFFFF}| Armura: !{#3399FF}${player.armour}%`);
        player.outputChatBox("!{#AA0000}==================================================");
    }
});

register({
    name: "register",
    description: "Inregistreaza un cont nou cu numele curent.",
    usage: "/register <parola>",
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#AA0000}Utilizare: !{#FFFFFF}/register <parola>");
        AuthService.register(player, player.name, args[0]);
    }
});

register({
    name: "login",
    description: "Conecteaza-te la contul tau.",
    usage: "/login <parola>",
    aliases: ["auth"],
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#AA0000}Utilizare: !{#FFFFFF}/login <parola>");
        AuthService.login(player, player.name, args[0]);
    }
});
