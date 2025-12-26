import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";

export class TimeManager {
    // Interval de salvare în DB (minute)
    private static SAVE_INTERVAL_MINUTES = 5; 

    public static init() {
        Logger.info("[TimeManager] Service started.");

        // Rulează la fiecare minut (60.000 ms)
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
            // Accesăm caracterul stocat pe player (vezi CharacterManager.load)
            const char = (player as any).activeCharacter as Character;

            // Verificăm dacă jucătorul este logat și spawnat
            if (user && char) {
                try {
                    // 1. Incrementăm în memorie
                    user.accountPlayedTime = (user.accountPlayedTime || 0) + 1;
                    char.playedTime = (char.playedTime || 0) + 1;

                    // 2. Salvăm în DB dacă e momentul
                    if (shouldSaveToDb) {
                        // Folosim update direct pentru a evita problemele cu relațiile TypeORM la save()
                        await User.update({ id: user.id }, { accountPlayedTime: user.accountPlayedTime });
                        await Character.update({ id: char.id }, { playedTime: char.playedTime });
                    }
                } catch (e) {
                    Logger.error(`[TimeManager] Error updating time for ${player.name}`, e as any);
                }
            }
        });
    }

    /**
     * Metodă publică pentru a forța salvarea entităților (ex: la deconectare)
     * Acceptă entitățile direct pentru a evita erorile de "Expired object".
     */
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