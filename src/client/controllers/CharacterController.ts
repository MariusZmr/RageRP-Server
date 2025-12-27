import { ISystem } from "@shared/interfaces/ISystem";
import { CameraManager } from "./CameraManager";
import { UIManager } from "./UIManager";
import { NotificationManager } from "./NotificationManager";

export class CharacterController implements ISystem {
    private static instance: CharacterController;
    public name = "CharacterController";
    private isCreatorOpen: boolean = false;

    private constructor() {}

    public static getInstance(): CharacterController {
        if (!CharacterController.instance) {
            CharacterController.instance = new CharacterController();
        }
        return CharacterController.instance;
    }

    public init(): void {
        // --- Game Events ---
        mp.events.add("client:openCreator", () => this.startCreatorSession());
        mp.events.add("client:requestCreator", () => this.startCreatorSession());
        mp.events.add("client:enterGame", () => this.enterGame());

        // --- UI Responses ---
        mp.events.add("character:select", (charId: number) => {
            mp.events.callRemote("character:select", charId);
        });

        mp.events.add("character:create:response", (responseRaw: any) => {
            let response = typeof responseRaw === "string" ? JSON.parse(responseRaw) : responseRaw;
            if (Array.isArray(response)) response = response[0];

            if (response && response.success) {
                this.enterGame();
                NotificationManager.show("success", "Caracter Creat", "Identitate nouă stabilită cu succes.");
            } else {
                NotificationManager.show("error", "Eroare Creare", response.error || "A apărut o problemă.");
            }
        });

        // --- Creator Preview Events ---
        mp.events.add('char:previewUpdate', (rawPayload: any) => {
            const payload = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
            this.handlePreviewUpdate(payload);
        });

        mp.events.add('char:cameraFocus', (part: string) => {
            const validParts: any = ['head', 'torso', 'legs', 'shoes', 'default'];
            CameraManager.getInstance().focusOnBone(validParts.includes(part) ? part as any : 'default');
        });

        mp.events.add('character:create', (dataRaw: any) => {
            mp.events.callRemote('character:create', dataRaw);
        });

        mp.events.add("client:applyAppearance", (appearance: any) => this.applyAppearance(appearance));

        // ESC Key Handler for Creator
        mp.keys.bind(0x1b, false, () => {
            if (this.isCreatorOpen) {
                this.isCreatorOpen = false;
                CameraManager.getInstance().destroy();
                UIManager.getInstance().showPage("/login");
                NotificationManager.show("info", "Anulare", "Te-ai întors la ecranul de autentificare.");
            }
        });
    }

    public startCreatorSession() {
        if (this.isCreatorOpen) return;
        this.isCreatorOpen = true;

        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        mp.gui.cursor.show(true, true);

        const localPlayer = mp.players.local;
        localPlayer.position = new mp.Vector3(402.8664, -996.4108, -99.00404);
        localPlayer.setHeading(180.0);
        localPlayer.freezePosition(true);
        localPlayer.setAlpha(255);
        localPlayer.setVisible(true, false);
        localPlayer.model = mp.game.joaat("mp_m_freemode_01");

        setTimeout(() => {
            CameraManager.getInstance().createStartCamera();
            UIManager.getInstance().showPage("/char-creator", {}, { enableCursor: true });
        }, 150);
    }

    public enterGame() {
        this.isCreatorOpen = false;
        UIManager.getInstance().showPage("/game", {}, { enableCursor: false });
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        mp.players.local.freezePosition(false);
        mp.players.local.setVisible(true, false);
        CameraManager.getInstance().destroy();
    }

    private applyAppearance(appearance: any) {
        if (!appearance) return;
        const player = mp.players.local;
        const { parents, features, hair } = appearance;

        if (parents) {
            player.setHeadBlendData(
                parents.father, parents.mother, 0,
                parents.father, parents.mother, 0,
                parents.similarity, parents.skin, 0, false
            );
        }

        if (features) {
            features.forEach((val: number, index: number) => player.setFaceFeature(index, val));
        }

        if (hair) {
            player.setComponentVariation(2, hair.style, 0, 0);
            player.setHairColor(hair.color, hair.highlight);
        }
    }

    private handlePreviewUpdate(payload: { type: string, data: any }) {
        const player = mp.players.local;
        const { type, data } = payload;

        switch (type) {
            case 'parents':
                player.setHeadBlendData(data.father, data.mother, 0, data.father, data.mother, 0, data.similarity, data.skin, 0, false);
                break;
            case 'features':
                data.forEach((val: number, index: number) => player.setFaceFeature(index, val));
                break;
            case 'hair':
                player.setComponentVariation(2, data.style, 0, 0);
                player.setHairColor(data.color, data.highlight);
                break;
            case 'gender':
                const model = data === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
                if (player.model !== mp.game.joaat(model)) {
                    player.model = mp.game.joaat(model);
                    setTimeout(() => CameraManager.getInstance().focusOnBone('default'), 500);
                }
                break;
        }
    }
}
