export type ZoneId = 
  | 'step-1' 
  | 'step-2' 
  | 'step-3' 
  | 'step-4' 
  | 'step-5' 
  | 'step-6' 
  | 'step-7' 
  | 'step-8' 
  | 'honeymoon' 
  | 'healthy';

export interface CardData {
  id: string;
  text: string;
  correctZoneId: ZoneId;
  icon?: string; // Optional emoji/icon char
}

export interface ZoneData {
  id: ZoneId;
  title: string;
  description?: string;
  colorClass: string; // Tailwind class for background/border
  intensityLevel: number; // 0 for separate boxes, 1-8 for ladder
}

export interface GameState {
  placedCards: Record<string, string>; // cardId -> zoneId
  isComplete: boolean;
}