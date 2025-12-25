/// <reference path="../../../node_modules/@types/ragemp-c/index.d.ts" />

/**
 * UIManager - Controller Singleton pentru gestionarea interfeței grafice (CEF).
 */
export class UIManager {
    private static instance: UIManager;
    private browser: BrowserMp | null = null;
    private readonly browserPath: string = "package://ui/index.html";
    private isReady: boolean = false;
    private pendingActions: Array<() => void> = [];
    private needsCursor: boolean = false; // Flag pentru a ști dacă pagina curentă vrea cursor

    private constructor() {
        this.initBrowser();
        
        // Ascultăm evenimentul care confirmă că React s-a încărcat complet
        mp.events.add('ui:ready', () => {
            mp.console.logInfo("[UIManager] UI raportat ca fiind READY.");
            mp.gui.chat.push("[DEBUG] UI Ready event received.");
            this.isReady = true;
            this.processPendingActions();
        });

        // CURSOR ENFORCER:
        // Verificăm constant dacă avem nevoie de cursor și dacă jocul l-a ascuns (ex: după închidere consolă F8)
        mp.events.add('render', () => {
            if (this.needsCursor && !mp.gui.cursor.visible) {
                mp.gui.cursor.show(true, true);
            }
        });
    }

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }

    private initBrowser(): void {
        if (this.browser && mp.browsers.exists(this.browser)) return;

        mp.browsers.forEach((b) => {
            if (b.url === this.browserPath) b.destroy();
        });

        this.browser = mp.browsers.new(this.browserPath);
        this.browser.active = true; // Trebuie să fie activ pentru a încărca JS-ul, dar îl putem ascunde vizual altfel dacă e nevoie
        // Dar în cazul unui SPA full-screen, de obicei e ok. Dacă vrem hidden la start, riscăm să nu se încarce resursele pe unele PC-uri slow.
        // Totuși, Rage încarcă și în background. Să-l lăsăm 'active = false' inițial e mai safe vizual, dar 'execute' nu merge mereu pe browser inactiv.
        // Compromis: Îl lăsăm cum era (active=false) dar îl activăm la showPage.
        this.browser.active = false; 
        
        mp.console.logInfo("[UIManager] Browser CEF inițializat.");
    }

    private processPendingActions(): void {
        while (this.pendingActions.length > 0) {
            const action = this.pendingActions.shift();
            if (action) action();
        }
    }

    public showPage(route: string, data: object = {}, options: { enableCursor: boolean } = { enableCursor: true }): void {
        if (!this.browser || !mp.browsers.exists(this.browser)) {
            this.initBrowser();
        }
        
        // Dacă UI-ul nu e gata, punem în coadă
        if (!this.isReady) {
            mp.console.logInfo(`[UIManager] UI not ready, queuing navigation to ${route}`);
            
            // Asigurăm că browserul e activ ca să se poată încărca
            this.browser!.active = true; 

            this.pendingActions.push(() => this.showPage(route, data, options));
            return;
        }

        const serializedData = JSON.stringify(data);

        this.browser!.active = true;
        
        // Gestionăm cursorul în funcție de opțiuni și setăm flag-ul de enforcement
        this.needsCursor = options.enableCursor;
        if (this.needsCursor) {
            mp.gui.cursor.show(true, true);
        } else {
            mp.gui.cursor.show(false, false);
        }
        
        mp.gui.chat.push(`[DEBUG] UIManager: Loading route ${route}`);

        this.browser!.execute(`
            if (window.EventManager) {
                window.EventManager.receiveFromServer('navigateTo', { route: '${route}', data: ${serializedData} });
            } else {
                console.error('EventManager not found in window');
            }
        `);
        
        mp.console.logInfo(`[UIManager] Navigare către: ${route} (Cursor: ${options.enableCursor})`);
    }

    public hide(): void {
        this.needsCursor = false; // Nu mai forțăm cursorul
        if (this.browser && mp.browsers.exists(this.browser)) {
            this.browser.active = false;
        }
        mp.gui.cursor.show(false, false);
        mp.console.logInfo("[UIManager] Interfața ascunsă.");
    }

    public getBrowser(): BrowserMp | null {
        return this.browser;
    }
}