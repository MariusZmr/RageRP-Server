import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";

export class PlayerUtils {
    /**
     * Returneaza datele contului (User).
     * Folosit pentru Admin Level, VIP, etc.
     */
    static getDb(player: PlayerMp): User | undefined {
        if (!player || !mp.players.exists(player)) return undefined;
        return (player as any).dbData;
    }

    static setDb(player: PlayerMp, data: User | undefined) {
        if (!player || !mp.players.exists(player)) return;
        (player as any).dbData = data;
    }

    /**
     * Returneaza caracterul activ.
     * Folosit pentru Bani, Job, Factiune, Inventory.
     */
    static getCharacter(player: PlayerMp): Character | undefined {
        if (!player || !mp.players.exists(player)) return undefined;
        return (player as any).activeCharacter;
    }

    static setCharacter(player: PlayerMp, char: Character | undefined) {
        if (!player || !mp.players.exists(player)) return;
        (player as any).activeCharacter = char;
        
        // Putem seta variabile shared aici daca e nevoie pe client
        if (char) {
            player.setVariable('remoteId', char.id);
        }
    }

    static updateDb(player: PlayerMp, updates: Partial<User>) {
        const db = this.getDb(player);
        if (db) {
            Object.assign(db, updates);
        }
    }
}
