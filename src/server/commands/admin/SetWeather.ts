import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";
import { ClientEvents } from "../../../shared/constants/Events";

const validWeathers = [
  "EXTRASUNNY",
  "CLEAR",
  "CLOUDS",
  "SMOG",
  "FOGGY",
  "OVERCAST",
  "RAIN",
  "THUNDER",
  "CLEARING",
  "NEUTRAL",
  "SNOWLIGHT",
  "XMAS",
  "HALLOWEEN",
];

register({
  name: "setweather",
  description: "Seteaza vremea pe server.",
  aliases: ["sw"],
  minAdmin: AdminLevel.Admin,
  category: "admin",
  execute: (player, args) => {
    if (!args[0]) {
      return player.outputChatBox(
        `${Theme.Error}Utilizare: ${Theme.Text}/setweather [nume-vreme]`
      );
    }

    const newWeather = args[0].toUpperCase();

    if (!validWeathers.includes(newWeather)) {
      return player.outputChatBox(
        `${Theme.Error}Vreme invalida! ${Theme.Text}Optiuni: ${validWeathers.join(
          ", "
        )}`
      );
    }

    mp.world.weather = newWeather;
    mp.players.call(ClientEvents.SET_WEATHER, [newWeather]);

    mp.players.broadcast(
      `${Theme.Primary}Admin: ${Theme.Text}${player.name} a setat vremea la ${Theme.Secondary}${newWeather}${Theme.Text}.`
    );
  },
});
