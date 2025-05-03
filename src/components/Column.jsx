import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ cards, columnIndex, onCardDrop, onCardClick, shakeCardId }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onCardDrop(item, columnIndex),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  // Hard-coded inline style that cannot be overridden by CSS
  const exactColumnStyle = {
    width: '55px',
    minWidth: '55px',
    maxWidth: '70px',
    height: '190px',
    minHeight: '190px',
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#9ca3af', // gray-400
    borderRadius: '0.375rem', // rounded-md
    padding: '2px', // p-0.5
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // bg-white/50
    boxSizing: 'border-box'
  };

  return (
    <div
      ref={drop}
      className={`Column ${isOver ? 'ring-2 ring-green-400' : ''}`}
      style={exactColumnStyle}
    >
      {cards.length === 0 ? (
        <div className="text-gray-300 mt-1 text-[8px]">-</div>
      ) : (
        cards.map((card, i) => {
          return (
            <div
              key={card.id}
              className="relative"
              style={{ marginBottom: i < cards.length - 1 ? '-20px' : '0', zIndex: i }}
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