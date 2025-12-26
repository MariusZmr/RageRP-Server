import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { number } from "framer-motion";

register({
  name: "veh",
  description: "Generarea unui vehicul guvernamental.",
  usage: "/veh <model>",
  aliases: ["v", "spawn", "car"],
  minAdmin: AdminLevel.Admin,
  execute: (player, args, _) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Info: ${Theme.Text}Utilizeaza /veh <model>`
      );
    try {
      const veh = mp.vehicles.new(mp.joaat(args[0]), player.position, {
        heading: player.heading,
        dimension: player.dimension,
        numberPlate: "ADMIN",
        locked: false,
        engine: true,
      });
      player.putIntoVehicle(veh, 0);
      player.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Unitatea ${Theme.Primary}${args[0]} ${Theme.Text}a fost alocata.`
      );
    } catch (e) {
      player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Modelul solicitat nu este valid.`
      );
    }
  },
});
