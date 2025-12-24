export enum AdminLevel {
    Player = 0,
    Moderator = 1,
    Admin = 2,
    SeniorAdmin = 3,
    Manager = 4,
    Owner = 5
}

export const Theme = {
    Primary: "!{#8B0000}",    // Roșu Închis (Branding)
    Secondary: "!{#A9A9A9}",  // Gri pentru detalii
    Text: "!{#E0E0E0}",       // Text principal
    Success: "!{#27AE60}",    // Verde premium
    Error: "!{#C0392B}",      // Roșu eroare
    Divider: "!{#333333}▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
};

export const AdminConfig = {
    [AdminLevel.Player]: { title: "Jucator", color: Theme.Text },
    [AdminLevel.Moderator]: { title: "Moderator", color: "!{#2E86C1}" }, // Steel Blue
    [AdminLevel.Admin]: { title: "Admin", color: "!{#17A589}" },        // Teal
    [AdminLevel.SeniorAdmin]: { title: "Sr. Admin", color: "!{#D4AC0D}" }, // Muted Gold
    [AdminLevel.Manager]: { title: "Manager", color: "!{#8E44AD}" },     // Amethyst
    [AdminLevel.Owner]: { title: "Owner", color: Theme.Primary }         // Dark Red
};
