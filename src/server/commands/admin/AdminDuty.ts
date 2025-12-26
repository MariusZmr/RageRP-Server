import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "aduty",
  description: "Activeaza/Dezactiveaza modul administrativ (Godmode).",
  aliases: ["ad"],
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player) => {
    // Citim starea actuală (false dacă nu există)
    const currentState = player.getVariable("isAdminDuty") || false;
    const newState = !currentState;

    // Setăm variabila (se sincronizează automat cu toți clienții)
    player.setVariable("isAdminDuty", newState);

    if (newState) {
      // ACTIVAT
      player.outputChatBox(
        `${Theme.Primary}ADMIN: ${Theme.Text}Ai intrat la datorie. (Godmode ON)`
      );
      // Aici vom adăuga pe viitor logica pentru Custom Nametag (ex: player.setVariable('adminTitle', 'Moderator'))
    } else {
      // DEZACTIVAT
      player.outputChatBox(
        `${Theme.Primary}ADMIN: ${Theme.Text}Nu mai esti la datorie. (Godmode OFF)`
      );
    }
  },
});
