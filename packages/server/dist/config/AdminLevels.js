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
  AdminLevel: () => AdminLevel,
  AdminTitles: () => AdminTitles
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
const AdminTitles = {
  [0 /* Player */]: "",
  [1 /* Moderator */]: "[Moderator]",
  [2 /* Admin */]: "[Admin]",
  [3 /* SeniorAdmin */]: "[Sr. Admin]",
  [4 /* Manager */]: "[Manager]",
  [5 /* Owner */]: "[Owner]"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminLevel,
  AdminTitles
});
//# sourceMappingURL=AdminLevels.js.map
