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
var PlayerUtils_exports = {};
__export(PlayerUtils_exports, {
  PlayerUtils: () => PlayerUtils
});
module.exports = __toCommonJS(PlayerUtils_exports);
class PlayerUtils {
  static getDb(player) {
    if (!player || !mp.players.exists(player)) return void 0;
    return player.dbData;
  }
  static setDb(player, data) {
    if (!player || !mp.players.exists(player)) return;
    player.dbData = data;
  }
  static updateDb(player, updates) {
    const db = this.getDb(player);
    if (db) {
      Object.assign(db, updates);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlayerUtils
});
//# sourceMappingURL=PlayerUtils.js.map
