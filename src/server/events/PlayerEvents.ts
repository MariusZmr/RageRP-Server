import { Logger } from "../utils/Logger";
import { AuthService } from "../services/AuthService";
import { CommandManager } from "../commands/CommandManager";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminTitles } from "../config/AdminLevels";

export class PlayerEvents {
    static init() {
        mp.events.add("playerJoin", (player: PlayerMp) => {
            Logger.info(`[JOIN] ${player.name} s-a conectat (IP: ${player.ip}).`);
            player.outputChatBox("!{#FFFF00}Bine ai venit pe ServerServeros!");
            player.outputChatBox("Serverul foloseste TypeScript si MariaDB.");
            player.outputChatBox("!{#FFFFFF}Foloseste /register <parola> sau /login <parola>.");
        });

        mp.events.add("playerQuit", async (player: PlayerMp, exitType: string) => {
            const user = PlayerUtils.getDb(player);
            if (user) {
                await AuthService.savePlayer(player);
                Logger.info(`[QUIT] ${user.username} a iesit (${exitType}). Date salvate.`);
            }
            PlayerUtils.setDb(player, undefined);
        });

        mp.events.add("playerChat", (player: PlayerMp, message: string) => {
            const user = PlayerUtils.getDb(player);
            if (!user) {
                player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Trebuie sa fii logat pentru a scrie.");
                return;
            }

            const title = AdminTitles[user.adminLevel] || "";
            const color = user.adminLevel > 0 ? "!{#FFD700}" : "!{#FFFFFF}";
            const formattedMsg = `!{#BBBBBB}[${player.id}] ${title}${color}${user.username} says: !{#FFFFFF}${message}`;

            // Proximity Chat (15 metri)
            mp.players.forEachInRange(player.position, 15, (nearPlayer) => {
                nearPlayer.outputChatBox(formattedMsg);
            });
            
            Logger.info(`[CHAT] ${user.username}: ${message}`);
        });

        mp.events.add("playerCommand", (player: PlayerMp, message: string) => {
            CommandManager.handleCommand(player, message);
        });
    }
}