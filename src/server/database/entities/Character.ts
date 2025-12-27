import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import type { User } from "./User";

// --- Interfețe pentru structura JSON ---

export interface CharacterParents {
    father: number;      // ID model tată
    mother: number;      // ID model mamă
    similarity: number;  // Mix genetic
    skin: number;        // Mix piele
}

export interface CharacterAppearance {
    parents: CharacterParents;
    features: number[];  // Array de 20 floats
    hair: {
        style: number;
        color: number;
        highlight: number;
    };
    // Putem extinde cu overlays (barbă, machiaj) în viitor
}

// Structură simplificată pentru haine de start
export interface CharacterClothes {
    top: number;
    legs: number;
    shoes: number;
}

@Entity("characters")
export class Character extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("User", "characters")
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column()
    userId!: number;

    @Column({ length: 50 })
    firstName!: string;

    @Column({ length: 50 })
    lastName!: string;

    @Column({ type: "int" }) // 0 = Male, 1 = Female
    gender!: number;

    @Column({ type: "int" })
    age!: number;

    @Column({ type: "int", default: 0 })
    playedTime!: number;

    @Column({ type: "int", default: 1 })
    level!: number;

    // Stocăm structura JSON complexă pentru aspect
    @Column({ type: "simple-json" }) 
    appearance!: CharacterAppearance;

    // Stocăm hainele (pentru început simplu, poate fi extins)
    @Column({ type: "simple-json", nullable: true })
    clothes!: CharacterClothes;

    @Column({ type: "simple-json", nullable: true })
    lastPosition?: { x: number; y: number; z: number; dimension: number; heading: number };

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}