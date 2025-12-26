class ClipboardManager {
  private static instance: ClipboardManager;

  private constructor() {
    this.initializeGlobalExpose();
  }

  public static getInstance(): ClipboardManager {
    if (!ClipboardManager.instance) {
      ClipboardManager.instance = new ClipboardManager();
    }
    return ClipboardManager.instance;
  }

  /**
   * Expune funcția în window pentru a putea fi apelată din client via browser.execute()
   */
  private initializeGlobalExpose() {
    (window as any).copyToClipboard = (content: string) => {
      this.handleCopyRequest(content);
    };
    console.log("[ClipboardManager] Service initialized.");
  }

  /**
   * Logica efectivă de copiere
   */
  private async handleCopyRequest(jsonStr: string) {
    try {
      // Parsăm pentru a formata frumos, dacă e JSON
      let finalString = jsonStr;
      try {
        const data = JSON.parse(jsonStr);
        // Detectăm dacă e un obiect de coordonate (are x, y, z)
        if (
          data.x !== undefined &&
          data.y !== undefined &&
          data.z !== undefined
        ) {
          const vec3 = `new mp.Vector3(${data.x}, ${data.y}, ${data.z})`;
          const heading = data.h !== undefined ? ` // H: ${data.h}` : "";
          finalString = `${vec3}${heading}`;
        }
      } catch (e) {
        // Nu e JSON, copiem string-ul raw
      }

      // Metoda veche (ExecCommand) - Cea mai sigură pentru CEF/RageMP
      // Navigator.clipboard API e adesea blocat în medii non-secure (http) sau fără user interaction
      const el = document.createElement("textarea");
      el.value = finalString;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      // Notificare vizuală
      if ((window as any).triggerNotification) {
        (window as any).triggerNotification(
          "success",
          "DevTools",
          "Coordonate copiate în Clipboard!"
        );
      }
    } catch (err) {
      console.error("[ClipboardManager] Failed to copy:", err);
      if ((window as any).triggerNotification) {
        (window as any).triggerNotification(
          "error",
          "DevTools",
          "Eroare la copiere."
        );
      }
    }
  }
}

// Exportăm instanța pentru a o putea importa o singură dată la start
export default ClipboardManager.getInstance();
