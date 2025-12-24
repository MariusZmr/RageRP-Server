import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "tp",
  description: "Interventie rapida la coordonatele unui cetatean.",
  aliases: ["goto"],
  minAdmin: AdminLevel.Moderator,
  category: "admin",
  execute: (player, args) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Info: ${Theme.Text}Utilizeaza /goto <id>`
      );
    const target = mp.players.at(parseInt(args[0]));
    if (!target)
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Subiectul nu este conectat.`
      );

    player.position = target.position;
    player.outputChatBox(
      `${Theme.Primary}Securitate: ${Theme.Text}Te-ai deplasat la ${Theme.Primary}${target.name}.`
    );
  },
});
