// components/EcoZone.jsx
// components/EcoZone.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

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

// Class → Icon path
const getClassIconPath = (animalClass) => {
  if (!animalClass) return '/assets/icons/default.png';
  return `/assets/icons/${animalClass.toLowerCase()}.png`;
};

const EcoZone = ({ zone, onDropToZone }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onDropToZone(item, zone.className),
    canDrop: (item) => {
      if (item.class !== zone.className) return false;
      const last = zone.cards[zone.cards.length - 1];
      return last ? item.rank === last.rank + 1 : item.rank === 1;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [zone]);

  const bgColor = getClassBackground(zone.className);
  const iconSrc = getClassIconPath(zone.className);

  return (
    <div
      ref={drop}
      className={`w-5 sm:w-16 md:w-24 min-h-[50px] sm:min-h-[200px] md:min-h-[280px] overflow-hidden border-0 sm:border p-0 sm:p-1 md:p-2 rounded-sm sm:rounded flex flex-col items-center 
        bg-white/20 sm:bg-white/30 backdrop-blur-md shadow-sm sm:shadow-md transition duration-300 ease-in-out
        \${isOver && canDrop ? 'ring-1 sm:ring-4 ring-green-400 animate-pulse' : ''}
        \${!isOver && canDrop ? 'ring-1 sm:ring-2 ring-green-200' : ''}`}
      style={{ outline: '0' }}
    >
      {/* Class icon header stays fixed */}
      <img
        src={iconSrc}
        alt={zone.className}
        className="w-4 h-4 sm:w-12 sm:h-12 mb-0 sm:mb-2 object-contain"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/assets/icons/default.png';
        }}
      />

      {/* Card Stack container with top margin */}
      <div className="mt-1 sm:mt-8 md:mt-16 relative w-full flex flex-col items-center">
        {zone.cards.length === 0 ? (
          <div className="text-gray-300 text-[8px] sm:text-sm mt-2 sm:mt-20">-</div>
        ) : (
          zone.cards.map((card, i) => (
            <div key={card.id} className="mb-[-55px] sm:mb-[-60px] relative" style={{ zIndex: i }}>
              <Card card={card} isTop={i === zone.cards.length - 1} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EcoZone;



