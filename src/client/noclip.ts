class NoClipManager {
  private static instance: NoClipManager;
  private active: boolean = false;
  private camera: CameraMp | null = null;

  // Setări viteză și sensibilitate
  private mouseSensitivity: number = 3.0; // Ajustabil
  private readonly speeds = {
    normal: 1.0,
    fast: 3.0,
    slow: 0.1,
  };

  // Variabile pentru optimizare (Ghost Mode)
  private lastPlayerUpdate: number = 0;

  private readonly controls = {
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    Space: 321,
    LCtrl: 326,
    LShift: 21,
    LAlt: 19,
  };

  private constructor() {
    mp.events.add("client:toggleNoClip", () => this.toggle());
    mp.events.add("render", () => this.onRender());
  }

  public static getInstance(): NoClipManager {
    if (!NoClipManager.instance) NoClipManager.instance = new NoClipManager();
    return NoClipManager.instance;
  }

  // --- FUNCȚII MATEMATICE (Din scriptul tău) ---

  // Calculează direcția înainte pe baza rotației
  private getForwardVector(rot: { x: number; z: number }): {
    x: number;
    y: number;
    z: number;
  } {
    const z = rot.z * (Math.PI / 180.0);
    const x = rot.x * (Math.PI / 180.0);
    const num = Math.abs(Math.cos(x));

    return {
      x: -Math.sin(z) * num,
      y: Math.cos(z) * num,
      z: Math.sin(x),
    };
  }

  // Normalizează vectorul (îl aduce la lungimea de 1)
  private getNormalizedVector(vector: { x: number; y: number; z: number }) {
    const mag = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    return {
      x: vector.x / mag,
      y: vector.y / mag,
      z: vector.z / mag,
    };
  }

  // Produsul Vectorial (pentru a afla direcția "Dreapta" perfectă)
  private getCrossProduct(
    v1: { x: number; y: number; z: number },
    v2: { x: number; y: number; z: number }
  ) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  // --- LOGICA NOCLIP ---

  public toggle() {
    this.active = !this.active;
    const player = mp.players.local;

    if (this.active) {
      const rot = mp.game.cam.getGameplayCamRot(2);
      this.camera = mp.cameras.new(
        "default",
        player.position,
        new mp.Vector3(rot.x, rot.y, rot.z),
        45
      );
      this.camera.setActive(true);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);

      player.freezePosition(true);
      player.setInvincible(true);
      player.setVisible(false, false);
      player.setCollision(false, false);
    } else {
      if (this.camera) {
        const pos = this.camera.getCoord();
        const rot = this.camera.getRot(2);

        player.position = pos;
        player.setHeading(rot.z);
        player.setRotation(0, 0, rot.z, 2, true);

        this.camera.setActive(false);
        this.camera.destroy();
        this.camera = null;
      }

      // Deblocăm focusul hărții
      mp.game.invoke("0x31B73D1EA9F01DA2"); // CLEAR_FOCUS

      mp.game.cam.renderScriptCams(false, false, 0, true, false);
      player.freezePosition(false);
      player.setInvincible(false);
      player.setVisible(true, false);
      player.setCollision(true, true);
    }
  }

  private onRender() {
    if (!this.active || !this.camera || mp.gui.cursor.visible) return;

    // --- 1. INPUT ---
    const rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    const rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    const leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218); // A/D
    const leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219); // W/S

    // Deadzone check (dacă nu facem nimic, ieșim rapid pentru FPS)
    if (
      Math.abs(rightAxisX) < 0.01 &&
      Math.abs(rightAxisY) < 0.01 &&
      Math.abs(leftAxisX) < 0.01 &&
      Math.abs(leftAxisY) < 0.01 &&
      !mp.game.controls.isDisabledControlPressed(0, this.controls.Space) &&
      !mp.game.controls.isDisabledControlPressed(0, this.controls.LCtrl)
    ) {
      return;
    }

    // --- 2. ROTAȚIE ---
    const currentRot = this.camera.getRot(2);
    const newRotX = currentRot.x + rightAxisY * -5.0; // Păstrat logica din scriptul tău
    const newRotZ = currentRot.z + rightAxisX * -5.0;

    // Aplicăm rotația
    this.camera.setRot(newRotX, 0.0, newRotZ, 2);

    // --- 3. MIȘCARE VECTORIALĂ ---

    // Calculăm viteza
    let speedMult = this.speeds.normal;
    if (mp.game.controls.isDisabledControlPressed(0, this.controls.LShift))
      speedMult = this.speeds.fast;
    else if (mp.game.controls.isDisabledControlPressed(0, this.controls.LCtrl))
      speedMult = this.speeds.slow;

    // Obținem vectorii de direcție
    const forwardVector = this.getForwardVector({ x: newRotX, z: newRotZ }); // Forward
    const upVector = { x: 0, y: 0, z: 1 }; // World Up

    // Calculăm vectorul "Dreapta" folosind Cross Product (Exact ca în scriptul tău)
    // Asta asigură că A și D merg mereu perfect lateral față de unde te uiți
    let rightVector = this.getCrossProduct(
      this.getNormalizedVector(forwardVector),
      this.getNormalizedVector(upVector)
    );

    // Vectorul final de mișcare
    let moveX = 0,
      moveY = 0,
      moveZ = 0;

    // Adăugăm mișcarea Înainte/Înapoi (W/S - axa Y a controllerului)
    // Notă: leftAxisY e negativ când apeși W, deci inversăm semnul
    moveX += forwardVector.x * leftAxisY * speedMult * -1;
    moveY += forwardVector.y * leftAxisY * speedMult * -1;
    moveZ += forwardVector.z * leftAxisY * speedMult * -1;

    // Adăugăm mișcarea Stânga/Dreapta (A/D - axa X a controllerului)
    moveX += rightVector.x * leftAxisX * speedMult * 0.5;
    moveY += rightVector.y * leftAxisX * speedMult * 0.5;
    moveZ += rightVector.z * leftAxisX * speedMult * 0.5;

    // Adăugăm mișcarea Sus/Jos (Space/Ctrl)
    if (mp.game.controls.isDisabledControlPressed(0, this.controls.Space)) {
      moveZ += speedMult * 0.5;
    }
    // Folosim Alt pentru coborâre dacă Ctrl e folosit pentru slow,
    // sau lăsăm Ctrl dacă nu e conflict. Aici am pus Q/E logic pe Space/Alt.
    // Scriptul tău folosea Q/E. Putem adapta. Aici folosesc Space pentru UP.
    // Dacă vrei exact ca în scriptul tău:
    /*
        if (mp.keys.isDown(81)) moveZ += speedMult * 0.5; // Q
        if (mp.keys.isDown(69)) moveZ -= speedMult * 0.5; // E
        */

    // --- 4. APLICARE POZIȚIE ---
    const currentPos = this.camera.getCoord();
    const nx = currentPos.x + moveX;
    const ny = currentPos.y + moveY;
    const nz = currentPos.z + moveZ;

    this.camera.setCoord(nx, ny, nz);

    // --- 5. OPTIMIZARE (Anti-Freeze & Anti-Lag) ---

    // Încarcă harta la poziția camerei (evită dispariția clădirilor)
    mp.game.invoke("0xBB7454BAFF08FE25", nx, ny, nz, 0.0, 0.0, 0.0); // SET_FOCUS_POS_AND_VEL

    // Trage jucătorul după cameră cu delay (pentru performanță)
    const now = Date.now();
    if (now - this.lastPlayerUpdate > 50) {
      mp.players.local.setCoordsNoOffset(nx, ny, nz, false, false, false);
      this.lastPlayerUpdate = now;
    }
  }
}

NoClipManager.getInstance();
