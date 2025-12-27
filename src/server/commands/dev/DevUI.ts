import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "devui",
  aliases: ["debugui", "ui"],
  description: "Activează/Dezactivează interfața de dezvoltare UI.",
  minAdmin: AdminLevel.Owner, // Restrict to Owner for now
  category: "dev",
  execute: (player) => {
    // Trigger client event
    player.call("client:toggleDevTools");
    
    player.outputChatBox(
      `${Theme.Primary}DevUI: ${Theme.Text}Interfață comutată.`
    );
  },
});