import { Logger } from "../utils/Logger";
import { User } from "../models/User";
import { PlayerUtils } from "../utils/PlayerUtils";
import { AdminConfig, Theme } from "../config/AdminLevels";
import { CommandManager } from "../commands/CommandManager";
import { AuthService } from "../services/AuthService";

export class PlayerEvents {
    static init() {
        mp.events.add("playerJoin", async (player: PlayerMp) => {
            const user = await User.findOneBy({ username: player.name });
            
            player.outputChatBox(Theme.Divider);
            player.outputChatBox(`${Theme.Text}Bun venit pe ${Theme.Primary}ServerServeros${Theme.Text}, ${Theme.Primary}${player.name}${Theme.Text}.`);
            
            if (user) {
                player.outputChatBox(`${Theme.Secondary}Sistem: ${Theme.Text}Contul tau este securizat. Foloseste ${Theme.Success}/login <parola>${Theme.Text}.`);
            } else {
                player.outputChatBox(`${Theme.Secondary}Sistem: ${Theme.Text}Numele tau nu este inregistrat. Foloseste ${Theme.Primary}/register <parola>${Theme.Text}.`);
            }
            player.outputChatBox(Theme.Divider);
            
            Logger.info(`[JOIN] ${player.name} (ID: ${player.id}) s-a conectat.`);
        });

        mp.events.add("playerChat", (player: PlayerMp, message: string) => {
            const db = PlayerUtils.getDb(player);
            if (!db) {
                player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a utiliza chat-ul.`);
                return;
            }

            const config = AdminConfig[db.adminLevel as keyof typeof AdminConfig];
            
            // Format Premium: [Titlu] Nume (ID): Mesaj
            // Folosim Secondary (gri) pentru ID si paranteze pentru a nu incarca vizual
            const titlePrefix = db.adminLevel > 0 ? `${config.color}${config.title} ` : "";
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
            if (db) {
                await AuthService.savePlayer(player);
                Logger.info(`[QUIT] ${player.name} a parasit sesiunea.`);
            }
        });
    }
}