import React from "react";
import HUD from "../components/HUD";
import Speedometer from "../components/hud/Speedometer";

const GameInterface: React.FC = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* 
        Game Interface Wrapper 
        - pointer-events-none: Allows clicking through to the game world.
        - Interactive elements inside must re-enable pointer-events-auto.
      */}
      
      {/* Character Status (Health, Money, Job) */}
      <HUD />

      {/* New Apple Style Speedometer Widget (Bottom Right) */}
      <Speedometer />
      
    </div>
  );
};

export default GameInterface;
