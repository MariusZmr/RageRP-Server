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
var AdminLevels_exports = {};
__export(AdminLevels_exports, {
  AdminConfig: () => AdminConfig,
  AdminLevel: () => AdminLevel,
  Theme: () => Theme
});
module.exports = __toCommonJS(AdminLevels_exports);
var AdminLevel = /* @__PURE__ */ ((AdminLevel2) => {
  AdminLevel2[AdminLevel2["Player"] = 0] = "Player";
  AdminLevel2[AdminLevel2["Moderator"] = 1] = "Moderator";
  AdminLevel2[AdminLevel2["Admin"] = 2] = "Admin";
  AdminLevel2[AdminLevel2["SeniorAdmin"] = 3] = "SeniorAdmin";
  AdminLevel2[AdminLevel2["Manager"] = 4] = "Manager";
  AdminLevel2[AdminLevel2["Owner"] = 5] = "Owner";
  return AdminLevel2;
})(AdminLevel || {});
const Theme = {
  Primary: "!{#8B0000}",
  // Roșu Închis (Branding)
  Secondary: "!{#A9A9A9}",
  // Gri pentru detalii
  Text: "!{#E0E0E0}",
  // Text principal
  Success: "!{#27AE60}",
  // Verde premium
  Error: "!{#C0392B}",
  // Roșu eroare
  Divider: "!{#333333}\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC\u25AC"
};
const AdminConfig = {
  [0 /* Player */]: { title: "Jucator", color: Theme.Text },
  [1 /* Moderator */]: { title: "Moderator", color: "!{#2E86C1}" },
  // Steel Blue
  [2 /* Admin */]: { title: "Admin", color: "!{#17A589}" },
  // Teal
  [3 /* SeniorAdmin */]: { title: "Sr. Admin", color: "!{#D4AC0D}" },
  // Muted Gold
  [4 /* Manager */]: { title: "Manager", color: "!{#8E44AD}" },
  // Amethyst
  [5 /* Owner */]: { title: "Owner", color: Theme.Primary }
  // Dark Red
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminConfig,
  AdminLevel,
  Theme
});
//# sourceMappingURL=AdminLevels.js.map
