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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var User_exports = {};
__export(User_exports, {
  User: () => User
});
module.exports = __toCommonJS(User_exports);
var import_typeorm = require("typeorm");
let User = class extends import_typeorm.BaseEntity {
  id;
  username;
  password;
  email;
  adminLevel;
  helperLevel;
  vipLevel;
  level;
  exp;
  money;
  bank;
  health;
  armor;
  hunger;
  thirst;
  jobId;
  factionId;
  factionRank;
  lastPos;
  dimension;
  warns;
  isBanned;
  banReason;
  createdAt;
  updatedAt;
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)()
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 50, unique: true })
], User.prototype, "username", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 255 })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 100, nullable: true })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "adminLevel", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "helperLevel", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "vipLevel", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 1 })
], User.prototype, "level", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "exp", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "bigint", default: 1e4, transformer: { to: (v) => v, from: (v) => parseInt(v) } })
], User.prototype, "money", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "bigint", default: 5e4, transformer: { to: (v) => v, from: (v) => parseInt(v) } })
], User.prototype, "bank", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 100 })
], User.prototype, "health", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "armor", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 100 })
], User.prototype, "hunger", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 100 })
], User.prototype, "thirst", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "jobId", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "factionId", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "factionRank", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 255, default: '{"x": -425.5, "y": 1123.3, "z": 325.8}' })
], User.prototype, "lastPos", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "dimension", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "warns", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], User.prototype, "isBanned", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 255, nullable: true })
], User.prototype, "banReason", 2);
__decorateClass([
  (0, import_typeorm.CreateDateColumn)()
], User.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm.UpdateDateColumn)()
], User.prototype, "updatedAt", 2);
User = __decorateClass([
  (0, import_typeorm.Entity)("users")
], User);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User
});
//# sourceMappingURL=User.js.map
