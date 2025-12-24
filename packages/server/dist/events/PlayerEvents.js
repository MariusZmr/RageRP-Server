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
var import_User = require("../models/User");
var import_PlayerUtils = require("../utils/PlayerUtils");
var import_AdminLevels = require("../config/AdminLevels");
var import_CommandManager = require("../commands/CommandManager");
var import_AuthService = require("../services/AuthService");
class PlayerEvents {
  static init() {
    mp.events.add("playerJoin", async (player) => {
      const user = await import_User.User.findOneBy({ username: player.name });
      player.outputChatBox(import_AdminLevels.Theme.Divider);
      player.outputChatBox(`${import_AdminLevels.Theme.Text}Bun venit pe ${import_AdminLevels.Theme.Primary}ServerServeros${import_AdminLevels.Theme.Text}, ${import_AdminLevels.Theme.Primary}${player.name}${import_AdminLevels.Theme.Text}.`);
      if (user) {
        player.outputChatBox(`${import_AdminLevels.Theme.Secondary}Sistem: ${import_AdminLevels.Theme.Text}Contul tau este securizat. Foloseste ${import_AdminLevels.Theme.Success}/login <parola>${import_AdminLevels.Theme.Text}.`);
      } else {
        player.outputChatBox(`${import_AdminLevels.Theme.Secondary}Sistem: ${import_AdminLevels.Theme.Text}Numele tau nu este inregistrat. Foloseste ${import_AdminLevels.Theme.Primary}/register <parola>${import_AdminLevels.Theme.Text}.`);
      }
      player.outputChatBox(import_AdminLevels.Theme.Divider);
      import_Logger.Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
    });
    mp.events.add("playerChat", (player, message) => {
      const db = import_PlayerUtils.PlayerUtils.getDb(player);
      if (!db) {
        player.outputChatBox(`${import_AdminLevels.Theme.Error}Sistem: ${import_AdminLevels.Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`);
        return;
      }
      const config = import_AdminLevels.AdminConfig[db.adminLevel];
      const titlePrefix = db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
      const formattedMsg = `${titlePrefix}${import_AdminLevels.Theme.Text}${player.name} ${import_AdminLevels.Theme.Secondary}(${player.id})${import_AdminLevels.Theme.Text}: ${import_AdminLevels.Theme.Text}${message}`;
      mp.players.forEachInRange(player.position, 20, (nearPlayer) => {
        nearPlayer.outputChatBox(formattedMsg);
      });
      import_Logger.Logger.info(`[CHAT] ${player.name}: ${message}`);
    });
    mp.events.add("playerCommand", (player, message) => {
      import_CommandManager.CommandManager.handleCommand(player, message);
    });
    mp.events.add("playerQuit", async (player, exitType) => {
      const db = import_PlayerUtils.PlayerUtils.getDb(player);
      if (db) {
        await import_AuthService.AuthService.savePlayer(player);
        import_Logger.Logger.info(`[QUIT] ${player.name} a parasit sesiunea.`);
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlayerEvents
});
//# sourceMappingURL=PlayerEvents.js.map
