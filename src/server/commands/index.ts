// Auth & General
import "./general/Help";
import "./general/Stats";
import "./general/Creator";

// Chat & Roleplay
import "./chat/RoleplayCommands";

// Dev
import "./dev/Coords";

// Admin
import "./admin/AdminChat";
import "./admin/AdminDuty";
import "./admin/Announce";
import "./admin/DeleteVeh";
import "./admin/Fix";
import "./admin/Heal";
import "./admin/Money";
import "./admin/NoClip";
import "./admin/SetAdmin";
import "./admin/SetWeather";
import "./admin/StopServer";
import "./admin/Tp";
import "./admin/UserManagement";
import "./admin/Veh";
import "./admin/Weapon";

import { Logger } from "../utils/Logger";
import { getAllCommands } from "./CommandRegistry";

export function initCommands() {
    const count = getAllCommands().length;
    Logger.info(`[CommandManager] ${count} commands loaded from bundle.`);
}
