import bcrypt from "bcryptjs";
import { User } from "../../database/entities/User";
import { Logger } from "../../utils/Logger";

export class AuthService {
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async validateCredentials(username: string, pass: string): Promise<{ success: boolean; user?: User; error?: string }> {
        const user = await User.findOne({
            where: { username },
            relations: ["characters"],
        });

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            return { success: false, error: "Nume sau parolă incorectă." };
        }

        if (user.isBanned) {
            return { success: false, error: `Cont suspendat: ${user.banReason}` };
        }

        return { success: true, user };
    }

    public async createAccount(data: { username: string; pass: string; email: string }): Promise<{ success: boolean; user?: User; error?: string }> {
        const existing = await User.findOneBy({ username: data.username });
        if (existing) return { success: false, error: "Acest nume este deja folosit." };

        const hashed = await bcrypt.hash(data.pass, 10);
        const userCount = await User.count();

        const newUser = new User();
        newUser.username = data.username;
        newUser.password = hashed;
        newUser.email = data.email;
        newUser.adminLevel = userCount === 0 ? 5 : 0;
        newUser.lastPos = JSON.stringify({ x: -425, y: 1123, z: 325 });

        await newUser.save();
        return { success: true, user: newUser };
    }
}
