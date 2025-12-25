import { AuthService } from "../services/AuthService";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Logger } from "../utils/Logger";
import { HUDUtils } from "../utils/HUDUtils";

mp.events.add("auth:login", async (player: PlayerMp, username: string, pass: string) => {
    try {
        const user = await User.findOneBy({ username });
        
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            return player.call("auth:response", [{ success: false, error: "Nume sau parolă incorectă." }]);
        }

        if (user.isBanned) {
            return player.call("auth:response", [{ success: false, error: `Cont suspendat: ${user.banReason}` }]);
        }

        PlayerUtils.setDb(player, user);
        player.name = user.username;
        
        let pos;
        try { pos = JSON.parse(user.lastPos); } catch { pos = { x: -425, y: 1123, z: 325 }; }

        player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
        player.dimension = user.dimension;
        player.health = user.health;
        player.armour = user.armor;

        player.call("auth:response", [{ success: true }]);
        
        // Trimitem datele HUD imediat după login
        HUDUtils.update(player);
        
        Logger.info(`[Auth] ${username} s-a logat.`);

    } catch (e) {
        Logger.error("Auth Error:", (e as any).message);
        player.call("auth:response", [{ success: false, error: "Eroare internă server." }]);
    }
});

mp.events.add("auth:register", async (player: PlayerMp, username: string, pass: string, email: string) => {
    try {
        if (pass.length < 6) return player.call("auth:response", [{ success: false, error: "Parola minim 6 caractere." }]);

        const existing = await User.findOneBy({ username });
        if (existing) return player.call("auth:response", [{ success: false, error: "Acest nume este deja folosit." }]);

        const hashed = await bcrypt.hash(pass, 10);
        const userCount = await User.count();
        
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashed;
        newUser.email = email;
        newUser.adminLevel = userCount === 0 ? 5 : 0;
        newUser.lastPos = JSON.stringify({ x: -425, y: 1123, z: 325 });
        
        await newUser.save();
        
        PlayerUtils.setDb(player, newUser);
        player.name = newUser.username;
        player.spawn(new mp.Vector3(-425, 1123, 325));
        
        player.call("auth:response", [{ success: true }]);
        
        // Trimitem datele HUD
        HUDUtils.update(player);

        Logger.info(`[Auth] Cont nou creat: ${username}`);

    } catch (e) {
        Logger.error("Register Error:", (e as any).message);
        player.call("auth:response", [{ success: false, error: "Eroare la înregistrare." }]);
    }
});

// Ascultăm cererea HUD-ului de reîmprospătare (ex: la reload pagină)
mp.events.add("hud:request", (player: PlayerMp) => {
    HUDUtils.update(player);
});