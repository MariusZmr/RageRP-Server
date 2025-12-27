import { register } from "../CommandRegistry";
import { Theme, AdminConfig } from "../../config/AdminLevels";
import { PlayerUtils } from "../../utils/PlayerUtils";

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${Theme.Primary}${hours}${Theme.Text} ore și ${Theme.Primary}${minutes}${Theme.Text} minute`;
};

register({
  name: "stats",
  description: "Vizualizeaza rezumatul profilului tau digital.",
  aliases: ["profile"],
  execute: (player) => {
    const db = PlayerUtils.getDb(player);
    const char = PlayerUtils.getCharacter(player);
    
    if (!db) return;
    if (!char) {
        return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Trebuie să fii conectat pe un caracter pentru a vedea statisticile.`);
    }

    const adminInfo = AdminConfig[db.adminLevel as keyof typeof AdminConfig];

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}PROFIL UTILIZATOR ${Theme.Secondary}#${player.id} ${Theme.Primary}» ${Theme.Text}${char.firstName} ${char.lastName}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Nivel: ${Theme.Text}${char.level} ${Theme.Secondary}| Exp: ${Theme.Text}${char.exp}/10 ${Theme.Secondary}| Statut: ${adminInfo.color}${adminInfo.title}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Cash: ${
        Theme.Success
      }$${char.money.toLocaleString()} ${Theme.Secondary}| Banca: ${
        Theme.Success
      }$${char.bank.toLocaleString()}`
    );

    player.outputChatBox(
        `${Theme.Secondary}Timp Jucat (Caracter): ${formatTime(char.playedTime || 0)}`
    );
    
    player.outputChatBox(
        `${Theme.Secondary}Timp Jucat (Cont): ${formatTime(db.accountPlayedTime || 0)}`
    );

    player.outputChatBox(
      `${Theme.Secondary}Integritate: ${Theme.Error}${db.warns}/3 Avertismente`
    );
    player.outputChatBox(Theme.Divider);
  },
});
