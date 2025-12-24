import { User } from "../models/User";
import { Logger } from "../utils/Logger";

export class UserService {
    static async getAll() {
        try {
            return await User.find();
        } catch (e) {
            Logger.error("UserService.getAll:", (e as any).message);
            return [];
        }
    }

    static async getById(id: number) {
        try {
            return await User.findOneBy({ id });
        } catch (e) {
            Logger.error("UserService.getById:", (e as any).message);
            return null;
        }
    }

    static async getByUsername(username: string) {
        try {
            return await User.findOneBy({ username });
        } catch (e) {
            Logger.error("UserService.getByUsername:", (e as any).message);
            return null;
        }
    }

    static async update(id: number, updates: Partial<User>) {
        try {
            const user = await User.findOneBy({ id });
            if (!user) return null;

            Object.assign(user, updates);
            return await user.save();
        } catch (e) {
            Logger.error("UserService.update:", (e as any).message);
            return null;
        }
    }

    static async delete(id: number) {
        try {
            const user = await User.findOneBy({ id });
            if (!user) return false;

            await user.remove();
            return true;
        } catch (e) {
            Logger.error("UserService.delete:", (e as any).message);
            return false;
        }
    }

    static async getOnlinePlayers() {
        const players: any[] = [];
        mp.players.forEach((player) => {
            const dbData = (player as any).dbData;
            players.push({
                id: player.id,
                name: player.name,
                dbId: dbData?.id,
                adminLevel: dbData?.adminLevel || 0,
                ping: player.ping
            });
        });
        return players;
    }

    static async getTopPlayers(limit: number = 10) {
        try {
            return await User.find({
                order: { level: "DESC", exp: "DESC" },
                take: limit
            });
        } catch (e) {
            Logger.error("UserService.getTopPlayers:", (e as any).message);
            return [];
        }
    }
}
