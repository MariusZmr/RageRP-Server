"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var AuthService_exports = {};
__export(AuthService_exports, {
  AuthService: () => AuthService
});
module.exports = __toCommonJS(AuthService_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_User = require("../models/User");
var import_Logger = require("../utils/Logger");
var import_PlayerUtils = require("../utils/PlayerUtils");
var import_AdminLevels = require("../config/AdminLevels");
class AuthService {
  static async register(player, username, pass) {
    try {
      if (pass.length < 6) {
        return player.outputChatBox(`${import_AdminLevels.Theme.Error}Securitate: ${import_AdminLevels.Theme.Text}Parola este prea scurta (minim 6 caractere).`);
      }
      const existing = await import_User.User.findOneBy({ username });
      if (existing) {
        return player.outputChatBox(`${import_AdminLevels.Theme.Error}Eroare: ${import_AdminLevels.Theme.Text}Acest cont este deja inregistrat.`);
      }
      const hashed = await import_bcryptjs.default.hash(pass, 10);
      const userCount = await import_User.User.count();
      const newUser = new import_User.User();
      newUser.username = username;
      newUser.password = hashed;
      newUser.adminLevel = userCount === 0 ? 5 : 0;
      await newUser.save();
      player.outputChatBox(`${import_AdminLevels.Theme.Success}Succes: ${import_AdminLevels.Theme.Text}Contul tau a fost creat. Te rugam sa folosesti ${import_AdminLevels.Theme.Primary}/login <parola>`);
      import_Logger.Logger.info(`[AUTH] Utilizator nou: ${username}`);
    } catch (e) {
      import_Logger.Logger.error("Eroare inregistrare:", e.message);
    }
  }
  static async login(player, username, pass) {
    try {
      if (import_PlayerUtils.PlayerUtils.getDb(player)) {
        return player.outputChatBox(`${import_AdminLevels.Theme.Error}Sistem: ${import_AdminLevels.Theme.Text}Esti deja autentificat.`);
      }
      const user = await import_User.User.findOneBy({ username });
      if (!user) {
        return player.outputChatBox(`${import_AdminLevels.Theme.Error}Eroare: ${import_AdminLevels.Theme.Text}Numele de utilizator nu este valid.`);
      }
      if (user.isBanned) {
        player.outputChatBox(`${import_AdminLevels.Theme.Error}RESTRIC\u021AIONAT: ${import_AdminLevels.Theme.Text}Acces interzis. Motiv: ${import_AdminLevels.Theme.Primary}${user.banReason}`);
        return player.kick("Banned");
      }
      const match = await import_bcryptjs.default.compare(pass, user.password);
      if (!match) {
        return player.outputChatBox(`${import_AdminLevels.Theme.Error}Eroare: ${import_AdminLevels.Theme.Text}Parola introdusa este incorecta.`);
      }
      import_PlayerUtils.PlayerUtils.setDb(player, user);
      player.name = user.username;
      const pos = JSON.parse(user.lastPos);
      player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
      player.dimension = user.dimension;
      player.health = user.health;
      player.armour = user.armor;
      player.outputChatBox(`${import_AdminLevels.Theme.Success}Sistem: ${import_AdminLevels.Theme.Text}Autentificare reusita. Bun venit, ${import_AdminLevels.Theme.Primary}${username}!`);
      import_Logger.Logger.info(`[AUTH] ${username} s-a autentificat.`);
    } catch (e) {
      import_Logger.Logger.error("Eroare login:", e.message);
    }
  }
  static async savePlayer(player) {
    const user = import_PlayerUtils.PlayerUtils.getDb(player);
    if (!user || !mp.players.exists(player)) return;
    user.health = player.health;
    user.armor = player.armour;
    user.dimension = player.dimension;
    user.lastPos = JSON.stringify({ x: player.position.x, y: player.position.y, z: player.position.z });
    try {
      await user.save();
    } catch (e) {
      import_Logger.Logger.error(`Eroare salvare ${user.username}:`, e.message);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthService
});
//# sourceMappingURL=AuthService.js.map
