import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig, Theme } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { TimeManager } from "../managers/TimeManager";
import { CharacterService } from "../modules/character/character.service";
import { ClientEvents, GameEvents } from "../../shared/constants/Events";

export class PlayerEvents {
  static init() {
    mp.events.add(GameEvents.PLAYER_JOIN, async (player: PlayerMp) => {
      player.call(ClientEvents.SET_WEATHER, [mp.world.weather]);
      Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
    });

    mp.events.add(GameEvents.PLAYER_CHAT, (player: PlayerMp, message: string) => {
      const db = PlayerUtils.getDb(player);
      if (!db) {
        player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`);
        return;
      }

      const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];
      const titlePrefix = db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
      const formattedMsg = `${titlePrefix}${Theme.Text}${player.name} ${Theme.Secondary}(${player.id})${Theme.Text}: ${Theme.Text}${message}`;

      mp.players.forEachInRange(player.position, 20, (nearPlayer) => {
        nearPlayer.outputChatBox(formattedMsg);
      });

      Logger.info(`[CHAT] ${player.name}: ${message}`);
    });

    mp.events.add(GameEvents.PLAYER_COMMAND, (player: PlayerMp, message: string) => {
      CommandManager.handleCommand(player, message);
    });

    mp.events.add(GameEvents.PLAYER_QUIT, async (player: PlayerMp, exitType: string) => {
      const playerName = player.name;
      const pos = player.position;
      const dimension = player.dimension;

      const user = (player as any).dbData as User;
      const char = (player as any).activeCharacter as Character;

      // Salvăm timpul jucat
      if (user && char) {
        await TimeManager.forceSave(user, char);
      }

      // Salvăm poziția dacă era spawnat
      if (char && pos) {
        await CharacterService.getInstance().savePositionData(
          char.id,
          pos.x,
          pos.y,
          pos.z,
          dimension,
          player.heading
        );
      }

      if (user) {
        Logger.info(`[QUIT] ${playerName} a parasit sesiunea.`);
      }
    });
  }
}