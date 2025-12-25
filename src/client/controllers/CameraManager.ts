
export class CameraManager {
    private static instance: CameraManager;
    private activeCamera: CameraMp | null = null;
    private defaultPos: any;
    private defaultRot: any;

    private constructor() {
        this.defaultPos = new mp.Vector3(402.8664, -996.4108, -98.5); // Default login/char creation coords
        this.defaultRot = new mp.Vector3(0, 0, 180);
    }

    public static getInstance(): CameraManager {
        if (!CameraManager.instance) {
            CameraManager.instance = new CameraManager();
        }
        return CameraManager.instance;
    }

    public createStartCamera(): void {
        // Dacă există deja, o distrugem pentru a fi siguri
        if (this.activeCamera) {
            this.activeCamera.destroy();
        }

        // Poziționăm camera relativ la jucător pentru Character Creator
        const playerPos = mp.players.local.position;
        const playerRot = mp.players.local.getHeading();

        // Calculăm o poziție "în fața" jucătorului folosind trigonometrie simplă
        // Offset: 1.5m în față, 0.5m în sus
        const offsetDist = 2.0;
        const cameraPos = new mp.Vector3(
            playerPos.x + offsetDist * Math.sin(-playerRot * Math.PI / 180),
            playerPos.y + offsetDist * Math.cos(-playerRot * Math.PI / 180),
            playerPos.z + 0.5
        );

        this.activeCamera = mp.cameras.new('default', cameraPos, new mp.Vector3(0, 0, 0), 40);
        this.activeCamera.pointAtCoord(playerPos.x, playerPos.y, playerPos.z + 0.5);
        this.activeCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    public focusOnBone(boneName: 'head' | 'torso' | 'legs' | 'shoes' | 'default', duration: number = 1000): void {
        if (!this.activeCamera) return;

        const playerPos = mp.players.local.position;
        const playerRot = mp.players.local.getHeading();
        
        let targetHeight = 0.5; // Default (Torso/General)
        let distance = 2.5; // Default Distance
        let fov = 40;

        switch (boneName) {
            case 'head':
                targetHeight = 0.65;
                distance = 0.8; // Zoom mare
                fov = 30;
                break;
            case 'torso':
                targetHeight = 0.2;
                distance = 2.0;
                fov = 40;
                break;
            case 'legs':
                targetHeight = -0.4;
                distance = 2.0;
                fov = 45;
                break;
            case 'shoes':
                targetHeight = -0.8;
                distance = 1.2;
                fov = 40;
                break;
            case 'default':
            default:
                targetHeight = 0.0; // Center
                distance = 2.5;
                fov = 40;
                break;
        }

        // Calculăm noua poziție a camerei
        // Matematica: Luăm poziția jucătorului + un vector direcțional rotit cu unghiul jucătorului
        const angleRad = (playerRot * Math.PI) / 180;
        const frontX = Math.sin(-angleRad);
        const frontY = Math.cos(-angleRad);

        const newPos = new mp.Vector3(
            playerPos.x + (frontX * distance),
            playerPos.y + (frontY * distance),
            playerPos.z + targetHeight
        );

        // Creăm o cameră nouă temporară pentru interpolare
        const newCam = mp.cameras.new('default', newPos, new mp.Vector3(0, 0, 0), fov);
        newCam.pointAtCoord(playerPos.x, playerPos.y, playerPos.z + targetHeight);

        // Interpolare
        newCam.setActiveWithInterp(this.activeCamera.handle, duration, 1, 1);
        
        // După ce începe interpolarea, vechea cameră devine cea nouă (logic)
        // Dar în RageMP trebuie să gestionăm handle-urile. 
        // Setăm noua cameră ca activă după un mic delay sau o păstrăm în memorie.
        
        // Clean up old camera after interp? 
        // O abordare mai simplă: Update properties of active camera directly if using ease functions, 
        // dar interp nativ e mai smooth.
        
        setTimeout(() => {
            if (this.activeCamera && mp.cameras.exists(this.activeCamera)) {
                this.activeCamera.destroy();
            }
            this.activeCamera = newCam;
        }, duration);
    }

    public destroy(): void {
        if (this.activeCamera) {
            this.activeCamera.destroy();
            this.activeCamera = null;
        }
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
}
