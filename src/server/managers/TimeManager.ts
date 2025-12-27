import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";

export class TimeManager {
    private static SAVE_INTERVAL_MINUTES = 5; 

    public static init() {
        Logger.info("[TimeManager] Service started.");

        setInterval(() => {
            this.processMinuteTick();
        }, 60000);
    }

    private static async processMinuteTick() {
        const now = new Date();
        const shouldSaveToDb = now.getMinutes() % this.SAVE_INTERVAL_MINUTES === 0;

        mp.players.forEach(async (player) => {
            if (!mp.players.exists(player)) return;

            const user = PlayerUtils.getDb(player);
            const char = (player as any).activeCharacter as Character;

            if (user && char) {
                try {
                    user.accountPlayedTime = (user.accountPlayedTime || 0) + 1;
                    char.playedTime = (char.playedTime || 0) + 1;

                    if (shouldSaveToDb) {
                        await User.update({ id: user.id }, { accountPlayedTime: user.accountPlayedTime });
                        await Character.update({ id: char.id }, { playedTime: char.playedTime });
                    }
                } catch (e) {
                    Logger.error(`[TimeManager] Error updating time for ${player.name}`, e as any);
                }
            }
        });
    }

    public static async forceSave(user: User, char: Character) {
        if (user && char) {
            try {
                await User.update({ id: user.id }, { accountPlayedTime: user.accountPlayedTime });
                await Character.update({ id: char.id }, { playedTime: char.playedTime });
            } catch (e) {
                Logger.error(`[TimeManager] Quit Save Error`, e as any);
            }
        }
    }
}
