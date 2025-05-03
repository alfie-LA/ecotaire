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
    <div className="flex justify-center gap-8 sm:gap-8 md:gap-10 landscape:gap-4 items-start">
      {/* Draw Pile - exact 60x40px dimensions */}
      <div
        onClick={onDrawCard}
        className="relative cursor-pointer flex flex-col items-center justify-center bg-white/30 backdrop-blur-md border border-gray-400 rounded-md shadow-md hover:ring-2 hover:ring-green-400 transition"
        style={{
          width: '60px',
          height: '40px',
          minWidth: '60px',
          maxWidth: '60px',
          minHeight: '40px',
          maxHeight: '40px'
        }}
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
              className="w-8 h-8 sm:w-8 sm:h-8 object-contain"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/icons/default.png';
              }}
            />
          </div>
        )}
      </div>

      {/* Discard Pile — exact 60x40px dimensions */}
      <div className="relative" style={{
          width: '60px',
          height: '40px',
          minWidth: '60px',
          maxWidth: '60px',
          minHeight: '40px',
          maxHeight: '40px'
        }}>
        {visibleDiscards.map((card, idx) => (
          <div
            key={card.id}
            ref={idx === visibleDiscards.length - 1 ? drag : null}
            className={`absolute top-0 left-0 z-[${idx}]`}
            style={{ marginLeft: `${idx * (isCompactLandscape ? -4 : -8)}px` }}
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
          <div style={{
            width: '60px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            border: '1px solid #9ca3af',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: '#6b7280',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            -
          </div>
        )}
      </div>
    </div>
  );
};

export default Deck;


