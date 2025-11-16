import React, { useState, useEffect, useMemo } from 'react';
import { CARDS, LADDER_ZONES, EXTRA_ZONES } from './constants';
import { ZoneId, CardData } from './types';
import { DraggableCard } from './components/DraggableCard';
import { DropZone } from './components/DropZone';
import { RotateCcw, Info, Award } from 'lucide-react';

// Helper to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  // State for cards that are still available to be played (shuffled)
  const [availableCards, setAvailableCards] = useState<CardData[]>([]);
  // State for tracking which card is in which zone (correctly)
  const [placements, setPlacements] = useState<Record<string, string>>({}); // zoneId -> cardId
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // UI State for drag interactions
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [isHoveringDropZone, setIsHoveringDropZone] = useState(false);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setAvailableCards(shuffle(CARDS));
    setPlacements({});
    setShowSuccessModal(false);
    setDraggedCardId(null);
    setIsHoveringDropZone(false);
  };

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setIsHoveringDropZone(false);
  };

  // Returns true if drop was successful, false otherwise
  const handleDrop = (e: React.DragEvent, targetZoneId: string): boolean => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const card = CARDS.find((c) => c.id === cardId);

    // Reset drag state
    setDraggedCardId(null);
    setIsHoveringDropZone(false);

    if (!card) return false;

    // Logic: Only allow drop if it matches the correct zone
    if (card.correctZoneId === targetZoneId) {
      // Success!
      // 1. Add to placements
      setPlacements((prev) => ({
        ...prev,
        [targetZoneId]: cardId,
      }));

      // 2. Remove from available cards
      setAvailableCards((prev) => prev.filter((c) => c.id !== cardId));
      return true;
    } else {
      // Return false to allow the DropZone to handle the error animation
      return false;
    }
  };

  // Check for win condition
  useEffect(() => {
    if (Object.keys(placements).length === CARDS.length) {
      const timer = setTimeout(() => setShowSuccessModal(true), 500);
      return () => clearTimeout(timer);
    }
  }, [placements]);

  // Memoize the placed cards map for easy lookup
  const getPlacedCardForZone = (zoneId: ZoneId) => {
    const cardId = placements[zoneId];
    if (!cardId) return undefined;
    return CARDS.find(c => c.id === cardId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-violet-700 text-white p-4 shadow-lg sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🟣</span> Escalera de la Violencia
            </h1>
            <p className="text-violet-200 text-sm mt-1">
              Identifica las conductas y colócalas en el escalón correcto.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-violet-800 px-4 py-2 rounded-full text-sm font-semibold border border-violet-600">
              {Object.keys(placements).length} / {CARDS.length} Completado
            </div>
            <button 
              onClick={resetGame}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              title="Reiniciar juego"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main id="game-container" className="max-w-7xl mx-auto p-4 md:p-8 grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Card Pool */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <Info className="w-5 h-5 text-violet-500" />
                Tarjetas Disponibles
              </h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                Arrastra las tarjetas
              </span>
            </div>
            
            <div className="space-y-3 min-h-[300px]">
              {availableCards.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-10 border-2 border-dashed border-slate-200 rounded-lg">
                  <Award className="w-12 h-12 mb-2 text-green-400" />
                  <p>¡Has colocado todas las tarjetas!</p>
                </div>
              ) : (
                availableCards.map((card) => (
                  <DraggableCard 
                    key={card.id} 
                    card={card} 
                    isPlaced={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedCardId === card.id}
                    isHoveringZone={isHoveringDropZone}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: The Ladder & Extra Zones */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-8">
          
          {/* Section: The Ladder */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">La Escalera Cíclica</h2>
            
            <div className="space-y-1 pl-2 md:pl-4 border-l-4 border-dashed border-slate-200">
              {LADDER_ZONES.map((zone) => (
                <DropZone 
                  key={zone.id}
                  zone={zone}
                  placedCard={getPlacedCardForZone(zone.id)}
                  onDrop={handleDrop}
                  onHoverChange={setIsHoveringDropZone}
                />
              ))}
            </div>
          </div>

          {/* Section: Extra Zones (Honeymoon & Healthy) */}
          <div className="grid md:grid-cols-2 gap-6">
            {EXTRA_ZONES.map((zone) => (
              <div key={zone.id} className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                 <h3 className="text-md font-semibold text-slate-600 mb-3 flex items-center gap-2">
                    {zone.id === 'healthy' ? '💚' : '🎭'} {zone.title}
                 </h3>
                 <DropZone 
                    zone={zone}
                    placedCard={getPlacedCardForZone(zone.id)}
                    onDrop={handleDrop}
                    onHoverChange={setIsHoveringDropZone}
                  />
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all scale-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">¡Enhorabuena!</h2>
            <p className="text-slate-600 mb-8">
              Has identificado correctamente todas las fases de la escalera de la violencia y las relaciones sanas.
              <br/><br/>
              <strong>Recuerda:</strong> El amor no duele. Si te sientes identificada con los primeros escalones, pide ayuda.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Revisar Resultados
            </button>
            <button
              onClick={resetGame}
              className="mt-4 w-full text-slate-500 hover:text-violet-600 font-medium text-sm"
            >
              Volver a jugar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;