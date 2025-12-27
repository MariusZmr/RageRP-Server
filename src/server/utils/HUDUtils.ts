import { PlayerUtils } from "./PlayerUtils";
import { ServerEvents } from "../../shared/constants/Events";

export class HUDUtils {
    public static update(player: PlayerMp) {
        const user = PlayerUtils.getDb(player);
        if (!user) return;

        player.call(ServerEvents.HUD_UPDATE, [{
            money: user.money.toString(),
            bank: user.bank.toString(),
            job: "Somer", // Hardcoded momentan
            ping: player.ping
        }]);
    }
}