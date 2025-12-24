import fs from "fs";
import path from "path";
import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class CommandManager {
    static async loadCommands() {
        const commandsPath = __dirname;
        const totalFiles = this.readDirRecursive(commandsPath);
        
        const commands = getAllCommands();
        Logger.info(`[CMD] Sistem Enterprise activat. ${commands.length} comenzi din ${totalFiles} module.`);
    }

    private static readDirRecursive(dir: string): number {
        let count = 0;
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                count += this.readDirRecursive(fullPath);
            } else if (item.endsWith(".js") && !item.includes("CommandManager") && !item.includes("CommandRegistry")) {
                try {
                    delete require.cache[require.resolve(fullPath)];
                    require(fullPath);
                    count++;
                } catch (e) {
                    Logger.error(`Eroare la modulul ${item}:`, (e as any).message);
                }
            }
        }
        return count;
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
            player.outputChatBox(`${Theme.Error}Sistem: ${Theme.Text}Trebuie sa te autentifici pentru a accesa sistemul.`);
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
