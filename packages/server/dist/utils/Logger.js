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
var Logger_exports = {};
__export(Logger_exports, {
  Logger: () => Logger
});
module.exports = __toCommonJS(Logger_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
class Logger {
  static logFile = import_path.default.join(process.cwd(), "logs", "server.log");
  static format(level, message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/T/, " ").replace(/\..+/, "");
    return `${timestamp} [${level}]: ${message}`;
  }
  static writeToFile(data) {
    if (!import_fs.default.existsSync(import_path.default.dirname(this.logFile))) {
      import_fs.default.mkdirSync(import_path.default.dirname(this.logFile), { recursive: true });
    }
    import_fs.default.appendFileSync(this.logFile, data + "\n");
  }
  static info(message) {
    const msg = this.format("INFO", message);
    console.log("\x1B[32m" + msg + "\x1B[0m");
    this.writeToFile(msg);
  }
  static error(message, stack) {
    const msg = this.format("ERROR", message + (stack ? `
${stack}` : ""));
    console.log("\x1B[31m" + msg + "\x1B[0m");
    this.writeToFile(msg);
  }
  static warn(message) {
    const msg = this.format("WARN", message);
    console.log("\x1B[33m" + msg + "\x1B[0m");
    this.writeToFile(msg);
  }
  static cmd(message) {
    const msg = this.format("CMD", message);
    console.log("\x1B[36m" + msg + "\x1B[0m");
    this.writeToFile(msg);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logger
});
//# sourceMappingURL=Logger.js.map
