export enum AdminLevel {
    Player = 0,
    Moderator = 1,
    Admin = 2,
    SeniorAdmin = 3,
    Manager = 4,
    Owner = 5
}

export const AdminConfig = {
    [AdminLevel.Player]: { title: "", color: "!{#FFFFFF}" },
    [AdminLevel.Moderator]: { title: "[Moderator] ", color: "!{#55FF55}" },
    [AdminLevel.Admin]: { title: "[Admin] ", color: "!{#3399FF}" },
    [AdminLevel.SeniorAdmin]: { title: "[Sr. Admin] ", color: "!{#FF9900}" },
    [AdminLevel.Manager]: { title: "[Manager] ", color: "!{#FF33CC}" },
    [AdminLevel.Owner]: { title: "[Owner] ", color: "!{#AA0000}" } // Roșu închis profesional
};