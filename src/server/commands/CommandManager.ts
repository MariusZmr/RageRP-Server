import fs from "fs";
import path from "path";
import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";

export class CommandManager {
    static async loadCommands() {
        const commandsPath = __dirname;
        const categories = ["admin", "general", "roleplay"];
        
        for (const cat of categories) {
            const catPath = path.join(commandsPath, cat);
            if (!fs.existsSync(catPath)) continue;

            const files = fs.readdirSync(catPath).filter(f => f.endsWith(".js"));
            for (const file of files) {
                try {
                    const fullPath = path.join(catPath, file);
                    delete require.cache[require.resolve(fullPath)];
                    require(fullPath);
                } catch (e) {
                    Logger.error(`[CMD] Eroare la incarcarea fișierului ${file}:`, (e as any).message);
                }
            }
        }

        const totalCmds = getAllCommands();
        Logger.info(`[CMD] Sistem activat. ${totalCmds.length} comenzi principale incarcate.`);
    }

    static handleCommand(player: PlayerMp, message: string) {
        const args = message.split(" ");
        const cmdTrigger = args.shift()?.toLowerCase();
        if (!cmdTrigger) return;

        const cmd = findCommand(cmdTrigger);
        if (!cmd) {
            player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}Comanda !{#FFFF00}/" + cmdTrigger + " !{#FFFFFF}nu exista. Foloseste !{#55FF55}/help.");
            return;
        }

        const user = PlayerUtils.getDb(player);
        
        // Logic for unauthenticated players
        if (!user && cmd.name !== "login" && cmd.name !== "register") {
            player.outputChatBox("!{#FF0000}Autentificare: !{#FFFFFF}Trebuie sa fii logat pentru a folosi comenzile.");
            return;
        }

        // Admin check
        if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
            player.outputChatBox("!{#FF0000}Permisiuni: !{#FFFFFF}Nu ai acces la aceasta comanda (Min Admin: " + cmd.minAdmin + ").");
            return;
        }

        try {
            cmd.execute(player, args, args.join(" "));
        } catch (e) {
            Logger.error(`Eroare fatala la comanda /${cmd.name}:`, (e as any).stack);
            player.outputChatBox("!{#FF0000}Eroare: !{#FFFFFF}A intervenit o eroare interna la procesarea comenzii.");
        }
    }
}