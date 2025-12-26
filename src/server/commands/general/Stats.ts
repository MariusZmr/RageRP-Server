import { register } from "../CommandRegistry";
import { Theme, AdminConfig } from "../../config/AdminLevels";

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
    const db = (player as any).dbData; // User entity
    const char = (player as any).activeCharacter; // Character entity
    
    if (!db) return;

    const adminInfo = AdminConfig[db.adminLevel as keyof typeof AdminConfig];

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}PROFIL UTILIZATOR ${Theme.Secondary}#${player.id} ${Theme.Primary}» ${Theme.Text}${player.name}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Nivel: ${Theme.Text}${db.level} ${Theme.Secondary}| Exp: ${Theme.Text}${db.exp}/10 ${Theme.Secondary}| Statut: ${adminInfo.color}${adminInfo.title}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Cash: ${
        Theme.Success
      }$${db.money.toLocaleString()} ${Theme.Secondary}| Banca: ${
        Theme.Success
      }$${db.bank.toLocaleString()}`
    );

    // Timp Jucat
    if (char) {
        player.outputChatBox(
            `${Theme.Secondary}Timp Jucat (Caracter): ${formatTime(char.playedTime || 0)}`
        );
    }
    
    player.outputChatBox(
        `${Theme.Secondary}Timp Jucat (Cont): ${formatTime(db.accountPlayedTime || 0)}`
    );

    player.outputChatBox(
      `${Theme.Secondary}Integritate: ${Theme.Error}${db.warns}/3 Avertismente`
    );
    player.outputChatBox(Theme.Divider);
  },
});
