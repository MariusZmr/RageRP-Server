import { register } from "../CommandRegistry";
import { Theme, AdminLevel } from "../../config/AdminLevels";
import { Logger } from "../../utils/Logger";

const VALID_WEATHERS = [
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
  "SNOW",
  "BLIZZARD",
  "SNOWLIGHT",
  "XMAS",
  "HALLOWEEN",
];

register({
  name: "weather",
  aliases: ["setweather", "sw"],
  description: "Schimba vremea globala pe server.",
  usage: "/weather <tip>",
  minAdmin: AdminLevel.Manager, // Level 4+
  execute: (player, args) => {
    if (args.length === 0) {
      return player.outputChatBox(
        `${Theme.Error}Folosire: /weather <tip>\n` +
          `${Theme.Secondary}Valide: ${VALID_WEATHERS.join(", ")}`
      );
    }

    const newWeather = args[0].toUpperCase();

    if (!VALID_WEATHERS.includes(newWeather)) {
      return player.outputChatBox(
        `${Theme.Error}Tip de vreme invalid! Incearca: ${Theme.Text}${VALID_WEATHERS.slice(0, 5).join(", ")}...`
      );
    }

        mp.world.weather = newWeather;

        // Forțăm actualizarea vizuală pe toți clienții (esențial pentru zăpadă)
        mp.players.call("client:setWeather", [newWeather]);

        // Notificare pentru admin
        player.outputChatBox(
            `${Theme.Success}Ai schimbat vremea globala in: ${Theme.Primary}${newWeather}`
        );

    // Log pentru audit
    Logger.warn(`[ADMIN] ${player.name} changed weather to ${newWeather}.`);
  },
});
