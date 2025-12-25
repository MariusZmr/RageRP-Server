import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig, Theme } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { AuthService } from "../services/AuthService";

export class PlayerEvents {
  static init() {
    mp.events.add("playerJoin", async (player: PlayerMp) => {
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
      const db = PlayerUtils.getDb(player);
      const playerName = player.name; // Salvăm numele cât timp obiectul e valid

      if (db) {
        // AuthService.savePlayer trebuie să fie sigur și el, dar presupunem că extrage datele necesare la început
        // Totuși, e mai sigur să pasăm DB-ul direct dacă AuthService suportă, sau să ne asigurăm că AuthService nu accesează player.position după un await intern.
        // Pentru moment, fixăm eroarea de logging.
        try {
            await AuthService.savePlayer(player);
        } catch (e) {
            Logger.error(`Eroare la salvarea jucătorului ${playerName}:`, (e as any).message);
        }
        
        Logger.info(`[QUIT] ${playerName} a parasit sesiunea.`);
      }
    });
  }
}
