import { Logger } from "../utils/Logger";
import { User } from "../models/User";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { AuthService } from "../services/AuthService";

export class PlayerEvents {
    static init() {
        mp.events.add("playerJoin", async (player: PlayerMp) => {
            const user = await User.findOneBy({ username: player.name });
            
            player.outputChatBox("!{#AA0000}========================================");
            player.outputChatBox(`!{#FFFFFF}Bine ai venit pe !{#AA0000}ServerServeros!{#FFFFFF}, ${player.name}!`);
            
            if (user) {
                player.outputChatBox("!{#FFFFFF}Acest nume este !{#55FF55}inregistrat!{#FFFFFF}. Foloseste !{#55FF55}/login <parola>!{#FFFFFF}.");
            } else {
                player.outputChatBox("!{#FFFFFF}Acest nume !{#FF9900}nu este inregistrat!{#FFFFFF}. Foloseste !{#FF9900}/register <parola>!{#FFFFFF}.");
            }
            player.outputChatBox("!{#AA0000}========================================");
            
            Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
        });

        mp.events.add("playerChat", (player: PlayerMp, message: string) => {
            const db = PlayerUtils.getDb(player);
            if (!db) {
                player.outputChatBox("!{#AA0000}Eroare: !{#FFFFFF}Trebuie sa fii logat pentru a vorbi.");
                return;
            }

            const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];
            const formattedMsg = `!{#BBBBBB}[${player.id}] ${config.color}${config.title}${player.name}: !{#FFFFFF}${message}`;

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
            if (db) {
                await AuthService.savePlayer(player);
                Logger.info(`[QUIT] ${player.name} a parasit serverul (${exitType}).`);
            }
        });
    }
}
