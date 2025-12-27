import { Logger } from "../utils/Logger";
import { findCommand, getAllCommands } from "./CommandRegistry";
import { PlayerUtils } from "../utils/PlayerUtils";
import { Theme } from "../config/AdminLevels";

export class CommandManager {
  static async loadCommands() {
    try {
      const commands = getAllCommands();
      Logger.info(
        `[CMD] Sistem Comenzi activ. ${commands.length} comenzi inregistrate.`
      );
    } catch (e: any) {
      Logger.error(`[CMD] Eroare la incarcarea comenzilor: ${e.message}`);
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
