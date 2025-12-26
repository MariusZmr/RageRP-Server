import React from "react";
import HUD from "../components/HUD";

const GameInterface: React.FC = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* Pointer events none ca să putem da click prin UI în joc, 
                dar HUD-ul poate reactiva pointer-events dacă e interactiv */}
      <HUD />

      {/* Aici vor veni Speedometer, etc. */}
    </div>
  );
};

export default GameInterface;
