import { CameraManager } from "./CameraManager";

export class CharacterController {
    private static instance: CharacterController;

    private constructor() {
        this.initEvents();
    }

    public static getInstance(): CharacterController {
        if (!CharacterController.instance) {
            CharacterController.instance = new CharacterController();
        }
        return CharacterController.instance;
    }

    private initEvents() {
        // --- UI Events (Receive from Browser) ---

        // 1. Preview Update (Main Handler)
        mp.events.add('char:previewUpdate', (rawPayload: string | object) => {
            try {
                // Uneori vine ca string JSON, alteori ca obiect direct din EventManager
                const payload = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
                this.handlePreviewUpdate(payload);
            } catch (e) {
                mp.console.logError(`[CharController] Error parsing preview: ${e}`);
            }
        });

        // 2. Camera Focus Change
        mp.events.add('char:cameraFocus', (part: string) => {
            // Mapăm string-urile din UI la tipurile din CameraManager
            const validParts: any = ['head', 'torso', 'legs', 'shoes', 'default'];
            if (validParts.includes(part)) {
                CameraManager.getInstance().focusOnBone(part as any);
            } else {
                CameraManager.getInstance().focusOnBone('default');
            }
        });

        // 3. Final Save
        mp.events.add('character:create', (dataRaw: any) => {
            // Aici doar pasăm mai departe către server
            mp.events.callRemote('character:create', dataRaw);
        });
    }

    private handlePreviewUpdate(payload: { type: string, data: any }) {
        const player = mp.players.local;
        const { type, data } = payload;

        switch (type) {
            case 'parents':
                // data: { father, mother, similarity, skin }
                // setHeadBlendData(shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix, isParent)
                player.setHeadBlendData(
                    data.father, 
                    data.mother, 
                    0, 
                    data.father, 
                    data.mother, 
                    0, 
                    data.similarity, 
                    data.skin, 
                    0, 
                    false
                );
                break;

            case 'features':
                // data: number[] (array de 20 valori intre -1.0 si 1.0)
                data.forEach((val: number, index: number) => {
                    player.setFaceFeature(index, val);
                });
                break;

            case 'hair':
                // data: { style, color, highlight }
                player.setComponentVariation(2, data.style, 0, 0); // Component 2 = Hair
                player.setHairColor(data.color, data.highlight);
                break;

            case 'gender':
                // data: 0 (Male) or 1 (Female)
                const model = data === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
                // Schimbarea modelului este asincronă și resetează hainele, deci s-ar putea să avem nevoie de re-aplicare
                if (player.model !== mp.game.joaat(model)) {
                    player.model = mp.game.joaat(model);
                    // Resetăm camera pentru noul model (înălțime diferită poate)
                    setTimeout(() => CameraManager.getInstance().focusOnBone('default'), 500);
                }
                break;
        }
    }
}
