import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ cards, columnIndex, onCardDrop, onCardClick, shakeCardId }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onCardDrop(item, columnIndex),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`Column w-[20%] !w-[20%] min-w-[60px] !min-w-[60px] max-w-[70px] !max-w-[70px] sm:w-16 md:w-24 min-h-[190px] sm:min-h-[250px] md:min-h-[350px] landscape:min-h-[200px] overflow-hidden border border-dashed border-gray-400 
        rounded-md sm:rounded p-0.5 sm:p-1 flex flex-col items-center transition duration-200 
        backdrop-blur-md bg-white/60 sm:bg-white/30 shadow-md sm:shadow-md ${isOver ? 'ring-2 sm:ring-2 ring-green-400' : ''}`}
      style={{ width: '20%', minWidth: '60px', maxWidth: '70px', outline: '0' }}
    >
      {cards.length === 0 ? (
        <div className="text-gray-300 mt-1 sm:mt-24 landscape:mt-10 text-[8px] sm:text-sm">-</div>
      ) : (
        cards.map((card, i) => {
          // Card stacking with consistent overlap
          const marginClass = 'mb-[-32px] sm:mb-[-20px]'; // Exact -32px overlap as per design spec
            
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