/**
 * Base interface for all major game systems.
 */
export interface ISystem {
    /** Unique name of the system for debugging */
    name: string;
    
    /** 
     * Initial setup (Register events, commands, etc.) 
     * MUST NOT depend on other systems being fully initialized.
     */
    init?(): void | Promise<void>;
    
    /**
     * Secondary initialization. 
     * Run after ALL systems called init(). Safe to access other system instances.
     */
    start?(): void | Promise<void>;
    
    /** Graceful shutdown */
    shutdown?(): void | Promise<void>;
}
