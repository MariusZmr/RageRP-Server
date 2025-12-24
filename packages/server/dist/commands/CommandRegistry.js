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
var CommandRegistry_exports = {};
__export(CommandRegistry_exports, {
  findCommand: () => findCommand,
  getAllCommands: () => getAllCommands,
  register: () => register
});
module.exports = __toCommonJS(CommandRegistry_exports);
if (!global.commandMap) {
  global.commandMap = /* @__PURE__ */ new Map();
  global.aliasMap = /* @__PURE__ */ new Map();
}
const commands = global.commandMap;
const aliases = global.aliasMap;
function register(cmd) {
  const mainName = cmd.name.toLowerCase();
  commands.set(mainName, cmd);
  if (cmd.aliases) {
    cmd.aliases.forEach((alias) => {
      aliases.set(alias.toLowerCase(), mainName);
    });
  }
}
function findCommand(name) {
  const lowerName = name.toLowerCase();
  const mainName = aliases.get(lowerName) || lowerName;
  return commands.get(mainName);
}
function getAllCommands() {
  return Array.from(commands.values());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findCommand,
  getAllCommands,
  register
});
//# sourceMappingURL=CommandRegistry.js.map
