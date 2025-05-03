// components/Card.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

// Rank → Border color
const getRankBorder = (rank) => {
  if (rank === 1) return 'border-green-600';
  if (rank <= 3) return 'border-yellow-500';
  if (rank <= 6) return 'border-orange-500';
  if (rank <= 8) return 'border-orange-700';
  if (rank === 9) return 'border-red-500';
  if (rank === 10) return 'border-red-800';
  return 'border-gray-300';
};

// Class → Background color
const getClassBackground = (animalClass) => {
  switch (animalClass) {
    case 'Mammals': return 'bg-red-100';
    case 'Amphibians': return 'bg-yellow-100';
    case 'Fish': return 'bg-blue-100';
    case 'Birds': return 'bg-green-100';
    case 'Reptiles': return 'bg-orange-100';
    default: return 'bg-white';
  }
};

// Class → Custom Icon path
const getClassIconPath = (animalClass) => {
  return `/assets/icons/${animalClass.toLowerCase()}.png`;
};

const Card = ({ card, isTop, onClick, shakeCardId }) => {
  if (!card) return null;

  const border = getRankBorder(card.rank);
  const bg = getClassBackground(card.class || card.className);
  const iconSrc = getClassIconPath(card.class || card.className);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { ...card },
    canDrag: card.faceUp && isTop,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [card, isTop]);

  const handleClick = () => {
    if (onClick && card.faceUp) {
      onClick(card);
    }
  };

  // Hard-coded inline style that cannot be overridden by CSS
  const exactCardStyle = {
    width: '60px',
    height: '40px',
    minWidth: '60px',
    maxWidth: '60px',
    minHeight: '40px',
    maxHeight: '40px',
    display: 'block',
    boxSizing: 'border-box'
  };

  // Hard-coded content style
  const innerContentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px'
  };

  // Hard-coded icon style
  const iconStyle = {
    width: '32px',
    height: '32px',
    objectFit: 'contain'
  };

  // Hard-coded rank style
  const rankStyle = {
    fontSize: '16px',
    fontWeight: 'bold'
  };

  return (
    <div
      ref={isTop ? drag : null}
      onClick={handleClick}
      className={`Card rounded-md shadow-sm border ${border} ${
        card.faceUp ? `${bg} text-black` : 'bg-gray-700'
      } ${isDragging ? 'opacity-50' : ''} cursor-pointer ${shakeCardId === card.id ? 'animate-shake' : ''}`}
      style={exactCardStyle}
    >
      {card.faceUp ? (
        <div style={{ width: '100%', height: '100%' }}>
          <div style={innerContentStyle}>
            <div style={rankStyle}>
              {card.rank}
            </div>
            
            <img
              src={iconSrc}
              alt={card.class}
              style={iconStyle}
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          fontSize: '10px'
        }}>
          🂠
        </div>
      )}
    </div>
  );
};

export default Card;