import React from 'react';
import { ZoneData, CardData } from '../types';
import { DraggableCard } from './DraggableCard';

interface DropZoneProps {
  zone: ZoneData;
  placedCard?: CardData;
  onDrop: (e: React.DragEvent, zoneId: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ zone, placedCard, onDrop }) => {
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!placedCard) {
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsOver(false);
    onDrop(e, zone.id);
  };

  // Calculate indentation for ladder effect (only for steps 1-8)
  // Using margin-left creates a visual staircase
  const ladderStyle = zone.intensityLevel > 0 
    ? { marginLeft: `${(zone.intensityLevel - 1) * 1.5}rem` } 
    : {};

  return (
    <div 
      className={`relative flex flex-col transition-all duration-300 ${zone.intensityLevel > 0 ? 'mb-2' : ''}`}
      style={ladderStyle}
    >
      {/* The Step Label/Background */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full rounded-lg p-3 border-2 transition-all duration-200 min-h-[80px] flex flex-col justify-center
          ${zone.colorClass}
          ${isOver ? 'scale-[1.02] ring-2 ring-offset-2 ring-violet-400 brightness-110' : ''}
          ${placedCard ? 'ring-2 ring-green-500 ring-offset-1' : ''}
        `}
      >
        {/* Title of the Step */}
        <div className="absolute top-2 left-3 text-xs font-bold uppercase tracking-wider opacity-80">
          {zone.title}
        </div>

        {/* Content Area */}
        <div className="mt-5">
            {placedCard ? (
              <div className="bg-white/95 text-slate-800 p-2 rounded shadow-sm text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <span>{placedCard.icon}</span>
                <span className="leading-tight font-medium">{placedCard.text}</span>
              </div>
            ) : (
               <div className={`text-center text-xs italic opacity-60 py-2 ${isOver ? 'text-white' : ''}`}>
                 Arrastra la tarjeta aquí
               </div>
            )}
        </div>
      </div>
    </div>
  );
};