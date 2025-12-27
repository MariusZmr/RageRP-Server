import { User } from "../database/entities/User";
import { Character } from "../database/entities/Character";

declare global {
  interface PlayerMp {
    dbData: User;
    activeCharacter: Character;
    
    setVariable(key: string, value: any): void;
  }
}

export {};