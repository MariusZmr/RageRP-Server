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
      Logger.info(`[Join] ${player.name} (#${player.id}) s-a conectat.`);
    });

    mp.events.add(
      GameEvents.PLAYER_CHAT,
      (player: PlayerMp, message: string) => {
        const db = PlayerUtils.getDb(player);
        if (!db) {
          player.outputChatBox(
            `${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`
          );
          return;
        }

        const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];
        const titlePrefix =
          db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
        const formattedMsg = `${titlePrefix}${Theme.Text}${player.name} ${Theme.Secondary}(${player.id})${Theme.Text}: ${Theme.Text}${message}`;

        mp.players.forEachInRange(player.position, 20, (nearPlayer) => {
          nearPlayer.outputChatBox(formattedMsg);
        });

        Logger.info(`[Chat] ${player.name}(#${player.id}): ${message}`);
      }
    );

    mp.events.add(
      GameEvents.PLAYER_COMMAND,
      (player: PlayerMp, message: string) => {
        CommandManager.handleCommand(player, message);
      }
    );

    mp.events.add(
      GameEvents.PLAYER_QUIT,
      async (player: PlayerMp, exitType: string) => {
        const playerName = player.name;
        const pos = player.position;
        const dimension = player.dimension;

        const user = (player as any).dbData as User;
        const char = (player as any).activeCharacter as Character;

        if (char) {
            // Actualizăm datele vitale înainte de salvare
            char.health = player.health;
            char.armor = player.armour;
            
            // Salvăm poziția în obiectul caracterului
            if (pos) {
                char.lastPosition = { x: pos.x, y: pos.y, z: pos.z, dimension: dimension, heading: player.heading };
            }

            // Salvăm timpul (logică din TimeManager integrată sau apelată)
            // TimeManager va salva timpul pe user și caracter, dar noi vrem să salvăm tot caracterul acum
            await TimeManager.forceSave(user, char); 
            
            // Salvăm tot obiectul caracterului (inclusiv bani, stats, pos)
            await char.save();
        }

        if (user) {
          Logger.info(`[Quit] ${playerName} a parasit sesiunea.`);
        }
      }
    );
  }
}
