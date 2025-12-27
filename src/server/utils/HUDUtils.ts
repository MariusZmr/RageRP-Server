import { PlayerUtils } from "./PlayerUtils";
import { ServerEvents } from "../../shared/constants/Events";

export class HUDUtils {
    public static update(player: PlayerMp) {
        const user = PlayerUtils.getDb(player);
        if (!user) return;

        const data = {
            id: player.id, 
            money: Number(user.money), 
            job: user.jobId === 0 ? "Unemployed" : `Job ${user.jobId}`, 
            serverName: "BATTLEGROUNDS"
        };

        player.call(ServerEvents.HUD_UPDATE, [JSON.stringify(data)]);
    }
}