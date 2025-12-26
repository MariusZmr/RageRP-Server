import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./database/entities/User";
import { Character } from "./database/entities/Character";
import { UserService } from "./services/UserService";
import { Logger } from "./utils/Logger";
import { PlayerEvents } from "./events/PlayerEvents";
import "./events/AuthHandlers";
import "./events/CharacterHandlers";
import { CommandManager } from "./commands/CommandManager";
import * as dotenv from "dotenv";

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

    app.get("/status", (req: any, res: any) => {
      res.json({ online: mp.players.length, uptime: process.uptime() });
    });

    // User API
    app.get("/api/users", async (req: any, res: any) => {
      const username = req.query.username as string;
      if (username) {
        const user = await UserService.getByUsername(username);
        return res.json(user ? [user] : []);
      }
      const users = await UserService.getAll();
      res.json(users);
    });

    app.get("/api/users/online", async (req: any, res: any) => {
      const players = await UserService.getOnlinePlayers();
      res.json(players);
    });

    app.get("/api/users/player/:id", (req: any, res: any) => {
      const target = mp.players.at(parseInt(req.params.id));
      if (!target)
        return res.status(404).json({ error: "Jucătorul nu este online" });

      const db = (target as any).dbData;
      if (!db)
        return res
          .status(404)
          .json({ error: "Jucătorul nu este autentificat" });

      res.json(db);
    });

    app.get("/api/users/top", async (req: any, res: any) => {
      const limit = parseInt(req.query.limit as string) || 10;
      const top = await UserService.getTopPlayers(limit);
      res.json(top);
    });

    app.get("/api/users/:id", async (req: any, res: any) => {
      const user = await UserService.getById(parseInt(req.params.id));
      if (!user)
        return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
      res.json(user);
    });

    app.patch("/api/users/:id", async (req: any, res: any) => {
      const user = await UserService.update(parseInt(req.params.id), req.body);
      if (!user)
        return res.status(404).json({
          error: "Eroare la actualizare sau utilizatorul nu a fost găsit",
        });
      res.json(user);
    });

    app.delete("/api/users/:id", async (req: any, res: any) => {
      const success = await UserService.delete(parseInt(req.params.id));
      if (!success)
        return res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
      res.json({ success: true });
    });

    app.listen(3005, () => {
      Logger.info("API-ul Express ascultă pe portul 3005");
    });
  } catch (e) {
    Logger.error("Eroare la pornirea serverului:", (e as any).message);
  }
}

bootstrap();
