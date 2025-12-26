import { AuthService } from "../services/AuthService";
import { User } from "../database/entities/User";
import bcrypt from "bcryptjs";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { HUDUtils } from "../utils/HUDUtils";

mp.events.add(
  "auth:login",
  async (player: PlayerMp, username: string, pass: string) => {
    try {
      // 1. Încărcăm User-ul împreună cu lista de Caractere
      const user = await User.findOne({
        where: { username },
        relations: ["characters"],
      });

      if (!user || !(await bcrypt.compare(pass, user.password))) {
        return player.call("auth:response", [
          { success: false, error: "Nume sau parolă incorectă." },
        ]);
      }

      if (user.isBanned) {
        return player.call("auth:response", [
          { success: false, error: `Cont suspendat: ${user.banReason}` },
        ]);
      }

      // 2. Setăm datele pe player, dar NU SPWNĂM
      PlayerUtils.setDb(player, user);
      player.name = user.username;
      player.dimension = user.dimension; // Poate fi util, dar de obicei 0 sau un routing bucket specific

      // 3. Pregătim lista simplificată de caractere pentru UI
      const characterList = user.characters.map((char) => ({
        id: char.id,
        firstName: char.firstName,
        lastName: char.lastName,
        level: char.level || 1, // Fallback dacă nu există field-ul level
        lastPlayed: char.updatedAt,
      }));

      // 4. Trimitem succes + lista
      player.call("auth:response", [{ success: true, characters: characterList }]);

      Logger.info(`[Auth] ${username} authenticated. Sending char selection.`);
    } catch (e) {
      Logger.error("Auth Error:", (e as any).message);
      player.call("auth:response", [
        { success: false, error: "Eroare internă server." },
      ]);
    }
  }
);

mp.events.add(
  "auth:register",
  async (player: PlayerMp, username: string, pass: string, email: string) => {
    try {
      if (pass.length < 6)
        return player.call("auth:response", [
          { success: false, error: "Parola minim 6 caractere." },
        ]);

      const existing = await User.findOneBy({ username });
      if (existing)
        return player.call("auth:response", [
          { success: false, error: "Acest nume este deja folosit." },
        ]);

      const hashed = await bcrypt.hash(pass, 10);
      const userCount = await User.count();

      const newUser = new User();
      newUser.username = username;
      newUser.password = hashed;
      newUser.email = email;
      newUser.adminLevel = userCount === 0 ? 5 : 0;
      newUser.lastPos = JSON.stringify({ x: -425, y: 1123, z: 325 });

      await newUser.save();

      PlayerUtils.setDb(player, newUser);
      player.name = newUser.username;
      player.spawn(new mp.Vector3(-425, 1123, 325));

      player.call("auth:response", [{ success: true }]);

      // Trimitem datele HUD
      HUDUtils.update(player);

      Logger.info(`[Auth] Cont nou creat: ${username}`);
    } catch (e) {
      Logger.error("Register Error:", (e as any).message);
      player.call("auth:response", [
        { success: false, error: "Eroare la înregistrare." },
      ]);
    }
  }
);

// Ascultăm cererea HUD-ului de reîmprospătare (ex: la reload pagină)
mp.events.add("hud:request", (player: PlayerMp) => {
  HUDUtils.update(player);
});
