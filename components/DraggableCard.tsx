import React from 'react';
import { CardData } from '../types';
import { GripVertical, CheckCircle2 } from 'lucide-react';

interface DraggableCardProps {
  card: CardData;
  isPlaced: boolean;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isHoveringZone?: boolean;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({ 
  card, 
  isPlaced, 
  onDragStart,
  onDragEnd,
  isDragging,
  isHoveringZone 
}) => {

  // Determine dynamic classes
  let dynamicClasses = '';
  
  if (isPlaced) {
    dynamicClasses = 'bg-white border-green-500 cursor-default opacity-50';
  } else if (isDragging) {
    if (isHoveringZone) {
      // Visual feedback when hovering over a valid zone
      // Highlight the source card to indicate connection
      dynamicClasses = 'bg-violet-50 border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.4)] opacity-60 scale-95';
    } else {
      // Standard dragging state
      dynamicClasses = 'bg-slate-50 border-slate-300 opacity-40 border-dashed grayscale';
    }
  } else {
    // Normal interactive state
    dynamicClasses = 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md cursor-grab active:cursor-grabbing';
  }

  return (
    <div
      draggable={!isPlaced}
      onDragStart={(e) => !isPlaced && onDragStart(e, card.id)}
      onDragEnd={onDragEnd}
      className={`
        relative flex items-start gap-3 p-4 rounded-lg shadow-sm border-2 transition-all duration-200
        ${dynamicClasses}
      `}
    >
      <div className="text-2xl select-none">{card.icon}</div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${isPlaced ? 'text-green-800' : 'text-slate-700'}`}>
          {card.text}
        </p>
      </div>
      
      {isPlaced ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
      ) : (
        <GripVertical className={`w-5 h-5 shrink-0 ${isDragging ? 'text-violet-400' : 'text-slate-300'}`} />
      )}
    </div>
  );
};