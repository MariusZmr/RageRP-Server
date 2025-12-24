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
var CommandManager_exports = {};
__export(CommandManager_exports, {
  CommandManager: () => CommandManager
});
module.exports = __toCommonJS(CommandManager_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_Logger = require("../utils/Logger");
var import_CommandRegistry = require("./CommandRegistry");
var import_PlayerUtils = require("../utils/PlayerUtils");
class CommandManager {
  static async loadCommands() {
    const commandsPath = __dirname;
    const categories = ["admin", "general", "roleplay"];
    for (const cat of categories) {
      const catPath = import_path.default.join(commandsPath, cat);
      if (!import_fs.default.existsSync(catPath)) continue;
      const files = import_fs.default.readdirSync(catPath).filter((f) => f.endsWith(".js"));
      for (const file of files) {
        try {
          const fullPath = import_path.default.join(catPath, file);
          delete require.cache[require.resolve(fullPath)];
          require(fullPath);
        } catch (e) {
          import_Logger.Logger.error(`[CMD] Eroare la incarcarea fi\u0219ierului ${file}:`, e.message);
        }
      }
    }
    const totalCmds = (0, import_CommandRegistry.getAllCommands)();
    import_Logger.Logger.info(`[CMD] Sistem activat. ${totalCmds.length} comenzi principale incarcate.`);
  }
  static handleCommand(player, message) {
    var _a;
    const args = message.split(" ");
    const cmdTrigger = (_a = args.shift()) == null ? void 0 : _a.toLowerCase();
    if (!cmdTrigger) return;
    const cmd = (0, import_CommandRegistry.findCommand)(cmdTrigger);
    if (!cmd) {
      player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Comanda !{#FFFF00}/" + cmdTrigger + " !{#FFFFFF}nu exista. Foloseste !{#55FF55}/help.");
      return;
    }
    const user = import_PlayerUtils.PlayerUtils.getDb(player);
    if (!user && cmd.name !== "login" && cmd.name !== "register") {
      player.outputChatBox("!{#FF0000}Autentificare: !{#FFFFFF}Trebuie sa fii logat pentru a folosi comenzile.");
      return;
    }
    if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
      player.outputChatBox("!{#FF0000}Permisiuni: !{#FFFFFF}Nu ai acces la aceasta comanda (Min Admin: " + cmd.minAdmin + ").");
      return;
    }
    try {
      cmd.execute(player, args, args.join(" "));
    } catch (e) {
      import_Logger.Logger.error(`Eroare fatala la comanda /${cmd.name}:`, e.stack);
      player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}A intervenit o eroare interna la procesarea comenzii.");
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandManager
});
//# sourceMappingURL=CommandManager.js.map
