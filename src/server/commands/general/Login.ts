import { register } from "../CommandRegistry";
import { AuthService } from "../../services/AuthService";
import { Theme } from "../../config/AdminLevels";

register({
    name: "login",
    description: "Autentificare securizata in baza de date.",
    aliases: ["l", "auth"],
    category: "general",
    execute: (player, args) => {
        if (!args[0]) return player.outputChatBox(`${Theme.Error}Info: ${Theme.Text}Utilizeaza /login <parola>`);
        AuthService.login(player, player.name, args[0]);
    }
});
