import { register } from "../CommandRegistry";
import { Theme, AdminLevel } from "../../config/AdminLevels";

register({
  name: "dv",
  aliases: ["delveh"],
  description:
    "Sterge vehiculul curent, cel mai apropiat (5m) sau vehiculele goale din raza specificata.",
  usage: "/dv [raza]",
  minAdmin: AdminLevel.Moderator,
  execute: (player, args) => {
    // Cazul 1: Niciun argument specificat (Comportament Smart)
    if (args.length === 0) {
      // A. Dacă jucătorul este în vehicul, îl ștergem pe acela
      if (player.vehicle) {
        player.vehicle.destroy();
        player.outputChatBox(`${Theme.Success}Vehiculul curent a fost sters.`);
        return;
      }

            // B. Dacă nu este în vehicul, căutăm cel mai apropiat în 5m

            let closestVeh: VehicleMp | null = null;

            let minDist = 5.0; // Raza maximă de căutare

      

            mp.vehicles.forEachInRange(player.position, 5, (veh: VehicleMp) => {

              const dist = player.dist(veh.position);

              if (dist < minDist) {

                minDist = dist;

                closestVeh = veh;

              }

            });

      

            if (closestVeh && mp.vehicles.exists(closestVeh)) {

              (closestVeh as VehicleMp).destroy();

              player.outputChatBox(`${Theme.Success}Cel mai apropiat vehicul a fost sters.`);

            } else {
        player.outputChatBox(
          `${Theme.Error}Nu esti intr-un vehicul si nu am gasit niciunul in apropiere (5m). Foloseste ${Theme.Primary}/dv <raza>${Theme.Error} pentru o raza mai mare.`
        );
      }
      return;
    }

    // Cazul 2: Argument specificat (Ștergere în masă pe rază)
    const radius = parseFloat(args[0]);

    if (isNaN(radius) || radius <= 0) {
      return player.outputChatBox(
        `${Theme.Error}Raza trebuie sa fie un numar pozitiv.`
      );
    }

    if (radius > 100) {
      return player.outputChatBox(
        `${Theme.Error}Raza maxima admisa este de 100m.`
      );
    }

    let count = 0;
    const vehiclesToDelete: VehicleMp[] = [];

    // 1. Identificăm vehiculele din rază
    mp.vehicles.forEachInRange(player.position, radius, (veh) => {
      // 2. Verificăm dacă vehiculul este ocupat
      let isOccupied = false;

      // Iterăm prin toți jucătorii pentru a vedea dacă vreunul este în acest vehicul
      mp.players.forEach((p) => {
        if (p.vehicle === veh) {
          isOccupied = true;
        }
      });

      // Dacă nu e ocupat, îl adăugăm la lista de ștergere
      if (!isOccupied) {
        vehiclesToDelete.push(veh);
      }
    });

    // 3. Ștergem vehiculele identificate
    vehiclesToDelete.forEach((veh) => {
      if (mp.vehicles.exists(veh)) {
        veh.destroy();
        count++;
      }
    });

    if (count > 0) {
      player.outputChatBox(
        `${Theme.Success}Au fost sterse ${Theme.Primary}${count}${Theme.Success} vehicule goale pe o raza de ${radius}m.`
      );
    } else {
      player.outputChatBox(
        `${Theme.Secondary}Nu au fost gasite vehicule goale in raza specificata.`
      );
    }
  },
});
