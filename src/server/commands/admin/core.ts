import { register } from "../CommandRegistry";
import { AdminLevel } from "../../config/AdminLevels";
import { AuthService } from "../../services/AuthService";
import { Logger } from "../../utils/Logger";

register({
    name: "veh",
    description: "Spawn-eaza un vehicul temporar.",
    usage: "/veh <model>",
    aliases: ["v", "car"],
    minAdmin: AdminLevel.Admin,
    category: "admin",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/veh <model>");
        const model = args[0];
        try {
            const veh = mp.vehicles.new(mp.joaat(model), player.position, {
                heading: player.heading,
                dimension: player.dimension
            });
            player.putIntoVehicle(veh, 0);
            player.outputChatBox(`!{#55FF55}Vehicul spawnat cu succes: !{#FFFFFF}${model}`);
        } catch (e) {
            player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Modelul vehiculului este invalid.");
        }
    }
});

register({
    name: "goto",
    description: "Teleporteaza-te la pozitia unui jucator.",
    usage: "/goto <id>",
    aliases: ["tp"],
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/goto <id>");
        const target = mp.players.at(parseInt(args[0]));
        if (!target) return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Jucator offline.");
        
        player.position = target.position;
        player.dimension = target.dimension;
        player.outputChatBox(`!{#55FF55}Info: !{#FFFFFF}Te-ai teleportat la ${target.name}.`);
    }
});

register({
    name: "gethere",
    description: "Teleporteaza un jucator la pozitia ta.",
    usage: "/gethere <id>",
    minAdmin: AdminLevel.Admin,
    category: "admin",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/gethere <id>");
        const target = mp.players.at(parseInt(args[0]));
        if (!target) return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Jucator offline.");
        
        target.position = player.position;
        target.dimension = player.dimension;
        player.outputChatBox(`!{#55FF55}Info: !{#FFFFFF}L-ai adus pe ${target.name} la tine.`);
        target.outputChatBox(`!{#FFFF00}Info: !{#FFFFFF}Adminul ${player.name} te-a adus la el.`);
    }
});

register({
    name: "setadmin",
    description: "Modifica nivelul administrativ al unui jucator.",
    usage: "/setadmin <id> <nivel 0-5>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        if (args.length < 2) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/setadmin <id> <0-5>");
        const target = mp.players.at(parseInt(args[0]));
        const level = parseInt(args[1]);
        if (!target) return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Jucator offline.");
        
        const db = (target as any).dbData;
        if (db) {
            db.adminLevel = level;
            await db.save();
            player.outputChatBox(`!{#55FF55}Admin: !{#FFFFFF}Gradul lui ${target.name} a fost setat la ${level}.`);
            target.outputChatBox(`!{#FFFF00}Admin: !{#FFFFFF}Ai primit gradul ${level} de la ${player.name}.`);
        }
    }
});

register({
    name: "stopserver",
    description: "Opreste serverul si salveaza progresul tuturor jucatorilor.",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player) => {
        mp.players.broadcast("!{#FF0000}SERVER: !{#FFFFFF}Se efectueaza o salvare generala. Serverul se va inchide...");
        Logger.warn(`INCHIDERE SERVER declansata de ${player.name}`);
        
        const players = mp.players.toArray();
        for (const p of players) {
            await AuthService.savePlayer(p);
        }
        
        setTimeout(() => process.exit(0), 1000);
    }
});