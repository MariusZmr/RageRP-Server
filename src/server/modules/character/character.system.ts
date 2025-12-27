import { ISystem } from "../../../shared/interfaces/ISystem";
import { CharacterService } from "./character.service";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { Logger } from "../../utils/Logger";
import { HUDUtils } from "../../utils/HUDUtils";
import { Character } from "../../database/entities/Character";
import { ServerEvents, ClientEvents } from "../../../shared/constants/Events";

export class CharacterSystem implements ISystem {
  private static instance: CharacterSystem;
  public name = "CharacterSystem";

  private constructor() {}

  public static getInstance(): CharacterSystem {
    if (!CharacterSystem.instance) {
      CharacterSystem.instance = new CharacterSystem();
    }
    return CharacterSystem.instance;
  }

  public init(): void {
    this.registerEvents();
    Logger.info(`[${this.name}] Modulul a pornit.`);
  }

  private registerEvents(): void {
    mp.events.add(ServerEvents.CHAR_SELECT, (player, charId) =>
      this.handleSelect(player, charId)
    );
    mp.events.add(ServerEvents.CHAR_CREATE, (player, data) =>
      this.handleCreate(player, data)
    );
  }

  private async handleSelect(player: PlayerMp, charId: number): Promise<void> {
    try {
      const user = PlayerUtils.getDb(player);
      if (!user) return;

      const char = await CharacterService.getInstance().getById(charId);
      if (!char || char.userId !== user.id) {
        return player.call(ServerEvents.NOTIFICATION_SHOW, [
          "Identitate invalidă!",
          "error",
        ]);
      }

      await CharacterService.getInstance().applyToPlayer(player, char);
      player.call(ClientEvents.CHAR_ENTER_GAME);
      HUDUtils.update(player);

      Logger.info(
        `[Character] ${player.name}(${user.id}) a selectat caracterul ${char.firstName} ${char.lastName}`
      );
    } catch (e: any) {
      Logger.error(
        `[Character] Eroare la selectarea caracterului: ${e.message}`
      );
    }
  }

  private async handleCreate(player: PlayerMp, dataRaw: any): Promise<void> {
    try {
      const data = typeof dataRaw === "string" ? JSON.parse(dataRaw) : dataRaw;
      const user = PlayerUtils.getDb(player);
      if (!user) return;

      const count = await Character.count({ where: { userId: user.id } });
      if (count >= user.characterSlots) {
        return player.call(ServerEvents.CHAR_CREATE_RESPONSE, [
          { success: false, error: "Limită sloturi atinsă." },
        ]);
      }

      const newChar = await CharacterService.getInstance().create(
        user.id,
        data
      );
      await CharacterService.getInstance().applyToPlayer(player, newChar);

      player.call(ServerEvents.CHAR_CREATE_RESPONSE, [{ success: true }]);
      HUDUtils.update(player);
    } catch (e: any) {
      Logger.error(`[Character] Eroare la crearea caracterului: ${e.message}`);
      player.call(ServerEvents.CHAR_CREATE_RESPONSE, [
        { success: false, error: "Eroare server." },
      ]);
    }
  }
}
