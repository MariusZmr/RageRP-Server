import "@ragemp/types";

declare global {
    type PlayerMp = PlayerMpClient;
    type CameraMp = CameraMpClient;
    var mp: MpClient;
}
