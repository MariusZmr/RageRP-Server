import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "noclip",
    description: "Activeaza/Dezactiveaza modul NoClip.",
    usage: "/noclip",
    minAdmin: AdminLevel.Admin, // Ajustează nivelul dacă e necesar
    category: "admin",
    execute: (player) => {
        player.call("client:toggleNoClip");
        player.outputChatBox(`${Theme.Primary}NoClip: ${Theme.Text}Ai trimis semnalul de toggle către client.`);
    }
});
