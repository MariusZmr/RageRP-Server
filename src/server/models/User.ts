import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    username!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    email?: string;

    // --- Admin & Status ---
    @Column({ type: "int", default: 0 })
    adminLevel!: number;

    @Column({ type: "int", default: 0 })
    helperLevel!: number;

    @Column({ type: "int", default: 0 })
    vipLevel!: number;

    // --- Stats ---
    @Column({ type: "int", default: 1 })
    level!: number;

    @Column({ type: "int", default: 0 })
    exp!: number;

    @Column({ type: "bigint", default: 10000, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    money!: number;

    @Column({ type: "bigint", default: 50000, transformer: { to: (v: number) => v, from: (v: string) => parseInt(v) } })
    bank!: number;

    // --- Character Status ---
    @Column({ type: "int", default: 100 })
    health!: number;

    @Column({ type: "int", default: 0 })
    armor!: number;

    @Column({ type: "int", default: 100 })
    hunger!: number;

    @Column({ type: "int", default: 100 })
    thirst!: number;

    // --- Job & Org ---
    @Column({ type: "int", default: 0 })
    jobId!: number;

    @Column({ type: "int", default: 0 })
    factionId!: number;

    @Column({ type: "int", default: 0 })
    factionRank!: number;

    // --- Persistence ---
    @Column({ type: "varchar", length: 255, default: '{"x": -425.5, "y": 1123.3, "z": 325.8}' })
    lastPos!: string;

    @Column({ type: "int", default: 0 })
    dimension!: number;

    // --- Sanctions ---
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