import { register } from "../CommandRegistry";

register({
    name: "me",
    description: "Actiune roleplay. /me <actiune>",
    category: "roleplay",
    execute: (player, args, fullText) => {
        if (!fullText) return player.outputChatBox("Utilizare: /me <actiune>");
        mp.players.forEachInRange(player.position, 20, (near) => {
            near.outputChatBox(`!{#C6A2FF}* ${player.name} ${fullText}`);
        });
    }
});

register({
    name: "do",
    description: "Descriere roleplay. /do <descriere>",
    category: "roleplay",
    execute: (player, args, fullText) => {
        if (!fullText) return player.outputChatBox("Utilizare: /do <descriere>");
        mp.players.forEachInRange(player.position, 20, (near) => {
            near.outputChatBox(`!{#C6A2FF}* ${fullText} (( ${player.name} ))`);
        });
    }
});

register({
    name: "b",
    description: "Chat OOC local. /b <mesaj>",
    category: "roleplay",
    execute: (player, args, fullText) => {
        if (!fullText) return player.outputChatBox("Utilizare: /b <mesaj>");
        mp.players.forEachInRange(player.position, 15, (near) => {
            near.outputChatBox(`!{#BBBBBB}(( [${player.id}] ${player.name}: ${fullText} ))`);
        });
    }
});

register({
    name: "shout",
    description: "Strigi la cei din jur. /s <mesaj>",
    category: "roleplay",
    execute: (player, args, fullText) => {
        if (!fullText) return player.outputChatBox("Utilizare: /s <mesaj>");
        mp.players.forEachInRange(player.position, 35, (near) => {
            near.outputChatBox(`!{#FFFFFF}${player.name} striga: ${fullText}!!`);
        });
    }
});
