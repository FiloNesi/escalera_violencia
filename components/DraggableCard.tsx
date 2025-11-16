import React from 'react';
import { CardData } from '../types';
import { GripVertical, CheckCircle2 } from 'lucide-react';

interface DraggableCardProps {
  card: CardData;
  isPlaced: boolean;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({ card, isPlaced, onDragStart }) => {
  return (
    <div
      draggable={!isPlaced}
      onDragStart={(e) => !isPlaced && onDragStart(e, card.id)}
      className={`
        relative flex items-start gap-3 p-4 rounded-lg shadow-sm border-2 transition-all duration-200
        ${isPlaced 
          ? 'bg-white border-green-500 cursor-default' 
          : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md cursor-grab active:cursor-grabbing'
        }
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
        <GripVertical className="w-5 h-5 text-slate-300 shrink-0" />
      )}
    </div>
  );
};