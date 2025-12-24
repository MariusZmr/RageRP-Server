import fs from "fs";
import path from "path";

export class Logger {
    private static logFile = path.join(process.cwd(), "logs", "server.log");

    private static format(level: string, message: string): string {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return `${timestamp} [${level}]: ${message}`;
    }

    private static writeToFile(data: string) {
        if (!fs.existsSync(path.dirname(this.logFile))) {
            fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
        }
        fs.appendFileSync(this.logFile, data + "\n");
    }

    static info(message: string) {
        const msg = this.format("INFO", message);
        console.log("\x1b[32m" + msg + "\x1b[0m"); // Green
        this.writeToFile(msg);
    }

    static error(message: string, stack?: string) {
        const msg = this.format("ERROR", message + (stack ? `\n${stack}` : ""));
        console.log("\x1b[31m" + msg + "\x1b[0m"); // Red
        this.writeToFile(msg);
    }

    static warn(message: string) {
        const msg = this.format("WARN", message);
        console.log("\x1b[33m" + msg + "\x1b[0m"); // Yellow
        this.writeToFile(msg);
    }

    static cmd(message: string) {
        const msg = this.format("CMD", message);
        console.log("\x1b[36m" + msg + "\x1b[0m"); // Cyan
        this.writeToFile(msg);
    }
}
