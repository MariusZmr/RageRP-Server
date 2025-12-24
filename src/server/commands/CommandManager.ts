import fs from "fs";
import path from "path";
import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class CommandManager {
    static async loadCommands() {
        const commandsPath = __dirname;
        this.readDirRecursive(commandsPath);
        
        const commands = getAllCommands();
        Logger.info(`[CMD] Sistem Comenzi activ. ${commands.length} comenzi incarcate.`);
    }

    private static readDirRecursive(dir: string) {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                // Setăm categoria globală ca fiind numele folderului curent
                (global as any).currentLoadingCategory = item.toLowerCase();
                this.readDirRecursive(fullPath);
                (global as any).currentLoadingCategory = undefined; // Resetăm după ieșire
            } else if (item.endsWith(".js") && !item.includes("CommandManager") && !item.includes("CommandRegistry")) {
                try {
                    delete require.cache[require.resolve(fullPath)];
                    require(fullPath);
                } catch (e) {
                    Logger.error(`Eroare la incarcarea modulului ${item}:`, (e as any).message);
                }
            }
        }
    }

    static handleCommand(player: PlayerMp, message: string) {
        const args = message.split(" ");
        const trigger = args.shift()?.toLowerCase();
        if (!trigger) return;

        const cmd = findCommand(trigger);
        if (!cmd) {
            player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Comanda ${Theme.Primary}/${trigger}${Theme.Text} nu exista. Foloseste ${Theme.Primary}/help.`);
            return;
        }

        const user = PlayerUtils.getDb(player);
        if (!user && cmd.name !== "login" && cmd.name !== "register") {
            player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Autentificarea este obligatorie.`);
            return;
        }

        if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
            player.outputChatBox(`${Theme.Error}Securitate: ${Theme.Text}Nivel de acces insuficient.`);
            return;
        }

        try {
            cmd.execute(player, args, args.join(" "));
        } catch (e) {
            Logger.error(`Eroare executie /${cmd.name}:`, (e as any).stack);
            player.outputChatBox(`${Theme.Error}Eroare: ${Theme.Text}Procesare esuata.`);
        }
    }
}