import { register } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

// /me - Actiune locala
register({
  name: "me",
  description: "Descrie o actiune facuta de personajul tau.",
  usage: "/me <actiune>",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `!{#C2A2DA}* ${player.name} ${fullText}`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /do - Descriere mediu/stare
register({
  name: "do",
  description: "Descrie o stare sau un detaliu al mediului.",
  usage: "/do <descriere>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `!{#C2A2DA}* ${fullText} (( ${player.name} ))`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /b - OOC Local
register({
  name: "b",
  description: "Chat Out-Of-Character (OOC) local.",
  usage: "/b <mesaj>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `${Theme.Secondary}(( [OOC] ${player.name}: ${fullText} ))`;
    mp.players.forEachInRange(player.position, 20, (p) => p.outputChatBox(msg));
  },
});

// /shout - Strigat
register({
  name: "shout",
  aliases: ["s"],
  description: "Striga ceva pentru a fi auzit la distanta mai mare.",
  usage: "/s <mesaj>",
  category: "chat",
  execute: (player, args, fullText) => {
    if (!fullText) return;
    const msg = `${Theme.Text}${player.name} striga: ${fullText}!!`;
    mp.players.forEachInRange(player.position, 40, (p) => p.outputChatBox(msg));
  },
});
