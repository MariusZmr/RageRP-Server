"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm = require("typeorm");
var import_express = __toESM(require("express"));
var import_User = require("./models/User");
var import_Logger = require("./utils/Logger");
var import_PlayerEvents = require("./events/PlayerEvents");
var import_CommandManager = require("./commands/CommandManager");
var dotenv = __toESM(require("dotenv"));
dotenv.config();
const AppDataSource = new import_typeorm.DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "roleplay",
  entities: [import_User.User],
  synchronize: true,
  logging: false
});
async function bootstrap() {
  try {
    import_Logger.Logger.info("Se ini\u021Bializeaz\u0103 serverul...");
    await AppDataSource.initialize();
    import_Logger.Logger.info("Conectat cu succes la MariaDB!");
    await import_CommandManager.CommandManager.loadCommands();
    import_PlayerEvents.PlayerEvents.init();
    const app = (0, import_express.default)();
    app.use(import_express.default.json());
    app.get("/status", (req, res) => {
      res.json({ online: mp.players.length, uptime: process.uptime() });
    });
    app.listen(3005, () => {
      import_Logger.Logger.info("API-ul Express ascult\u0103 pe portul 3005");
    });
    import_Logger.Logger.info("Sistem Auth, Stats, Chat & Comenzi activat.");
  } catch (e) {
    import_Logger.Logger.error("Eroare la pornirea serverului:", e.message);
  }
}
bootstrap();
//# sourceMappingURL=index.js.map
