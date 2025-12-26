import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig, Theme } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { AuthService } from "../services/AuthService";
import { CharacterManager } from "../managers/CharacterManager";
import { TimeManager } from "../managers/TimeManager";

export class PlayerEvents {
  static init() {
    mp.events.add("playerJoin", async (player: PlayerMp) => {
      // Sincronizăm vremea curentă cu clientul
      player.call("client:setWeather", [mp.world.weather]);

      // const user = await User.findOneBy({ username: player.name });

      // UI-ul va prelua fluxul de autentificare
      /*
      player.outputChatBox(Theme.Divider);
      player.outputChatBox(
        `${Theme.Text}Bun venit pe Server, ${Theme.Primary}${player.name}${Theme.Text}.`
      );

      if (user) {
        player.outputChatBox(
          `${Theme.Secondary}Sistem: ${Theme.Text}Contul tau este securizat. Foloseste ${Theme.Success}/login <parola>${Theme.Text}.`
        );
      } else {
        player.outputChatBox(
          `${Theme.Secondary}Sistem: ${Theme.Text}Numele tau nu este inregistrat. Foloseste ${Theme.Primary}/register <parola>${Theme.Text}.`
        );
      }
      player.outputChatBox(Theme.Divider);
      */

      Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
    });

    mp.events.add("playerChat", (player: PlayerMp, message: string) => {
      const db = PlayerUtils.getDb(player);
      if (!db) {
        player.outputChatBox(
          `${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`
        );
        return;
      }

      const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];

      // Format Premium: [Titlu] Nume (ID): Mesaj
      // Folosim Secondary (gri) pentru ID si paranteze pentru a nu incarca vizual
      const titlePrefix =
        db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
      const formattedMsg = `${titlePrefix}${Theme.Text}${player.name} ${Theme.Secondary}(${player.id})${Theme.Text}: ${Theme.Text}${message}`;

      // Proximity Chat optimizat (20 metri pentru realism)
      mp.players.forEachInRange(player.position, 20, (nearPlayer) => {
        nearPlayer.outputChatBox(formattedMsg);
      });

      Logger.info(`[CHAT] ${player.name}: ${message}`);
    });

    mp.events.add("playerCommand", (player: PlayerMp, message: string) => {
      CommandManager.handleCommand(player, message);
    });

    mp.events.add("playerQuit", async (player: PlayerMp, exitType: string) => {
      // 1. Extragem datele critic SINCRON (cât timp obiectul player este valid)
      const playerName = player.name;
      const pos = player.position; // Copiem vectorul
      const dimension = player.dimension;

      // Accesăm direct proprietățile atașate, evitând PlayerUtils.getDb care verifică exists()
      const user = (player as any).dbData as User;
      const char = (player as any).activeCharacter as Character; // Poate fi undefined dacă nu e spawnat
      const charId = player.data.characterId;

      // 2. Acum putem face operațiuni asincrone în siguranță folosind datele extrase

      // Salvăm timpul jucat
      if (user && char) {
        await TimeManager.forceSave(user, char);
      }

      // Salvăm poziția dacă era spawnat
      if (charId && pos) {
        await CharacterManager.savePositionData(
          charId,
          pos.x,
          pos.y,
          pos.z,
          dimension
        );
      }

      if (user) {
        // AuthService.savePlayer trebuie verificat dacă folosește player object.
        // Dacă da, ar trebui refăcut. Dar pentru moment, User e salvat de TimeManager.
        // Logger.info doar:
        Logger.info(`[QUIT] ${playerName} a parasit sesiunea.`);
      }
    });
  }
}
