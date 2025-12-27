export enum ServerEvents {
    // Auth
    AUTH_LOGIN = "auth:login",
    AUTH_REGISTER = "auth:register",
    AUTH_RESPONSE = "auth:response",

    // Character
    CHAR_SELECT = "character:select",
    CHAR_CREATE = "character:create",
    CHAR_CREATE_RESPONSE = "character:create:response",

    // HUD / UI
    HUD_REQUEST = "hud:request",
    HUD_UPDATE = "hud:update",
    NOTIFICATION_SHOW = "notification:show",

    // Admin
    ADMIN_ANNOUNCE = "admin:announce",
}

export enum ClientEvents {
    // Auth
    AUTH_OPEN = "client:auth:open",

    // Character
    CHAR_APPLY_APPEARANCE = "client:applyAppearance",
    CHAR_ENTER_GAME = "client:enterGame",

    // Weather / World
    SET_WEATHER = "client:setWeather",
    
    // UI
    UI_NAVIGATE = "client:ui:navigate",
    UI_READY = "ui:ready",
}

export enum GameEvents {
    PLAYER_READY = "playerReady",
    PLAYER_JOIN = "playerJoin",
    PLAYER_QUIT = "playerQuit",
    PLAYER_CHAT = "playerChat",
    PLAYER_COMMAND = "playerCommand",
    PLAYER_DEATH = "playerDeath",
}
