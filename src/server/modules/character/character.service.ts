import { Character } from "../../database/entities/Character";
import { User } from "../../database/entities/User";
import { ICharacterCreationData } from "./types/index.js";
import { Logger } from "../../utils/Logger.js";
import { ClientEvents } from "../../../shared/constants/Events";

export class CharacterService {
    private static instance: CharacterService;

    private constructor() {}

    public static getInstance(): CharacterService {
        if (!CharacterService.instance) {
            CharacterService.instance = new CharacterService();
        }
        return CharacterService.instance;
    }

    public async getById(id: number): Promise<Character | null> {
        return await Character.findOne({ where: { id } });
    }

    public async create(userId: number, data: ICharacterCreationData): Promise<Character> {
        const char = new Character();
        char.userId = userId;
        char.firstName = data.info.firstName;
        char.lastName = data.info.lastName;
        char.age = data.info.age;
        char.gender = data.info.gender;
        
        // Map ICharacterCreationData to CharacterAppearance
        char.appearance = {
            parents: data.parents,
            features: data.features,
            hair: data.hair
        };
        
        char.lastPosition = { x: -1037.5, y: -2737.5, z: 20.1, dimension: 0, heading: 0 }; 

        await char.save();
        Logger.info(`[CharacterService] Created character ${char.firstName} ${char.lastName} for User ID ${userId}`);
        return char;
    }

    public async applyToPlayer(player: PlayerMp, char: Character) {
        (player as any).activeCharacter = char; // Actualizăm referința
        
        // Use appearance object directly (handled by TypeORM simple-json)
        if (char.appearance) {
            // Trimitem datele la client pentru a le aplica, deoarece funcțiile vizuale sunt client-side
            player.call(ClientEvents.CHAR_APPLY_APPEARANCE, [char.appearance]);
        }

        if (char.lastPosition) {
            const pos = char.lastPosition;
            player.spawn(new mp.Vector3(pos.x, pos.y, pos.z));
            player.dimension = pos.dimension || 0;
            player.heading = pos.heading || 0;
        } else {
             // Fallback spawn
             player.spawn(new mp.Vector3(-1037.5, -2737.5, 20.1));
             player.heading = 0;
        }
    }

    public async savePositionData(charId: number, x: number, y: number, z: number, dimension: number, heading: number = 0) {
        try {
            const char = await this.getById(charId);
            if (char) {
                char.lastPosition = { x, y, z, dimension, heading };
                await char.save();
                Logger.info(`[CharacterService] Position saved for Char ID ${charId}`);
            }
        } catch (e: any) {
            Logger.error(`[CharacterService] Error saving position for Char ID ${charId}: ${e.message}`);
        }
    }
}
