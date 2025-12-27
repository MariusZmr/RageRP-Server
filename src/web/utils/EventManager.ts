// EventManager.ts - Safe for both Browser and Server environments
declare global {
  interface Window {
    EventManager?: {
      receiveFromServer: (eventName: string, detail: any) => void;
    };
    mp?: any;
  }
}

type EventHandler = (data: any) => void;

class EventManager {
  private static instance: EventManager;
  private events: Map<string, EventHandler[]> = new Map();

  private constructor() {
    // Verificăm dacă suntem într-un mediu cu 'window' (Browser/CEF)
    if (typeof window !== "undefined") {
      window.EventManager = {
        receiveFromServer: (eventName: string, detail: any) => {
          if (!eventName.includes("update") && !eventName.includes("tick")) {
            this.log("info", `Received from Server: ${eventName}`);
          }
          this.emitLocal(eventName, detail);
        },
      };

      console.log("[EventManager] Initialized in Browser.");

      // Anunțăm clientul că React este gata
      setTimeout(() => {
        this.triggerServer("ui:ready");
      }, 100);
    } else {
      console.log("[EventManager] Initialized in Non-Browser environment.");
    }
  }

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  public on(eventName: string, handler: EventHandler): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(handler);
  }

  public off(eventName: string, handler: EventHandler): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      this.events.set(
        eventName,
        handlers.filter((h) => h !== handler)
      );
    }
  }

  private emitLocal(eventName: string, data: any): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  public log(type: "info" | "error", message: string) {
    if (typeof window !== "undefined" && window.mp) {
      try {
        window.mp.trigger("ui:log", type, message);
      } catch (e) {
        console.error("Failed to send log to client", e);
      }
    } else {
      const color = type === "error" ? "red" : "#3b82f6";
      console.log(`%c[${type.toUpperCase()}] ${message}`, `color: ${color}; font-weight: bold;`);
    }
  }

  public trigger(eventName: string, ...args: any[]): void {
    this.triggerServer(eventName, ...args);
  }

  public triggerServer(eventName: string, ...args: any[]): void {
    if (typeof window !== "undefined" && window.mp && window.mp.trigger) {
      try {
        if (!eventName.includes("update")) {
          this.log("info", `Triggering: ${eventName}`);
        }
        window.mp.trigger(eventName, ...args);
      } catch (e: any) {
        this.log("error", `Trigger Fail: ${e.message}`);
      }
    } else if (typeof window !== "undefined") {
      // Browser Loopback
      const payload = args.length > 0 ? args[0] : null;
      this.emitLocal(eventName, payload);
    }
  }
}

export default EventManager.getInstance();
