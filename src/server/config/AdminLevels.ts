export enum AdminLevel {
    Player = 0,
    Moderator = 1,
    Admin = 2,
    SeniorAdmin = 3,
    Manager = 4,
    Owner = 5
}

export const AdminTitles: Record<number, string> = {
    [AdminLevel.Player]: "",
    [AdminLevel.Moderator]: "[Moderator]",
    [AdminLevel.Admin]: "[Admin]",
    [AdminLevel.SeniorAdmin]: "[Sr. Admin]",
    [AdminLevel.Manager]: "[Manager]",
    [AdminLevel.Owner]: "[Owner]"
};
