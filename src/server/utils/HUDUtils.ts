import { PlayerUtils } from "./PlayerUtils";
import { ServerEvents } from "../../shared/constants/Events";

export class HUDUtils {
    public static update(player: PlayerMp) {
        const char = PlayerUtils.getCharacter(player);
        if (!char) return; // Daca nu are caracter selectat, nu updatam HUD-ul

        const data = {
            id: player.id, 
            money: Number(char.money), 
            job: char.jobId === 0 ? "Unemployed" : `Job ${char.jobId}`, 
            serverName: "BATTLEGROUNDS"
        };

        player.call(ServerEvents.HUD_UPDATE, [JSON.stringify(data)]);
    }
}