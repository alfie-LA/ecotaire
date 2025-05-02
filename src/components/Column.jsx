import React from 'react';
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
      className={`w-16 sm:w-20 md:w-24 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] overflow-hidden border border-dashed border-gray-300 
        rounded p-1 flex flex-col items-center transition duration-200 
        backdrop-blur-md bg-white/30 shadow-md ${isOver ? 'ring-2 ring-green-400' : ''}`}
      style={{ outline: '1px dashed blue' }}
    >
      {cards.length === 0 ? (
        <div className="text-gray-300 mt-24 text-sm">Empty</div>
      ) : (
        cards.map((card, i) => (
          <div
             key={card.id}
             className={`relative ${card.faceUp ? 'mb-[-20px]' : 'mb-[-20px]'}`}
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
        ))
      )}
    </div>
  );
};

export default Column;