
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

  return (
    <div
      ref={isTop ? drag : null}
      onClick={handleClick}
      className={`w-16 sm:w-20 h-24 sm:h-28 rounded shadow-md mb-[-60px] z-10 relative border-2 ${border} ${
        card.faceUp ? `${bg} text-black` : 'bg-gray-700'
      } ${isDragging ? 'opacity-50' : ''} cursor-pointer ${shakeCardId === card.id ? 'animate-shake' : ''}`}
    >
      {card.faceUp ? (
        <div className="w-full h-full p-1 relative flex flex-col justify-between">
          {/* Top-left rank */}
          <div className="absolute top-1 left-1 text-base font-bold">
            {card.rank}
          </div>

          {/* Center large icon */}
          <div className="flex-grow flex items-center justify-center">
            <img
              src={iconSrc}
              alt={card.class}
              className="w-13 h-13 object-contain"
              loading="lazy"
            />
          </div>

          {/* Bottom-right rank (mirrored) */}
          <div className="absolute bottom-1 right-1 text-base font-bold transform rotate-180">
            {card.rank}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
          🂠
        </div>
      )}
    </div>
  );
};

export default Card;

