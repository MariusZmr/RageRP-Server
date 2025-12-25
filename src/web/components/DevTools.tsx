import React, { useState } from 'react';

/**
 * DevTools - Componentă vizibilă DOAR în browser (mod development).
 * Permite simularea evenimentelor care ar veni normal de la server/client RageMP.
 */
const DevTools: React.FC = () => {
    // Dacă suntem în RageMP, nu afișăm nimic.
    if (window.mp) return null;

    const [isOpen, setIsOpen] = useState(false);

    // Funcție helper pentru a simula un event de la server
    const simulateServerEvent = (eventName: string, data: any) => {
        console.log(`[DevTools] Simulating Server Event: ${eventName}`, data);
        if (window.EventManager && window.EventManager.receiveFromServer) {
            window.EventManager.receiveFromServer(eventName, data);
        } else {
            console.error("EventManager nu este gata!");
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-mono text-sm"
            >
                {isOpen ? 'Close DevTools' : '🛠️ Open DevTools'}
            </button>

            {isOpen && (
                <div className="bg-gray-800 border border-gray-700 p-4 mt-2 rounded-lg shadow-xl w-64 text-white">
                    <h3 className="text-sm font-bold border-b border-gray-600 pb-2 mb-2 text-gray-300">
                        Simulare Navigare
                    </h3>
                    
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/login', data: { error: '' } })}
                            className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Login
                        </button>
                        
                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/login', data: { error: 'Parola greșită (Test)' } })}
                            className="bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Login (cu Eroare)
                        </button>

                        <button
                            onClick={() => {
                                simulateServerEvent('navigateTo', { route: '/game' });
                                setTimeout(() => {
                                    simulateServerEvent('hud:update', { money: 999500, id: 1, job: 'Polițist' });
                                }, 500);
                            }}
                            className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Game HUD
                        </button>

                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/char-creator' })}
                            className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Go to Char Creator
                        </button>

                        <button
                            onClick={() => simulateServerEvent('hud:update', { money: Math.floor(Math.random() * 100000) })}
                            className="bg-teal-600 hover:bg-teal-500 px-3 py-1 rounded text-xs text-left"
                        >
                            🔄 Update Money Random
                        </button>

                        <button
                            onClick={() => simulateServerEvent('navigateTo', { route: '/' })}
                            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-xs text-left"
                        >
                            ➡️ Clear / Home
                        </button>
                    </div>

                    <div className="mt-4 text-[10px] text-gray-500">
                        Acest panou nu apare în joc.
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevTools;
