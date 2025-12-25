import { User } from "../database/entities/User";

export class PlayerUtils {
    static getDb(player: PlayerMp): User | undefined {
        if (!player || !mp.players.exists(player)) return undefined;
        return (player as any).dbData;
    }

    static setDb(player: PlayerMp, data: User | undefined) {
        if (!player || !mp.players.exists(player)) return;
        (player as any).dbData = data;
    }

    static updateDb(player: PlayerMp, updates: Partial<User>) {
        const db = this.getDb(player);
        if (db) {
            Object.assign(db, updates);
        }
    }
}
