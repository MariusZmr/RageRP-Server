import {
  CharacterManager,
  CharacterCreationData,
} from "../managers/CharacterManager";
import { Logger } from "../utils/Logger";
import { PlayerUtils } from "../utils/PlayerUtils";
import { HUDUtils } from "../utils/HUDUtils";
import { Character } from "../database/entities/Character";

mp.events.add("character:select", async (player: PlayerMp, charId: number) => {
  try {
    const user = PlayerUtils.getDb(player);
    if (!user) return; // Not logged in

    // Verificăm dacă caracterul aparține user-ului
    // Deoarece am încărcat user-ul cu relația 'characters' la login, putem verifica în memorie
    // SAU facem un query de siguranță (preferabil pentru consistență)
    const isValid = user.characters?.find((c) => c.id === charId);

    if (!isValid) {
      player.call("notification:show", ["Nu deții acest caracter!", "error"]);
      return;
    }

    Logger.info(`[Character] ${user.username} selected char ID ${charId}`);

    // Încărcăm caracterul (Spawn)
    await CharacterManager.load(player, charId);

    // Notificăm clientul că am intrat în joc (ascunde UI-ul de selecție, pornește HUD)
    player.call("client:enterGame");

    // Actualizăm HUD-ul
    HUDUtils.update(player);
  } catch (e) {
    Logger.error(`[Character] Select Error:`, e as any);
  }
});

mp.events.add(
  "character:create",
  async (player: PlayerMp, dataString: string) => {
    try {
      // Uneori clientul trimite obiect, alteori string. Verificăm.
      let data: CharacterCreationData;
      if (typeof dataString === "string") {
        data = JSON.parse(dataString);
      } else {
        data = dataString;
      }

      const user = PlayerUtils.getDb(player);
      if (!user) {
          player.call("character:create:response", [{ success: false, error: "Not Authenticated" }]);
          return;
      }

      // Validare Sloturi
      const currentCount = await Character.count({ where: { userId: user.id } });
      
      let maxSlots = user.characterSlots;
      if (user.accountPlayedTime >= 60000 && maxSlots < 2) maxSlots = 2;
      if (user.adminLevel >= 5) maxSlots = 3;

      if (currentCount >= maxSlots) {
          player.call("character:create:response", [{ success: false, error: "Nu mai ai sloturi disponibile!" }]);
          return;
      }

      Logger.info(
        `[CharCreator] Request from ${player.name}: Create ${data.info.firstName} ${data.info.lastName}`
      );

      const success = await CharacterManager.create(player, data);

      // Trimitem răspunsul către client (UI)
      // Clientul va primi un eveniment 'auth:response' pe care deja îl ascultă, sau facem unul dedicat.
      // În client/index.ts nu aveam un handler specific pentru create response, doar 'auth:response'.
      // Dar Character Creator e un modul separat.
      // Hai să trimitem un event specific pe care îl vom adăuga în client.
      player.call("character:create:response", [
        success
          ? { success: true }
          : { success: false, error: "Creation Failed" },
      ]);
    } catch (e) {
      Logger.error(
        `[CharCreator] Error parsing data from ${player.name}`,
        e as any
      );
      player.call("character:create:response", [
        { success: false, error: "Server Error" },
      ]);
    }
  }
);
