import React, { useState, useEffect } from 'react';
import { ZoneData, CardData } from '../types';
import { playSuccessSound, playErrorSound } from '../utils/audio';

interface DropZoneProps {
  zone: ZoneData;
  placedCard?: CardData;
  onDrop: (e: React.DragEvent, zoneId: string) => boolean;
  onHoverChange?: (isHovering: boolean) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ zone, placedCard, onDrop, onHoverChange }) => {
  const [isOver, setIsOver] = useState(false);
  const [animationStatus, setAnimationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Reset animation status after it plays
  useEffect(() => {
    if (animationStatus !== 'idle') {
      const timer = setTimeout(() => setAnimationStatus('idle'), 500);
      return () => clearTimeout(timer);
    }
  }, [animationStatus]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!placedCard) {
      if (!isOver) {
        setIsOver(true);
        onHoverChange?.(true);
      }
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
    onHoverChange?.(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onHoverChange?.(false);
    
    // Call parent handler which now returns success boolean
    const success = onDrop(e, zone.id);
    
    if (success) {
      setAnimationStatus('success');
      playSuccessSound();
    } else {
      setAnimationStatus('error');
      playErrorSound();
    }
  };

  // Calculate indentation for ladder effect (only for steps 1-8)
  // Using margin-left creates a visual staircase
  const ladderStyle = zone.intensityLevel > 0 
    ? { marginLeft: `${(zone.intensityLevel - 1) * 1.5}rem` } 
    : {};

  // Determine dynamic classes based on state
  let stateClasses = '';
  if (animationStatus === 'success') {
    stateClasses = 'animate-pop ring-4 ring-green-400 border-green-500 z-10 shadow-lg';
  } else if (animationStatus === 'error') {
    stateClasses = 'animate-shake ring-4 ring-red-400 border-red-500 z-10';
  } else if (isOver) {
    // Scale up + subtle glow + border highlight
    stateClasses = 'scale-105 -translate-y-1 ring-2 ring-violet-500 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.6)] z-20';
  } else if (placedCard) {
    stateClasses = 'ring-2 ring-green-500 ring-offset-1';
  }

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
          ${stateClasses}
        `}
      >
        {/* Title of the Step - pointer-events-none to avoid dragLeave firing on children */}
        <div className="absolute top-2 left-3 text-xs font-bold uppercase tracking-wider opacity-80 pointer-events-none">
          {zone.title}
        </div>

        {/* Content Area - pointer-events-none to avoid dragLeave firing on children */}
        <div className="mt-5 pointer-events-none">
            {placedCard ? (
              <div className="bg-white/95 text-slate-800 p-2 rounded shadow-sm text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <span>{placedCard.icon}</span>
                <span className="leading-tight font-medium">{placedCard.text}</span>
              </div>
            ) : (
               <div className={`text-center text-xs italic opacity-60 py-2 transition-colors duration-200 ${isOver ? 'text-white font-semibold opacity-100' : ''}`}>
                 Arrastra la tarjeta aquí
               </div>
            )}
        </div>
      </div>
    </div>
  );
};