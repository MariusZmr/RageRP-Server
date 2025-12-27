import { register } from "../CommandRegistry";
import { User } from "../../database/entities/User";
import { Character } from "../../database/entities/Character";
import { Theme, AdminLevel } from "../../config/AdminLevels";
import { Logger } from "../../utils/Logger";
import { PlayerUtils } from "../../utils/PlayerUtils";

// Helper pentru calcul sloturi (replicat din Auth/Character Handlers)
const calculateMaxSlots = (user: User) => {
  let maxSlots = user.characterSlots;
  if (user.accountPlayedTime >= 60000 && maxSlots < 2) maxSlots = 2;
  if (user.adminLevel >= AdminLevel.Owner) maxSlots = 3;
  return maxSlots;
};

// Helper formatare timp
const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

register({
  name: "userinfo",
  description: "Vezi detalii complete despre contul unui jucator.",
  usage: "/userinfo <nume_user>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 1)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /userinfo <username>`
      );

    const targetName = args[0];
    const user = await User.findOne({
      where: { username: targetName },
      relations: ["characters"],
    });

    if (!user)
      return player.outputChatBox(
        `${Theme.Error}Utilizatorul '${targetName}' nu a fost gasit.`
      );

    const calculatedSlots = calculateMaxSlots(user);

    player.outputChatBox(Theme.Divider);
    player.outputChatBox(
      `${Theme.Primary}User Info: ${Theme.Text}${user.username} (ID: ${user.id})`
    );
    player.outputChatBox(
      `${Theme.Secondary}Admin Level: ${Theme.Text}${user.adminLevel}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Timp Jucat Cont: ${Theme.Text}${formatTime(user.accountPlayedTime)}`
    );
    player.outputChatBox(
      `${Theme.Secondary}Sloturi: ${Theme.Text}${user.characterSlots} (DB) -> ${Theme.Success}${calculatedSlots} (Calculat)`
    );

    player.outputChatBox(
      `${Theme.Primary}Caractere (${user.characters.length}):`
    );
    user.characters.forEach((char) => {
      player.outputChatBox(
        `${Theme.Secondary}- [ID:${char.id}] ${Theme.Text}${char.firstName} ${char.lastName} ${Theme.Secondary}| ${formatTime(char.playedTime)} | ${char.updatedAt.toLocaleDateString()} ${char.updatedAt.toLocaleTimeString()}`
      );
    });
    player.outputChatBox(Theme.Divider);
  },
});

register({
  name: "setslots",
  description: "Seteaza numarul de baza de sloturi pentru un user.",
  usage: "/setslots <username> <slots>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 2)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /setslots <username> <numar>`
      );

    const targetName = args[0];
    const slots = parseInt(args[1]);

    if (isNaN(slots) || slots < 1)
      return player.outputChatBox(
        `${Theme.Error}Numarul de sloturi trebuie sa fie minim 1.`
      );

    const user = await User.findOneBy({ username: targetName });
    if (!user)
      return player.outputChatBox(
        `${Theme.Error}Utilizatorul nu a fost gasit.`
      );

    await User.update({ id: user.id }, { characterSlots: slots });

    player.outputChatBox(
      `${Theme.Success}Sloturile de baza pentru ${user.username} au fost setate la ${slots}.`
    );
    Logger.warn(
      `[ADMIN] ${player.name} set slots for ${user.username}(#${user.id}) to ${slots}.`
    );
  },
});

register({
  name: "deletechar",
  description: "Sterge permanent un caracter folosind ID-ul unic.",
  usage: "/deletechar <Character_ID>",
  minAdmin: AdminLevel.Owner,
  execute: async (player, args) => {
    if (args.length < 1)
      return player.outputChatBox(
        `${Theme.Error}Folosire: /deletechar <Character_ID>`
      );

    const charId = parseInt(args[0]);
    if (isNaN(charId))
      return player.outputChatBox(
        `${Theme.Error}ID invalid. Trebuie sa fie un numar.`
      );

    const char = await Character.findOne({ where: { id: charId } });

    if (!char)
      return player.outputChatBox(
        `${Theme.Error}Caracterul cu ID ${charId} nu a fost gasit.`
      );

    const firstName = char.firstName;
    const lastName = char.lastName;

    // Verificăm dacă e online
    const targetPlayer = mp.players
      .toArray()
      .find((p) => p.data.characterId === char.id);

    if (targetPlayer) {
      targetPlayer.kick("Caracterul tau a fost sters de un administrator.");
      player.outputChatBox(`${Theme.Secondary}Jucatorul a fost deconectat.`);
    }

    await char.remove();

    player.outputChatBox(
      `${Theme.Success}Caracterul ${firstName} ${lastName} (ID: ${charId}) a fost sters permanent.`
    );
    Logger.warn(
      `[ADMIN] ${player.name} deleted character ID ${charId} (${firstName} ${lastName}).`
    );
  },
});
