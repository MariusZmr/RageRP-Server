import { register } from "../CommandRegistry";
import { AdminLevel, Theme } from "../../config/AdminLevels";

register({
  name: "giveweapon",
  aliases: ["weapon", "gun"],
  description: "Ofera o arma unui jucator specificat.",
  usage: "/giveweapon <id> <nume_arma> <munitie>",
  minAdmin: AdminLevel.Admin, // Level 2+ (Admin)
  category: "admin",
  execute: (player, args) => {
    // 1. Validare argumente (Avem nevoie de minim 3: ID, Nume, Gloanțe)
    if (args.length < 3) {
      return player.outputChatBox(
        `${Theme.Error}Folosire: ${Theme.Text}/giveweapon <id> <nume> <munitie>`
      );
    }

    const targetId = parseInt(args[0]);
    let weaponName = args[1].toLowerCase(); // "pistol", "ak47", "pump"
    const ammo = parseInt(args[2]);

    // 2. Găsire jucător
    const target = mp.players.at(targetId);
    if (!target || !mp.players.exists(target)) {
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`
      );
    }

    // 3. Logică "Smart Name"
    // Dacă adminul scrie "pistol", noi îl transformăm în "weapon_pistol"
    // GTA V recunoaște doar formatul cu "weapon_"
    if (!weaponName.startsWith("weapon_")) {
      weaponName = "weapon_" + weaponName;
    }

    // 4. Conversie String -> Hash (GTA V lucrează cu numere, nu cu text)
    // mp.joaat() face hashing-ul necesar (Jenkins One At A Time)
    const weaponHash = mp.joaat(weaponName);

    // 5. Acțiunea efectivă
    // giveWeapon(hash, ammo)
    target.giveWeapon(weaponHash, ammo);

    // 6. Feedback
    player.outputChatBox(
      `${Theme.Success}Succes: ${Theme.Text}I-ai dat ${Theme.Primary}${weaponName}${Theme.Text} lui ${target.name}.`
    );

    if (player !== target) {
      target.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Ai primit o armă de la ${player.name}.`
      );
    }
  },
});

register({
  name: "disarm",
  aliases: ["removeweapons", "rw", "clearweapons"],
  description: "Confisca toate armele unui jucator.",
  usage: "/disarm <id>",
  minAdmin: AdminLevel.Admin,
  category: "admin",
  execute: (player, args) => {
    if (!args[0])
      return player.outputChatBox(
        `${Theme.Error}Folosire: ${Theme.Text}/disarm <id>`
      );

    const target = mp.players.at(parseInt(args[0]));

    if (!target || !mp.players.exists(target)) {
      return player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Jucatorul nu a fost gasit.`
      );
    }

    // Execuția: Șterge tot inventarul de arme
    target.removeAllWeapons();
    player.outputChatBox(
      `${Theme.Success}Succes: ${Theme.Text}L-ai dezarmat complet pe ${Theme.Primary}${target.name}.`
    );

    if (player !== target) {
      target.outputChatBox(
        `${Theme.Primary}Admin: ${Theme.Text}Toate armele tale au fost confiscate de ${player.name}.`
      );
    }
  },
});
