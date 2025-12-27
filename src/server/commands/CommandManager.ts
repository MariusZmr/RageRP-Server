import fs from "fs";
import path from "path";
import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class CommandManager {
  static async loadCommands() {
    // În dist, CommandManager.js este în dist/commands/
    // __dirname va fi calea absolută către acel folder pe disc.
    const commandsPath = path.resolve(__dirname);

    Logger.info(`[CMD] Incarcare comenzi...`);

    try {
      if (!fs.existsSync(commandsPath)) {
        Logger.error(
          `[CMD] Calea de comenzi nu a fost gasita: ${commandsPath}`
        );
        return;
      }

      this.readDirRecursive(commandsPath);

      const commands = getAllCommands();
      Logger.info(
        `[CMD] Sistem Comenzi activ. ${commands.length} comenzi incarcate.`
      );
    } catch (e: any) {
      Logger.error(`[CMD] Eroare la incarcarea comenzilor: ${e.message}`);
    }
  }

  private static readDirRecursive(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        (global as any).currentLoadingCategory = item.toLowerCase();
        this.readDirRecursive(fullPath);
        (global as any).currentLoadingCategory = undefined;
      } else if (
        item.endsWith(".js") &&
        !item.includes("CommandManager") &&
        !item.includes("CommandRegistry") &&
        !item.includes("index")
      ) {
        try {
          const resolvedPath = path.resolve(fullPath);
          // Curățăm cache-ul pentru a permite hot-reload dacă e cazul
          delete require.cache[require.resolve(resolvedPath)];
          require(resolvedPath);
        } catch (e: any) {
          Logger.error(
            `[CMD] Eroare la incarcarea modulului ${item}: ${e.message}`
          );
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
      player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Comanda ${Theme.Primary}/${trigger}${Theme.Text} nu exista. Foloseste ${Theme.Primary}/help.`
      );
      return;
    }

    const user = PlayerUtils.getDb(player);
    if (!user && cmd.name !== "login" && cmd.name !== "register") {
      player.outputChatBox(
        `${Theme.Error}Sistem: ${Theme.Text}Autentificarea este obligatorie.`
      );
      return;
    }

    if (cmd.minAdmin && (!user || user.adminLevel < cmd.minAdmin)) {
      player.outputChatBox(
        `${Theme.Error}Securitate: ${Theme.Text}Nivel de acces insuficient.`
      );
      return;
    }

    try {
      cmd.execute(player, args, args.join(" "));
    } catch (e: any) {
      Logger.error(`[CMD] Eroare executie /${cmd.name}: ${e.stack}`);
      player.outputChatBox(
        `${Theme.Error}Eroare: ${Theme.Text}Procesare esuata.`
      );
    }
  }
}
