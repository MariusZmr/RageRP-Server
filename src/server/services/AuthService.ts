import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Logger } from "../utils/Logger";
import { PlayerUtils } from "../utils/PlayerUtils";

export class AuthService {
    static async register(player: PlayerMp, username: string, pass: string) {
        try {
            if (pass.length < 4) {
                return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Parola trebuie sa aiba minim 4 caractere.");
            }

            const existing = await User.findOneBy({ username });
            if (existing) {
                return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Acest nume este deja utilizat.");
            }

            const hashed = await bcrypt.hash(pass, 10);
            const userCount = await User.count();
            
            const newUser = new User();
            newUser.username = username;
            newUser.password = hashed;
            newUser.adminLevel = userCount === 0 ? 5 : 0; // Primul utilizator primeste Owner automat
            
            await newUser.save();
            player.outputChatBox("!{#00FF00}Succes: !{#FFFFFF}Cont creat cu succes! Te poti loga.");
            Logger.info(`[AUTH] ${username} s-a inregistrat.`);
        } catch (e) {
            Logger.error("Eroare la inregistrare:", (e as any).message);
        }
    }

    static async login(player: PlayerMp, username: string, pass: string) {
        try {
            if (PlayerUtils.getDb(player)) {
                return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Esti deja logat.");
            }

            const user = await User.findOneBy({ username });
            if (!user) {
                return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Contul nu exista.");
            }

            if (user.isBanned) {
                return player.outputChatBox(`!{#FF0000}Esti banat pe acest server! Motiv: ${user.banReason}`);
            }

            const match = await bcrypt.compare(pass, user.password);
            if (!match) {
                return player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Parola este incorecta.");
            }

            // Atasam datele jucatorului
            PlayerUtils.setDb(player, user);
            player.name = user.username;
            
            // Spawn & Stat load
            const pos = JSON.parse(user.lastPos);
            player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
            player.dimension = user.dimension;
            player.health = user.health;
            player.armour = user.armor;

            player.outputChatBox(`!{#00FF00}Bine ai revenit, !{#FFFFFF}${username}!`);
            player.outputChatBox(`!{#FFFF00}Stats: !{#FFFFFF}Level ${user.level} | Bani: $${user.money.toLocaleString()}`);
            
            Logger.info(`[AUTH] ${username} s-a logat.`);
        } catch (e) {
            Logger.error("Eroare la login:", (e as any).message);
        }
    }

    static async savePlayer(player: PlayerMp) {
        const user = PlayerUtils.getDb(player);
        if (!user || !mp.players.exists(player)) return;

        user.health = player.health;
        user.armor = player.armour;
        user.dimension = player.dimension;
        user.lastPos = JSON.stringify({ x: player.position.x, y: player.position.y, z: player.position.z });
        
        try {
            await user.save();
        } catch (e) {
            Logger.error(`Eroare la salvarea lui ${user.username}:`, (e as any).message);
        }
    }
}