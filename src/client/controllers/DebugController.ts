export class DebugController {
  private static instance: DebugController;
  private isActive: boolean = false;
  private lastRaycastResult: any = null;

  private constructor() {
    // Tasta F5 pentru a activa/dezactiva modul Debug
    mp.keys.bind(0x74, false, () => this.toggleDebug()); // 0x74 = F5

    // Render loop (se execută la fiecare frame al jocului)
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): DebugController {
    if (!DebugController.instance) {
      DebugController.instance = new DebugController();
    }
    return DebugController.instance;
  }

  private toggleDebug() {
    this.isActive = !this.isActive;
    mp.gui.chat.push(
      this.isActive
        ? "!{00FF00}Dev: Debug Mode: ON"
        : "!{FF0000}Dev: Debug Mode: OFF"
    );
  }

  private onRender() {
    if (!this.isActive) return;

    // 1. Calculăm geometria razei
    const camera = mp.cameras.new("gameplay"); // Camera curentă
    const position = camera.getCoord();
    const direction = camera.getDirection();

    // Raza se duce 15 metri în față
    const dist = 15;
    const target = new mp.Vector3(
      position.x + direction.x * dist,
      position.y + direction.y * dist,
      position.z + direction.z * dist
    );

    // 2. Executăm Raycast-ul (Căutăm entități)
    // testPointToPoint(start, end, ignoreEntity, flags)
    // flags: 1=Map, 2=Vehicles, 4=Peds, 8=Players, 16=Objects. Le sumăm sau punem -1 pt toate.
    const hit = mp.raycasting.testPointToPoint(
      position,
      target,
      mp.players.local,
      -1
    );

    // 3. Desenăm linia (Visual Feedback)
    // Dacă lovim ceva, linia e Roșie. Dacă nu, e Verde.
    const lineColor = hit ? [255, 0, 0, 255] : [0, 255, 0, 100];
    mp.game.graphics.drawLine(
      position.x,
      position.y,
      position.z,
      target.x,
      target.y,
      target.z,
      lineColor[0],
      lineColor[1],
      lineColor[2],
      lineColor[3]
    );

    // 4. Afișăm informațiile pe ecran
    if (hit && hit.entity) {
      this.drawEntityInfo(hit.entity, hit.position);
    }
  }

  private drawEntityInfo(entity: any, hitPos: any) {
    // Determinăm tipul entității
    let type = "UNKNOWN";
    if (entity.type === "vehicle") type = "VEHICLE";
    else if (entity.type === "player") type = "PLAYER";
    else if (entity.type === "object") type = "OBJECT";

    // Colectăm date
    const id = entity.remoteId; // ID-ul de pe server (cel important pt comenzi)
    const model = entity.model; // Hash-ul modelului

    // Desenăm textul 3D deasupra entității
    mp.game.graphics.drawText(
      `${type} (ID: ${id})\nModel: ${model}`,
      [hitPos.x, hitPos.y, hitPos.z + 0.5],
      {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.4, 0.4],
        outline: true,
      }
    );
  }
}
