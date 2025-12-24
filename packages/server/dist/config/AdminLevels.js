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
  AdminLevel: () => AdminLevel
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
const AdminConfig = {
  [0 /* Player */]: { title: "", color: "!{#FFFFFF}" },
  [1 /* Moderator */]: { title: "[Moderator] ", color: "!{#55FF55}" },
  [2 /* Admin */]: { title: "[Admin] ", color: "!{#3399FF}" },
  [3 /* SeniorAdmin */]: { title: "[Sr. Admin] ", color: "!{#FF9900}" },
  [4 /* Manager */]: { title: "[Manager] ", color: "!{#FF33CC}" },
  [5 /* Owner */]: { title: "[Owner] ", color: "!{#AA0000}" }
  // Roșu închis profesional
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminConfig,
  AdminLevel
});
//# sourceMappingURL=AdminLevels.js.map
