class NoClipManager {
  private static instance: NoClipManager;
  private active: boolean = false;
  private camera: CameraMp | null = null;

  // Configurare
  private mouseSensitivity: number = 5.0;
  private readonly speeds = {
    normal: 1.0,
    fast: 3.0, // Dacă ai HDD (nu SSD), pune 2.0 aici. 3.0+ poate bloca jocul la încărcare.
    slow: 0.1,
  };

  // Stocare rotație și timp
  private rotX: number = 0.0;
  private rotZ: number = 0.0;
  private lastPlayerUpdate: number = 0; // Pentru optimizare

  // Taste
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

  public toggle() {
    this.active = !this.active;
    const player = mp.players.local;

    if (this.active) {
      const rot = mp.game.cam.getGameplayCamRot(2);
      this.rotX = rot.x;
      this.rotZ = rot.z;

      this.camera = mp.cameras.new(
        "default",
        player.position,
        new mp.Vector3(this.rotX, 0, this.rotZ),
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
        // Aducem jucătorul la poziția finală
        player.position = pos;
        player.setHeading(this.rotZ);
        player.setRotation(0, 0, this.rotZ, 2, true);

        this.camera.setActive(false);
        this.camera.destroy();
        this.camera = null;
      }

      // RESETĂM FOCUSUL PE JUCĂTOR
      mp.game.streaming.clearFocus();

      mp.game.cam.renderScriptCams(false, false, 0, true, false);
      player.freezePosition(false);
      player.setInvincible(false);
      player.setVisible(true, false);
      player.setCollision(true, true);
    }
  }

  private onRender() {
    if (!this.active || !this.camera) return;

    // --- 1. MOUSE INPUT ---
    const mouseX = mp.game.controls.getDisabledControlNormal(0, 220);
    const mouseY = mp.game.controls.getDisabledControlNormal(0, 221);
    const isMouseMoving = Math.abs(mouseX) > 0.01 || Math.abs(mouseY) > 0.01;

    // --- 2. KEYBOARD INPUT ---
    const isW = mp.game.controls.isDisabledControlPressed(0, this.controls.W);
    const isS = mp.game.controls.isDisabledControlPressed(0, this.controls.S);
    const isA = mp.game.controls.isDisabledControlPressed(0, this.controls.A);
    const isD = mp.game.controls.isDisabledControlPressed(0, this.controls.D);
    const isSpace = mp.game.controls.isDisabledControlPressed(
      0,
      this.controls.Space
    );
    const isCtrl = mp.game.controls.isDisabledControlPressed(
      0,
      this.controls.LCtrl
    );

    // OPTIMIZARE: Dacă nu faci nimic, nu consumăm resurse
    if (!isMouseMoving && !isW && !isS && !isA && !isD && !isSpace && !isCtrl)
      return;

    // Calcul Rotație
    if (isMouseMoving) {
      this.rotZ -= mouseX * this.mouseSensitivity * 5.0;
      this.rotX -= mouseY * this.mouseSensitivity * 5.0;
      if (this.rotX < -89.0) this.rotX = -89.0;
      if (this.rotX > 89.0) this.rotX = 89.0;
      this.camera.setRot(this.rotX, 0.0, this.rotZ, 2);
    }

    // Calcul Poziție
    const camPos = this.camera.getCoord();
    let nx = camPos.x;
    let ny = camPos.y;
    let nz = camPos.z;

    if (isW || isS || isA || isD || isSpace || isCtrl) {
      let speed = this.speeds.normal;
      if (mp.game.controls.isDisabledControlPressed(0, this.controls.LShift))
        speed = this.speeds.fast;
      else if (mp.game.controls.isDisabledControlPressed(0, this.controls.LAlt))
        speed = this.speeds.slow;

      const rZ = this.rotZ * 0.01745329251;
      const rX = this.rotX * 0.01745329251;
      const cosZ = Math.cos(rZ);
      const sinZ = Math.sin(rZ);
      const cosX = Math.cos(rX);
      const sinX = Math.sin(rX);

      if (isW || isS) {
        const dir = isW ? 1 : -1;
        nx += -sinZ * Math.abs(cosX) * speed * dir;
        ny += cosZ * Math.abs(cosX) * speed * dir;
        nz += sinX * speed * dir;
      }

      if (isA || isD) {
        const dir = isD ? 1 : -1;
        nx += cosZ * speed * dir;
        ny += sinZ * speed * dir;
      }

      if (isSpace) nz += speed * 0.5;
      if (isCtrl) nz -= speed * 0.5;

      // Mutăm camera (Asta trebuie să fie smooth, la fiecare frame)
      this.camera.setCoord(nx, ny, nz);
    }

    // --- OPTIMIZARE CRITICĂ PENTRU BLOCARE ---

    // 1. Forțăm harta să se încarce unde e camera, NU unde e jucătorul
    mp.game.streaming.setFocus(nx, ny, nz);

    // 2. Mutăm jucătorul fizic DOAR o dată la 50ms.
    // Asta elimină sacadarea, pentru că nu "bombardăm" serverul cu poziții noi la fiecare milisecundă.
    const now = Date.now();
    if (now - this.lastPlayerUpdate > 50) {
      // 50ms delay
      mp.players.local.setCoordsNoOffset(nx, ny, nz, false, false, false);
      this.lastPlayerUpdate = now;
    }
  }
}

NoClipManager.getInstance();
