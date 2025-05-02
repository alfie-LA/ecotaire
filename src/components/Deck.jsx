import React from 'react';
import { useDrag } from 'react-dnd';
import Card from './Card';

const Deck = ({ drawPile, discardPile, onDrawCard, onCardClick, shakeCardId }) => {
  // shakeCardId: ID of card to animate when an invalid move is attempted

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

  return (
    <div className="flex gap-2 sm:gap-6 md:gap-24 items-start">
      {/* Draw Pile */}
      <div
        onClick={onDrawCard}
        className="relative w-8 sm:w-16 md:w-20 h-12 sm:h-24 md:h-28 cursor-pointer flex flex-col items-center justify-center bg-white/40 backdrop-blur-md border border-gray-400 rounded shadow-md hover:ring-2 hover:ring-green-400 transition"
        title={showRecycle ? 'Recycle' : drawPile.length > 0 ? 'Click to draw' : ''}
      >
        {showRecycle ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-[8px] sm:text-sm font-semibold text-green-700 mb-0 sm:mb-1">Recycle</div>
            <div className="text-sm sm:text-2xl animate-pulse">♻️</div>
          </div>
        ) : isEmpty ? (
          <div className="text-gray-300 text-[8px] sm:text-sm">Empty</div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-[8px] sm:text-sm font-semibold text-gray-800 mb-0 sm:mb-1">Draw</div>
            <img
              src="/assets/icons/draw-pile.png"
              alt="Draw pile"
              className="w-5 h-5 sm:w-8 sm:h-8 object-contain"
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
      <div className="relative w-8 sm:w-16 md:w-20 h-12 sm:h-24 md:h-28">
        {visibleDiscards.map((card, idx) => (
          <div
            key={card.id}
            ref={idx === visibleDiscards.length - 1 ? drag : null}
            className={`absolute top-0 left-0 z-[${idx}]`}
            style={{ marginLeft: `${idx * -15}px` }}
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
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm text-gray-400 rounded">
            Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default Deck;


