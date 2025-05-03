import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import Card from './Card';

const Deck = ({ drawPile, discardPile, onDrawCard, onCardClick, shakeCardId }) => {
  // shakeCardId: ID of card to animate when an invalid move is attempted
  const [windowOrientation, setWindowOrientation] = useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const topDiscard = discardPile[discardPile.length - 1];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: topDiscard,
    canDrag: !!topDiscard,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [topDiscard]);

  const showRecycle = drawPile.length === 0 && discardPile.length > 0;
  const isEmpty = drawPile.length === 0 && discardPile.length === 0;

  const visibleDiscards = discardPile.slice(-3);
  const isCompactLandscape = windowOrientation === 'landscape' && window.innerHeight < 500;

  return (
    <div className="flex gap-1 sm:gap-4 md:gap-6 landscape:gap-2 items-start">
      {/* Draw Pile */}
      <div
        onClick={onDrawCard}
        className="relative w-4 h-7 sm:w-14 md:w-20 landscape:w-14 sm:h-24 md:h-28 landscape:h-20 cursor-pointer flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border-0 sm:border sm:border-gray-400 rounded-none sm:rounded shadow-none sm:shadow-md hover:ring-0 sm:hover:ring-2 hover:ring-green-400 transition"
        title={showRecycle ? 'Recycle' : drawPile.length > 0 ? 'Click to draw' : ''}
      >
        {showRecycle ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-[6px] sm:text-sm font-semibold text-green-700 mb-0 sm:mb-1">↻</div>
            <div className="text-[10px] sm:text-2xl animate-pulse">♻️</div>
          </div>
        ) : isEmpty ? (
          <div className="text-gray-300 text-[6px] sm:text-sm">-</div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-[6px] sm:text-sm font-semibold text-gray-800 mb-0 sm:mb-1">↓</div>
            <img
              src="/assets/icons/draw-pile.png"
              alt="Draw pile"
              className="w-2 h-2 sm:w-8 sm:h-8 object-contain"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/icons/default.png';
              }}
            />
          </div>
        )}
      </div>

      {/* Discard Pile — shows up to 3 stacked cards */}
      <div className="relative w-4 h-7 sm:w-14 md:w-20 landscape:w-14 sm:h-24 md:h-28 landscape:h-20">
        {visibleDiscards.map((card, idx) => (
          <div
            key={card.id}
            ref={idx === visibleDiscards.length - 1 ? drag : null}
            className={`absolute top-0 left-0 z-[${idx}]`}
            style={{ marginLeft: `${idx * (isCompactLandscape ? -4 : -6)}px` }}
          >
            <Card
              card={card}
              isTop={idx === visibleDiscards.length - 1}
              onClick={onCardClick}
              shakeCardId={shakeCardId}
            />
          </div>
        ))}

        {visibleDiscards.length === 0 && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[6px] sm:text-sm text-gray-400 rounded-none sm:rounded">
            Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Deck;


