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
class AuthService {
  static async register(player, username, pass) {
    try {
      if (pass.length < 4) {
        return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Parola trebuie sa aiba minim 4 caractere.");
      }
      const existing = await import_User.User.findOneBy({ username });
      if (existing) {
        return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Acest nume este deja utilizat.");
      }
      const hashed = await import_bcryptjs.default.hash(pass, 10);
      const userCount = await import_User.User.count();
      const newUser = new import_User.User();
      newUser.username = username;
      newUser.password = hashed;
      newUser.adminLevel = userCount === 0 ? 5 : 0;
      await newUser.save();
      player.outputChatBox("!{#00FF00}Succes: !{#FFFFFF}Cont creat cu succes! Te poti loga.");
      import_Logger.Logger.info(`[AUTH] ${username} s-a inregistrat.`);
    } catch (e) {
      import_Logger.Logger.error("Eroare la inregistrare:", e.message);
    }
  }
  static async login(player, username, pass) {
    try {
      if (import_PlayerUtils.PlayerUtils.getDb(player)) {
        return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Esti deja logat.");
      }
      const user = await import_User.User.findOneBy({ username });
      if (!user) {
        return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Contul nu exista.");
      }
      if (user.isBanned) {
        return player.outputChatBox(`!{#FF0000}Esti banat pe acest server! Motiv: ${user.banReason}`);
      }
      const match = await import_bcryptjs.default.compare(pass, user.password);
      if (!match) {
        return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Parola este incorecta.");
      }
      import_PlayerUtils.PlayerUtils.setDb(player, user);
      player.name = user.username;
      const pos = JSON.parse(user.lastPos);
      player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
      player.dimension = user.dimension;
      player.health = user.health;
      player.armour = user.armor;
      player.outputChatBox(`!{#00FF00}Bine ai revenit, !{#FFFFFF}${username}!`);
      player.outputChatBox(`!{#FFFF00}Stats: !{#FFFFFF}Level ${user.level} | Bani: $${user.money.toLocaleString()}`);
      import_Logger.Logger.info(`[AUTH] ${username} s-a logat.`);
    } catch (e) {
      import_Logger.Logger.error("Eroare la login:", e.message);
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
      import_Logger.Logger.error(`Eroare la salvarea lui ${user.username}:`, e.message);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthService
});
//# sourceMappingURL=AuthService.js.map
