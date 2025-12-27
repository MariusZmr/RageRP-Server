import { Theme } from "../../shared/constants/Themes";

export enum AdminLevel {
    Player = 0,
    Moderator = 1,
    Admin = 2,
    SeniorAdmin = 3,
    Manager = 4,
    Owner = 5
}

export { Theme };

export const AdminConfig = {
    [AdminLevel.Player]: { title: "Jucator", color: Theme.Text },
    [AdminLevel.Moderator]: { title: "Moderator", color: "!{#2E86C1}" }, // Steel Blue
    [AdminLevel.Admin]: { title: "Admin", color: "!{#17A589}" },        // Teal
    [AdminLevel.SeniorAdmin]: { title: "Sr. Admin", color: "!{#D4AC0D}" }, // Muted Gold
    [AdminLevel.Manager]: { title: "Manager", color: "!{#8E44AD}" },     // Amethyst
    [AdminLevel.Owner]: { title: "Owner", color: Theme.Primary }         // Dark Red
};