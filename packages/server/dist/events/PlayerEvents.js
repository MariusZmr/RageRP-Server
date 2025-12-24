"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var PlayerEvents_exports = {};
__export(PlayerEvents_exports, {
  PlayerEvents: () => PlayerEvents
});
module.exports = __toCommonJS(PlayerEvents_exports);
var import_Logger = require("../utils/Logger");
var import_AuthService = require("../services/AuthService");
var import_CommandManager = require("../commands/CommandManager");
var import_PlayerUtils = require("../utils/PlayerUtils");
var import_AdminLevels = require("../config/AdminLevels");
class PlayerEvents {
  static init() {
    mp.events.add("playerJoin", (player) => {
      import_Logger.Logger.info(`[JOIN] ${player.name} s-a conectat (IP: ${player.ip}).`);
      player.outputChatBox("!{#FFFF00}Bine ai venit pe ServerServeros!");
      player.outputChatBox("Serverul foloseste TypeScript si MariaDB.");
      player.outputChatBox("!{#FFFFFF}Foloseste /register <parola> sau /login <parola>.");
    });
    mp.events.add("playerQuit", async (player, exitType) => {
      const user = import_PlayerUtils.PlayerUtils.getDb(player);
      if (user) {
        await import_AuthService.AuthService.savePlayer(player);
        import_Logger.Logger.info(`[QUIT] ${user.username} a iesit (${exitType}). Date salvate.`);
      }
      import_PlayerUtils.PlayerUtils.setDb(player, void 0);
    });
    mp.events.add("playerChat", (player, message) => {
      const user = import_PlayerUtils.PlayerUtils.getDb(player);
      if (!user) {
        player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Trebuie sa fii logat pentru a scrie.");
        return;
      }
      const title = import_AdminLevels.AdminTitles[user.adminLevel] || "";
      const color = user.adminLevel > 0 ? "!{#FFD700}" : "!{#FFFFFF}";
      const formattedMsg = `!{#BBBBBB}[${player.id}] ${title}${color}${user.username} says: !{#FFFFFF}${message}`;
      mp.players.forEachInRange(player.position, 15, (nearPlayer) => {
        nearPlayer.outputChatBox(formattedMsg);
      });
      import_Logger.Logger.info(`[CHAT] ${user.username}: ${message}`);
    });
    mp.events.add("playerCommand", (player, message) => {
      import_CommandManager.CommandManager.handleCommand(player, message);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlayerEvents
});
//# sourceMappingURL=PlayerEvents.js.map
