import { register } from "../CommandRegistry";
import { Theme, AdminConfig } from "../../config/AdminLevels";

register({
  name: "stats",
  description: "Vizualizeaza rezumatul profilului tau digital.",
  aliases: ["profile"],
  execute: (player) => {
    const db = (player as any).dbData;
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
      `${Theme.Secondary}Lichiditati: ${
        Theme.Success
      }$${db.money.toLocaleString()} ${Theme.Secondary}| Depozite: ${
        Theme.Success
      }$${db.bank.toLocaleString()}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Integritate: ${Theme.Error}${db.warns}/3 Avertismente`
    );
    player.outputChatBox(Theme.Divider);
  },
});
