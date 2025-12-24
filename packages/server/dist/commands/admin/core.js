"use strict";
var import_CommandRegistry = require("../CommandRegistry");
var import_AdminLevels = require("../../config/AdminLevels");
var import_AuthService = require("../../services/AuthService");
var import_Logger = require("../../utils/Logger");
(0, import_CommandRegistry.register)({
  name: "veh",
  description: "Spawn-eaza un vehicul temporar.",
  usage: "/veh <model>",
  aliases: ["v", "car"],
  minAdmin: import_AdminLevels.AdminLevel.Admin,
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
(0, import_CommandRegistry.register)({
  name: "goto",
  description: "Teleporteaza-te la pozitia unui jucator.",
  usage: "/goto <id>",
  aliases: ["tp"],
  minAdmin: import_AdminLevels.AdminLevel.Moderator,
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
(0, import_CommandRegistry.register)({
  name: "gethere",
  description: "Teleporteaza un jucator la pozitia ta.",
  usage: "/gethere <id>",
  minAdmin: import_AdminLevels.AdminLevel.Admin,
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
(0, import_CommandRegistry.register)({
  name: "setadmin",
  description: "Modifica nivelul administrativ al unui jucator.",
  usage: "/setadmin <id> <nivel 0-5>",
  minAdmin: import_AdminLevels.AdminLevel.Owner,
  category: "admin",
  execute: async (player, args) => {
    if (args.length < 2) return player.outputChatBox("!{#FF0000}Utilizare: !{#FFFFFF}/setadmin <id> <0-5>");
    const target = mp.players.at(parseInt(args[0]));
    const level = parseInt(args[1]);
    if (!target) return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Jucator offline.");
    const db = target.dbData;
    if (db) {
      db.adminLevel = level;
      await db.save();
      player.outputChatBox(`!{#55FF55}Admin: !{#FFFFFF}Gradul lui ${target.name} a fost setat la ${level}.`);
      target.outputChatBox(`!{#FFFF00}Admin: !{#FFFFFF}Ai primit gradul ${level} de la ${player.name}.`);
    }
  }
});
(0, import_CommandRegistry.register)({
  name: "stopserver",
  description: "Opreste serverul si salveaza progresul tuturor jucatorilor.",
  minAdmin: import_AdminLevels.AdminLevel.Owner,
  category: "admin",
  execute: async (player) => {
    mp.players.broadcast("!{#FF0000}SERVER: !{#FFFFFF}Se efectueaza o salvare generala. Serverul se va inchide...");
    import_Logger.Logger.warn(`INCHIDERE SERVER declansata de ${player.name}`);
    const players = mp.players.toArray();
    for (const p of players) {
      await import_AuthService.AuthService.savePlayer(p);
    }
    setTimeout(() => process.exit(0), 1e3);
  }
});
//# sourceMappingURL=core.js.map
