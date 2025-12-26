import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "coords",
  aliases: ["pos", "copypos"],
  description:
    "Copiază coordonatele curente în Clipboard (Format JSON & Vector3).",
  minAdmin: AdminLevel.Moderator, // Sau Admin
  category: "dev",
  execute: (player) => {
    const pos = player.position;
    const rot = player.heading;

    // Construim obiectul de date
    const data = {
      x: Number(pos.x.toFixed(3)),
      y: Number(pos.y.toFixed(3)),
      z: Number(pos.z.toFixed(3)),
      h: Number(rot.toFixed(2)),
    };

    // Trimitem la client să rezolve copierea
    player.call("client:dev:copyCoords", [JSON.stringify(data)]);

    // Feedback vizual rapid
    player.outputChatBox(
      `${Theme.Primary}Dev: ${Theme.Text}Coordonate trimise către Clipboard.`
    );
  },
});
