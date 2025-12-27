import { ISystem } from "@shared/interfaces/ISystem";

export class DebugController implements ISystem {
  private static instance: DebugController;
  public name = "DebugController";
  private isActive: boolean = false;

  private constructor() {}

  public static getInstance(): DebugController {
    if (!DebugController.instance) {
      DebugController.instance = new DebugController();
    }
    return DebugController.instance;
  }

  public init(): void {
    mp.keys.bind(0x74, false, () => this.toggleDebug()); // F5
    mp.events.add("render", () => this.onRender());
  }

  private toggleDebug() {
    this.isActive = !this.isActive;
    mp.gui.chat.push(this.isActive ? "!{00FF00}Dev: Debug Mode: ON" : "!{FF0000}Dev: Debug Mode: OFF");
  }

  private onRender() {
    if (!this.isActive) return;
    const camera = mp.cameras.new("gameplay");
    const position = camera.getCoord();
    const direction = camera.getDirection();
    const dist = 15;
    const target = new mp.Vector3(
      position.x + direction.x * dist,
      position.y + direction.y * dist,
      position.z + direction.z * dist
    );
    const hit = mp.raycasting.testPointToPoint(position, target, mp.players.local, -1);
    const lineColor = hit ? [255, 0, 0, 255] : [0, 255, 0, 100];
    mp.game.graphics.drawLine(position.x, position.y, position.z, target.x, target.y, target.z, lineColor[0], lineColor[1], lineColor[2], lineColor[3]);
    if (hit && hit.entity) this.drawEntityInfo(hit.entity, hit.position);
  }

  private drawEntityInfo(entity: any, hitPos: any) {
    let type = "UNKNOWN";
    if (entity.type === "vehicle") type = "VEHICLE";
    else if (entity.type === "player") type = "PLAYER";
    else if (entity.type === "object") type = "OBJECT";
    mp.game.graphics.drawText(`${type} (ID: ${entity.remoteId})\nModel: ${entity.model}`, [hitPos.x, hitPos.y, hitPos.z + 0.5], {
      font: 4, color: [255, 255, 255, 255], scale: [0.4, 0.4], outline: true,
    });
  }
}