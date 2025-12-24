import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Logger } from "../utils/Logger";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class AuthService {
    static async register(player: PlayerMp, username: string, pass: string) {
        try {
            if (pass.length < 6) {
                return player.outputChatBox(`${Theme.Error}Securitate: ${Theme.Text}Parola este prea scurta (minim 6 caractere).`);
            }

            const existing = await User.findOneBy({ username });
            if (existing) {
                return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Acest cont este deja inregistrat.`);
            }

            const hashed = await bcrypt.hash(pass, 10);
            const userCount = await User.count();
            
            const newUser = new User();
            newUser.username = username;
            newUser.password = hashed;
            newUser.adminLevel = userCount === 0 ? 5 : 0;
            
            await newUser.save();
            player.outputChatBox(`${Theme.Success}Succes: ${Theme.Text}Contul tau a fost creat. Te rugam sa folosesti ${Theme.Primary}/login <parola>`);
            Logger.info(`[AUTH] Utilizator nou: ${username}`);
        } catch (e) {
            Logger.error("Eroare inregistrare:", (e as any).message);
        }
    }

    static async login(player: PlayerMp, username: string, pass: string) {
        try {
            if (PlayerUtils.getDb(player)) {
                return player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Esti deja autentificat.`);
            }

            const user = await User.findOneBy({ username });
            if (!user) {
                return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Numele de utilizator nu este valid.`);
            }

            if (user.isBanned) {
                player.outputChatBox(`${Theme.Error}RESTRICȚIONAT: ${Theme.Text}Acces interzis. Motiv: ${Theme.Primary}${user.banReason}`);
                return player.kick("Banned");
            }

            const match = await bcrypt.compare(pass, user.password);
            if (!match) {
                return player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Parola introdusa este incorecta.`);
            }

            PlayerUtils.setDb(player, user);
            player.name = user.username;
            
            const pos = JSON.parse(user.lastPos);
            player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
            player.dimension = user.dimension;
            player.health = user.health;
            player.armour = user.armor;

            player.outputChatBox(`${Theme.Success}Sistem: ${Theme.Text}Autentificare reusita. Bun venit, ${Theme.Primary}${username}!`);
            Logger.info(`[AUTH] ${username} s-a autentificat.`);
        } catch (e) {
            Logger.error("Eroare login:", (e as any).message);
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
            Logger.error(`Eroare salvare ${user.username}:`, (e as any).message);
        }
    }
}
