import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./database/entities/User";
import { Character } from "./database/entities/Character";
import { UserService } from "./services/UserService";
import { Logger } from "./utils/Logger";
import { PlayerEvents } from "./events/PlayerEvents";
import { CommandManager } from "./commands/CommandManager";
import * as dotenv from "dotenv";
import { TimeManager } from "./managers/TimeManager";
import SystemsManager from "./SystemsManager";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "roleplay",
  entities: [User, Character],
  synchronize: true,
  logging: false,
});

async function bootstrap() {
  try {
    Logger.info(">>> Battlegrounds RP <<<");

    await AppDataSource.initialize();
    Logger.info("[DB] Database Connection Established.");

    await SystemsManager.initAll();
    await CommandManager.loadCommands();
    TimeManager.init();
    PlayerEvents.init();

    setupExpress();
  } catch (e: any) {
    Logger.error("Critical Bootstrap Failure:", e.message);
  }
}

function setupExpress() {
  const app = express();
  app.use(express.json());
  app.get("/status", (req, res) =>
    res.json({ online: mp.players.length, uptime: process.uptime() })
  );

  app.get("/api/users", async (req: any, res: any) => {
    const username = req.query.username as string;
    if (username) {
      const user = await UserService.getByUsername(username);
      return res.json(user ? [user] : []);
    }
    const users = await UserService.getAll();
    res.json(users);
  });

  app.listen(3005, () => Logger.info("[API] Express listening on port 3005"));
}

bootstrap();
