import {
  Character,
  CharacterAppearance,
  CharacterClothes,
} from "../database/entities/Character";
import { User } from "../database/entities/User";
import { Logger } from "../utils/Logger";

// DTO pentru datele venite de la Client (Character Creator UI)
export interface CharacterCreationData {
  info: {
    firstName: string;
    lastName: string;
    age: number;
    gender: number;
  };
  parents: {
    father: number;
    mother: number;
    similarity: number;
    skin: number;
  };
  features: number[];
  hair: {
    style: number;
    color: number;
    highlight: number;
  };
}

import { PlayerUtils } from "../utils/PlayerUtils";



// ... existing code ...



export class CharacterManager {

    

    // ... existing code ...



    public static async create(player: PlayerMp, data: CharacterCreationData): Promise<boolean> {

        try {

            Logger.info(`[CharCreator] Validating name: First='${data.info.firstName}', Last='${data.info.lastName}'`);



            // 1. Validare Server-Side

            if (!this.isValidName(data.info.firstName)) {

                 Logger.warn(`[CharCreator] Invalid FirstName: ${data.info.firstName}`);

                 return false;

            }

            if (!this.isValidName(data.info.lastName)) {

                 Logger.warn(`[CharCreator] Invalid LastName: ${data.info.lastName}`);

                 return false;

            }



            // Găsim user-ul asociat folosind helper-ul corect

            const user = PlayerUtils.getDb(player);

            

            if (!user) {

                Logger.error(`[Character] User not found on player object for ${player.name} (dbData is missing)`);

                return false;

            }



            // ... rest of the function ...

      // 2. Construim obiectul de Appearance din datele plate venite de la UI
      const appearance: CharacterAppearance = {
        parents: data.parents,
        features: data.features,
        hair: data.hair,
      };

      // 3. Haine Default (Civil)
      const defaultClothes: CharacterClothes = {
        top: 1, // Tricou simplu
        legs: 1, // Blugi
        shoes: 1, // Adidași
      };

      // 4. Salvare DB
      const char = new Character();
      char.user = user; // TypeORM va gestiona relația
      char.userId = user.id;
      char.firstName = data.info.firstName;
      char.lastName = data.info.lastName;
      char.gender = data.info.gender;
      char.age = data.info.age;
      char.appearance = appearance;
      char.clothes = defaultClothes;

      await char.save();
      Logger.info(
        `[Character] Created ID ${char.id} for User ${user.username}`
      );

      // 5. Spawn & Apply
      await this.load(player, char.id);

      return true;
    } catch (error) {
      Logger.error(`[CharacterManager] Create Error:`, error as any);
      return false;
    }
  }

  /**
   * Încarcă un caracter din DB și îl aplică pe jucător (Spawn).
   */
  public static async load(
    player: PlayerMp,
    characterId: number
  ): Promise<void> {
    const char = await Character.findOne({ where: { id: characterId } });

    if (!char) {
      player.outputChatBox("!{sr}Eroare: !{w}Caracterul nu a fost găsit.");
      return;
    }

    // Setăm variabila pe player pentru a ști că e spawnat
    player.data.characterId = char.id;
    player.name = `${char.firstName}_${char.lastName}`;

    // 1. Setare Model
    const modelName =
      char.gender === 0 ? "mp_m_freemode_01" : "mp_f_freemode_01";
    player.model = mp.joaat(modelName);

    // 2. Aplicare Aspect
    this.applyAppearance(player, char.appearance);

    // 3. Aplicare Haine (Basic implementation)
    // Definim niște haine default în funcție de gen dacă nu sunt setate
    if (char.gender === 0) {
      // Male
      player.setClothes(3, 15, 0, 0); // Torso
      player.setClothes(8, 15, 0, 0); // Undershirt
      player.setClothes(11, 15, 0, 0); // Top
      player.setClothes(4, 21, 0, 0); // Legs
      player.setClothes(6, 34, 0, 0); // Shoes
    } else {
      // Female
      player.setClothes(3, 15, 0, 0);
      player.setClothes(8, 15, 0, 0);
      player.setClothes(11, 15, 0, 0);
      player.setClothes(4, 21, 0, 0);
      player.setClothes(6, 35, 0, 0);
    }

    // Păr (Clothes ID 2)
    player.setClothes(2, char.appearance.hair.style, 0, 0);
    player.setHairColor(
      char.appearance.hair.color,
      char.appearance.hair.highlight
    );

    // 4. Teleport la Spawn (Ultima poziție sau Aeroport LS)
    if (
      char.lastPosition &&
      char.lastPosition.x !== 0 &&
      char.lastPosition.y !== 0
    ) {
      player.position = new mp.Vector3(
        char.lastPosition.x,
        char.lastPosition.y,
        char.lastPosition.z
      );
      player.heading = 0; // TypeORM nu stochează heading în structura curentă simplificată, putem adăuga sau lăsa 0
      player.dimension = char.lastPosition.dimension || 0;
    } else {
      player.position = new mp.Vector3(-1037.94, -2738.04, 20.169);
      player.heading = -37.0;
      player.dimension = 0;
    }

    player.health = 100;
    player.armour = 0;
  }

  /**
   * Salvează poziția curentă a caracterului în baza de date.
   */
  public static async savePosition(player: PlayerMp): Promise<void> {
    if (!player || !mp.players.exists(player) || !player.data.characterId) return;

    try {
      const pos = player.position;
      const dimension = player.dimension;
      
      await Character.update(
        { id: player.data.characterId },
        {
          lastPosition: {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            dimension: dimension,
          },
        }
      );
      
      // Opțional: Logger.info(`[Character] Position saved for ID ${player.data.characterId}`);
    } catch (e) {
      Logger.error(`[Character] Failed to save position for ${player.name}`, e as any);
    }
  }

  private static applyAppearance(
    player: PlayerMp,
    app: CharacterAppearance
  ): void {
    // Parents & Skin
    player.setHeadBlend(
      app.parents.father,
      app.parents.mother,
      0,
      app.parents.father,
      app.parents.mother,
      0,
      app.parents.similarity,
      app.parents.skin,
      0.0
    );

    // Features
    if (app.features) {
      app.features.forEach((val, index) => player.setFaceFeature(index, val));
    }
  }

  private static isValidName(name: string): boolean {
    return /^[A-Z][a-zA-Z]+$/.test(name);
  }
}
