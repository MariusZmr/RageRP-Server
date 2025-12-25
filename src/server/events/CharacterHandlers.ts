import { CharacterManager, CharacterCreationData } from "../managers/CharacterManager";
import { Logger } from "../utils/Logger";

mp.events.add("character:create", async (player: PlayerMp, dataString: string) => {
    try {
        // Uneori clientul trimite obiect, alteori string. Verificăm.
        let data: CharacterCreationData;
        if (typeof dataString === 'string') {
            data = JSON.parse(dataString);
        } else {
            data = dataString;
        }

        Logger.info(`[CharCreator] Request from ${player.name}: Create ${data.info.firstName} ${data.info.lastName}`);
        
        const success = await CharacterManager.create(player, data);
        
        // Trimitem răspunsul către client (UI)
        // Clientul va primi un eveniment 'auth:response' pe care deja îl ascultă, sau facem unul dedicat.
        // În client/index.ts nu aveam un handler specific pentru create response, doar 'auth:response'.
        // Dar Character Creator e un modul separat.
        // Hai să trimitem un event specific pe care îl vom adăuga în client.
        player.call("character:create:response", [success ? { success: true } : { success: false, error: "Creation Failed" }]);

    } catch (e) {
        Logger.error(`[CharCreator] Error parsing data from ${player.name}`, e);
        player.call("character:create:response", [{ success: false, error: "Server Error" }]);
    }
});