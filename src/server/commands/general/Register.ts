import { register } from "../CommandRegistry";
import { AuthService } from "../../services/AuthService";
import { Theme } from "../../config/AdminLevels";

register({
    name: "register",
    description: "Crearea unui profil nou in sistemul Serveros.",
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Info: ${Theme.Text}Utilizeaza /register <parola>`);
        AuthService.register(player, player.name, args[0]);
    }
});
