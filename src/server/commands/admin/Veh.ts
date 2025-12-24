import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
    name: "veh",
    description: "Generarea unui vehicul guvernamental.",
    usage: "/veh <model>",
    aliases: ["v", "spawn"],
    minAdmin: AdminLevel.Admin,
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Info: ${Theme.Text}Utilizeaza /veh <model>`);
        try {
            const veh = mp.vehicles.new(mp.joaat(args[0]), player.position, { heading: player.heading });
            player.putIntoVehicle(veh, 0);
            player.outputChatBox(`${Theme.Primary}Admin: ${Theme.Text}Unitatea ${Theme.Primary}${args[0]} ${Theme.Text}a fost alocata.`);
        } catch (e) {
            player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Modelul solicitat nu este valid.`);
        }
    }
});