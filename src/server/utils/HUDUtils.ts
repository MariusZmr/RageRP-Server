import { PlayerUtils } from "../utils/PlayerUtils";

export class HUDUtils {
    /**
     * Trimite toate datele necesare HUD-ului către jucător.
     */
    static update(player: PlayerMp) {
        const user = PlayerUtils.getDb(player);
        if (!user) return;

        // Construim payload-ul cu date REALE din baza de date
        const data = {
            id: player.id,
            money: user.money, // Banii reali
            job: user.jobId === 0 ? "Șomer" : `Job #${user.jobId}`, // Placeholder pentru numele job-ului
            // Putem adăuga și bank, level, etc.
        };
        
        // Trimitem eventul către client, care îl va pasa la CEF
        player.call('hud:update', [data]);
    }
}