import { register } from "../CommandRegistry";
import { Theme } from "../../config/AdminLevels";

register({
    name: "creator",
    description: "Deschide creatorul de caractere pentru testare.",
    usage: "/creator",
    execute: (player) => {
        player.outputChatBox(`${Theme.Primary}Sistem: !{w}Se deschide creatorul de caractere...`);
        // Trimitem un event către client pentru a deschide UI-ul
        player.call("client:openCreator");
    }
});
