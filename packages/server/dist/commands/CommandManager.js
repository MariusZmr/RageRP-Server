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
var import_AdminLevels = require("../config/AdminLevels");
class CommandManager {
  static async loadCommands() {
    const commandsPath = __dirname;
    const totalFiles = this.readDirRecursive(commandsPath);
    const commands = (0, import_CommandRegistry.getAllCommands)();
    import_Logger.Logger.info(`[CMD] Sistem Enterprise activat. ${commands.length} comenzi din ${totalFiles} module.`);
  }
  static readDirRecursive(dir) {
    let count = 0;
    const items = import_fs.default.readdirSync(dir);
    for (const item of items) {
      const fullPath = import_path.default.join(dir, item);
      if (import_fs.default.statSync(fullPath).isDirectory()) {
        count += this.readDirRecursive(fullPath);
      } else if (item.endsWith(".js") && !item.includes("CommandManager") && !item.includes("CommandRegistry")) {
        try {
          delete require.cache[require.resolve(fullPath)];
          require(fullPath);
          count++;
        } catch (e) {
          import_Logger.Logger.error(`Eroare la modulul ${item}:`, e.message);
        }
      }
    }
    return count;
  }
  static handleCommand(player, message) {
    var _a;
    const args = message.split(" ");
    const trigger = (_a = args.shift()) == null ? void 0 : _a.toLowerCase();
    if (!trigger) return;
    const cmd = (0, import_CommandRegistry.findCommand)(trigger);
    if (!cmd) {
      player.outputChatBox(`${import_AdminLevels.Theme.Error}Eroare: ${import_AdminLevels.Theme.Text}Comanda ${import_AdminLevels.Theme.Primary}/${trigger}${import_AdminLevels.Theme.Text} nu exista. Foloseste ${import_AdminLevels.Theme.Primary}/help.`);
      return;
    }
    const user = import_PlayerUtils.PlayerUtils.getDb(player);
    if (!user && cmd.name !== "login" && cmd.name !== "register") {
      player.outputChatBox(`${import_AdminLevels.Theme.Error}Sistem: ${import_AdminLevels.Theme.Text}Trebuie sa te autentifici pentru a accesa sistemul.`);
      return;
    }
    if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
      player.outputChatBox(`${import_AdminLevels.Theme.Error}Securitate: ${import_AdminLevels.Theme.Text}Nivel de acces insuficient.`);
      return;
    }
    try {
      cmd.execute(player, args, args.join(" "));
    } catch (e) {
      import_Logger.Logger.error(`Eroare executie /${cmd.name}:`, e.stack);
      player.outputChatBox(`${import_AdminLevels.Theme.Error}Eroare: ${import_AdminLevels.Theme.Text}Procesare esuata.`);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandManager
});
//# sourceMappingURL=CommandManager.js.map
