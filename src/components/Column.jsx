import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ cards, columnIndex, onCardDrop, onCardClick, shakeCardId }) => {
  // cards: array of cards in this column
  // columnIndex: index of this column
  // onCardDrop: handler to drop a card into this column
  // onCardClick: handler for when a card is clicked
  // shakeCardId: ID of card that should shake for invalid move feedback

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onCardDrop(item, columnIndex),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`w-[19%] max-w-[80px] sm:w-16 md:w-24 min-h-[50px] sm:min-h-[250px] md:min-h-[350px] landscape:min-h-[200px] overflow-hidden border border-dashed border-gray-400 
        rounded-md sm:rounded p-0.5 sm:p-1 flex flex-col items-center transition duration-200 
        backdrop-blur-md bg-white/30 sm:bg-white/30 shadow-md sm:shadow-md ${isOver ? 'ring-2 sm:ring-2 ring-green-400' : ''}`}
      style={{ outline: '0' }}
    >
      {cards.length === 0 ? (
        <div className="text-gray-300 mt-1 sm:mt-24 landscape:mt-10 text-[8px] sm:text-sm">-</div>
      ) : (
        cards.map((card, i) => {
          // Determine if we're in landscape orientation and screen is short
          const isCompactLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 500;
          
          // Improve card visibility with less stacking in portrait mode 
          const marginClass = isCompactLandscape
            ? card.faceUp ? 'mb-[-38px] sm:mb-[-45px]' : 'mb-[-38px] sm:mb-[-45px]'
            : card.faceUp ? 'mb-[-32px] sm:mb-[-20px]' : 'mb-[-32px] sm:mb-[-20px]'; // Minimal overlap to show more of each card
            
          return (
            <div
              key={card.id}
              className={`relative ${marginClass}`}
              style={{ zIndex: i }}
            >
              <Card
                key={card.id}
                card={card}
                isTop={i === cards.length - 1}
                onClick={onCardClick}
                shakeCardId={shakeCardId}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Column;