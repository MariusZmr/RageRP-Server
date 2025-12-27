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

    @Column({ type: "int" })
    userId!: number;

    @Column({ type: "varchar", length: 50 })
    firstName!: string;

    @Column({ type: "varchar", length: 50 })
    lastName!: string;

    @Column({ type: "int" }) // 0 = Male, 1 = Female
    gender!: number;

    @Column({ type: "int" })
    age!: number;

    @Column({ type: "int", default: 0 })
    playedTime!: number;

    @Column({ type: "int", default: 1 })
    level!: number;

    @Column({ type: "int", default: 0 })
    exp!: number;

    // --- Economy ---
    @Column({ type: "bigint", default: 500, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    money!: number;

    @Column({ type: "bigint", default: 0, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    bank!: number;

    // --- Vitals ---
    @Column({ type: "int", default: 100 })
    health!: number;

    @Column({ type: "int", default: 0 })
    armor!: number;

    @Column({ type: "int", default: 100 })
    hunger!: number;

    @Column({ type: "int", default: 100 })
    thirst!: number;

    // --- Job & Faction ---
    @Column({ type: "int", default: 0 })
    jobId!: number;

    @Column({ type: "int", default: 0 })
    factionId!: number;

    @Column({ type: "int", default: 0 })
    factionRank!: number;

    // --- Appearance & Meta ---
    @Column({ type: "simple-json" }) 
    appearance!: CharacterAppearance;

    @Column({ type: "simple-json", nullable: true })
    clothes!: CharacterClothes;

    @Column({ type: "simple-json", nullable: true })
    lastPosition?: { x: number; y: number; z: number; dimension: number; heading: number };
    
    @Column({ type: "int", default: 0 })
    dimension!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}