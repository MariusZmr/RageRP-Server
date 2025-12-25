import { register, getAllCommands } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

register({
  name: "help",
  description: "Manualul de utilizare al sistemelor.",
  aliases: ["h", "commands"],
  execute: (player) => {
    const db = (player as any).dbData;
    const allCmds = getAllCommands();

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}CENTRUL DE AJUTOR ${Theme.Secondary}| ${Theme.Text}Sisteme Active`
    );

    const cats: Record<string, string[]> = {};
    allCmds.forEach((cmd) => {
      if (cmd.minAdmin && (!db || db.adminLevel < cmd.minAdmin)) return;
      const cat = cmd.category || "altele";
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(`${Theme.Text}/${cmd.name}`);
    });

    Object.keys(cats).forEach((cat) => {
      player.outputChatBox(
        `${Theme.Primary}» ${cat.toUpperCase()}: ${cats[cat].join(", ")}`
      );
    });
    player.outputChatBox(Theme.Divider);
  },
});
