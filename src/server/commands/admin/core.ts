import { register } from "../CommandRegistry";
import { AdminLevel } from "../../config/AdminLevels";
import { AuthService } from "../../services/AuthService";

register({
    name: "veh",
    description: "Creeaza un vehicul personalizat.",
    usage: "/veh <model>",
    aliases: ["v", "spawn"],
    minAdmin: AdminLevel.Admin,
    category: "admin",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox("!{#AA0000}Utilizare: !{#FFFFFF}/veh <model>");
        const veh = mp.vehicles.new(mp.joaat(args[0]), player.position, { heading: player.heading });
        player.putIntoVehicle(veh, 0);
        player.outputChatBox(`!{#AA0000}Admin: !{#FFFFFF}Ai spawnat un !{#FFFF00}${args[0]}!{#FFFFFF}.`);
    }
});

register({
    name: "goto",
    description: "Teleportare rapida la un jucator.",
    usage: "/goto <id>",
    aliases: ["tp"],
    minAdmin: AdminLevel.Moderator,
    category: "admin",
    execute: (player, args) => {
        const target = mp.players.at(parseInt(args[0]));
        if (target) {
            player.position = target.position;
            player.outputChatBox(`!{#AA0000}Admin: !{#FFFFFF}Te-ai teleportat la ${target.name}.`);
        }
    }
});

register({
    name: "setadmin",
    description: "Sistem de management grade.",
    usage: "/setadmin <id> <nivel>",
    minAdmin: AdminLevel.Owner,
    category: "admin",
    execute: async (player, args) => {
        const target = mp.players.at(parseInt(args[0]));
        const level = parseInt(args[1]);
        if (target && (target as any).dbData) {
            (target as any).dbData.adminLevel = level;
            await (target as any).dbData.save();
            player.outputChatBox(`!{#AA0000}Admin: !{#FFFFFF}I-ai setat gradul !{#AA0000}${level} !{#FFFFFF}lui ${target.name}.`);
        }
    }
});
