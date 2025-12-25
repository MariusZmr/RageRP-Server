import React, { useEffect, useState } from 'react';
import EventManager from '../utils/EventManager';

interface HUDStats {
    id: number;
    money: number;
    job: string;
    serverName?: string;
}

const HUD: React.FC = () => {
    const [stats, setStats] = useState<HUDStats>({
        id: 0,
        money: 0,
        job: 'Civil',
        serverName: 'SERVEROS'
    });

    useEffect(() => {
        const handleUpdate = (data: Partial<HUDStats>) => {
            setStats(prev => ({ ...prev, ...data }));
        };

        EventManager.on('hud:update', handleUpdate);
        EventManager.triggerServer('hud:request');

        return () => {
            EventManager.off('hud:update', handleUpdate);
        };
    }, []);

    const formattedMoney = new Intl.NumberFormat('en-US').format(stats.money);

    return (
        <div className="fixed top-5 right-5 flex flex-col items-end gap-3 pointer-events-none select-none">
            
            {/* Server Logo */}
            <div className="text-white/90 font-black italic tracking-widest text-lg text-shadow-md">
                {stats.serverName}<span className="text-blue-500">RP</span>
            </div>

            {/* Stats Cards Container */}
            <div className="flex flex-col items-end gap-1">
                
                {/* Money Pill */}
                <div className="bg-black/80 rounded px-4 py-1 border-r-4 border-green-500 shadow-lg flex items-center gap-3">
                    <span className="text-green-400 font-bold text-xl font-mono text-shadow-sm">
                        $ {formattedMoney}
                    </span>
                </div>

                {/* Job & ID Pill */}
                <div className="flex gap-1 mt-1">
                    <div className="bg-black/70 px-3 py-1 rounded-l border-r border-gray-600 flex flex-col items-end justify-center min-w-[80px]">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">JOB</span>
                        <span className="text-white font-semibold text-sm leading-none">{stats.job}</span>
                    </div>

                    <div className="bg-blue-900/90 px-3 py-1 rounded-r flex flex-col items-center justify-center min-w-[40px]">
                        <span className="text-[10px] text-blue-300 uppercase font-bold">ID</span>
                        <span className="text-white font-bold text-lg leading-none">{stats.id}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HUD;
