// Definim tipurile pentru obiectul global 'mp' injectat de RageMP
declare global {
  interface Window {
    // Expunem EventManager global
    EventManager?: {
      receiveFromServer: (eventName: string, detail: any) => void;
    };
  }
}

type EventHandler = (data: any) => void;

class EventManager {
  private static instance: EventManager;
  private events: Map<string, EventHandler[]> = new Map();

  private constructor() {
    window.EventManager = {
      receiveFromServer: (eventName: string, detail: any) => {
        this.log("info", `Received from Server: ${eventName}`);
        this.emitLocal(eventName, detail);
      },
    };

    console.log("[EventManager] Initialized.");

    // Anunțăm clientul că React este gata
    setTimeout(() => {
      this.triggerServer("ui:ready");
    }, 100);
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

  /**
   * Trimite log-uri către consola RageMP (F8)
   */
  public log(type: "info" | "error", message: string) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (window.mp) {
      try {
        window.mp.trigger("ui:log", type, message);
      } catch (e) {
        console.error("Failed to send log to client", e);
      }
    }
  }

  /**
   * Alias pentru triggerServer. Trimite eveniment către Clientul RageMP.
   */
  public trigger(eventName: string, ...args: any[]): void {
    this.triggerServer(eventName, ...args);
  }

  /**
   * Trimite un eveniment către Server/Client (RageMP).
   */
  public triggerServer(eventName: string, ...args: any[]): void {
    if (window.mp && window.mp.trigger) {
      try {
        this.log(
          "info",
          `Triggering: ${eventName} | Args: ${JSON.stringify(args)}`
        );
        window.mp.trigger(eventName, ...args);
      } catch (e: any) {
        this.log("error", `Trigger Fail: ${e.message}`);
      }
    } else {
      console.warn(`[Mock-Trigger] ${eventName}`, args);
    }
  }
}

export default EventManager.getInstance();
