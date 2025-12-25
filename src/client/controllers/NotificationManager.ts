import { UIManager } from "./UIManager";

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export class NotificationManager {
    /**
     * Afișează o notificare în interfața grafică.
     */
    public static show(type: NotificationType, title: string, message: string, duration: number = 5000): void {
        const browser = UIManager.getInstance().getBrowser();
        
        if (browser && mp.browsers.exists(browser)) {
            // Escapăm string-urile pentru a preveni erori JS în execute
            const safeTitle = title.replace(/'/g, "\'");
            const safeMsg = message.replace(/'/g, "\'");
            
            browser.execute(`
                if (window.triggerNotification) {
                    window.triggerNotification('${type}', '${safeTitle}', '${safeMsg}', ${duration});
                } else {
                    console.warn("NotificationSystem not mounted in React yet.");
                }
            `);
        } else {
            // Fallback la chat dacă UI-ul nu e gata
            const colors = {
                success: "!{00FF00}",
                error: "!{FF0000}",
                warning: "!{FFA500}",
                info: "!{0000FF}"
            };
            mp.gui.chat.push(`${colors[type]}[${title}] !{FFFFFF}${message}`);
        }
    }
}
