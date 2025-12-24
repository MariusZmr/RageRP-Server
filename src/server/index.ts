import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./models/User";
import { Logger } from "./utils/Logger";
import { PlayerEvents } from "./events/PlayerEvents";
import { CommandManager } from "./commands/CommandManager";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "roleplay",
  entities: [User],
  synchronize: true,
  logging: false,
});

async function bootstrap() {
  try {
    Logger.info("Se inițializează serverul...");

    await AppDataSource.initialize();
    Logger.info("Conectat cu succes la MariaDB!");

    // Load Commands
    await CommandManager.loadCommands();

    // Init Events
    PlayerEvents.init();

    // Express API
    const app = express();
    app.use(express.json());

    app.get("/status", (req, res) => {
      res.json({ online: mp.players.length, uptime: process.uptime() });
    });

    app.listen(3005, () => {
      Logger.info("API-ul Express ascultă pe portul 3005");
    });

    Logger.info("Sistem Auth, Stats, Chat & Comenzi activat.");
  } catch (e) {
    Logger.error("Eroare la pornirea serverului:", (e as any).message);
  }
}

bootstrap();
