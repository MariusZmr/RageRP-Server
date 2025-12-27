import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import type { Character } from "./Character";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany("Character", "user")
    characters!: Character[];

    @Column({ type: "varchar", length: 50, unique: true })
    username!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    email?: string;

    // --- Admin & Status (Account Wide) ---
    @Column({ type: "int", default: 0 })
    adminLevel!: number;

    @Column({ type: "int", default: 0 })
    helperLevel!: number;

    @Column({ type: "int", default: 0 })
    vipLevel!: number;

    @Column({ type: "int", default: 1 })
    characterSlots!: number;

    @Column({ type: "int", default: 0 })
    accountPlayedTime!: number;

    // --- Sanctions (Account Wide) ---
    @Column({ type: "int", default: 0 })
    warns!: number;

    @Column({ type: "int", default: 0 })
    isBanned!: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    banReason?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}