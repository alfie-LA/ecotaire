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
      className={`w-3 sm:w-16 md:w-24 min-h-[70px] sm:min-h-[250px] md:min-h-[350px] overflow-hidden border-0 sm:border sm:border-dashed sm:border-gray-300 
        rounded-sm sm:rounded p-0 sm:p-1 flex flex-col items-center transition duration-200 
        backdrop-blur-md bg-white/20 sm:bg-white/30 shadow-sm sm:shadow-md ${isOver ? 'ring-1 sm:ring-2 ring-green-400' : ''}`}
      style={{ outline: '0 sm:1px dashed transparent sm:blue' }}
    >
      {cards.length === 0 ? (
        <div className="text-gray-300 mt-5 sm:mt-24 text-[8px] sm:text-sm">-</div>
      ) : (
        cards.map((card, i) => (
          <div
             key={card.id}
             className={`relative ${card.faceUp ? 'mb-[-52px] sm:mb-[-20px]' : 'mb-[-52px] sm:mb-[-20px]'}`}
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