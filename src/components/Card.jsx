
// components/Card.jsx
import React, { useState, useEffect } from 'react';
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

  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  // Listen for orientation changes
  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const border = getRankBorder(card.rank);
  const bg = getClassBackground(card.class || card.className);
  const iconSrc = getClassIconPath(card.class || card.className);

  // Adjust sizing for portrait (60px × 40px) and landscape
  const cardSizeClasses = orientation === 'landscape' && window.innerHeight < 500
    ? 'w-12 h-6 sm:w-14 md:w-16 sm:h-16 md:h-20' // Smaller in landscape
    : 'w-[60px] h-[40px] sm:w-16 md:w-20 sm:h-24 md:h-28'; // 60×40px ratio for portrait mode

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
      className={`${cardSizeClasses} rounded-md sm:rounded shadow-sm sm:shadow-md z-10 relative border border ${border} ${
        card.faceUp ? `${bg} text-black` : 'bg-gray-700'
      } ${isDragging ? 'opacity-50' : ''} cursor-pointer ${shakeCardId === card.id ? 'animate-shake' : ''}`}
    >
      {card.faceUp ? (
        <div className="w-full h-full p-0 sm:p-1 relative flex flex-col justify-between">
          {/* Top-left rank and side-by-side icon */}
          <div className="flex items-center justify-between w-full h-full p-1">
            <div className="text-[16px] sm:text-xs md:text-base font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {card.rank}
            </div>
            
            <img
              src={iconSrc}
              alt={card.class}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain"
              loading="lazy"
            />
          </div>

          {/* Bottom-right rank (mirrored) - hidden on mobile */}
          <div className="absolute bottom-0 right-0 text-[7px] sm:text-xs md:text-base font-bold transform rotate-180 hidden sm:block">
            {card.rank}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] sm:text-xl">
          🂠
        </div>
      )}
    </div>
  );
};

export default Card;

