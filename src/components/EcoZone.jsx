// components/EcoZone.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

// Class → Background color (for visual feedback only)
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

  const iconSrc = getClassIconPath(zone.className);

  // Hard-coded inline style that cannot be overridden by CSS
  const exactZoneStyle = {
    width: '55px',
    minWidth: '55px',
    maxWidth: '70px',
    height: '140px',
    minHeight: '140px',
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#9ca3af', // gray-400
    borderRadius: '0.375rem', // rounded-md
    padding: '2px', // p-0.5
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // bg-white/50
    boxSizing: 'border-box'
  };

  // Hard-coded icon style
  const iconStyle = {
    width: '32px',
    height: '32px',
    marginBottom: '0',
    objectFit: 'contain',
    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
  };

  return (
    <div
      ref={drop}
      className={`EcoZone ${isOver && canDrop ? 'ring-2 ring-green-400 animate-pulse' : ''} ${!isOver && canDrop ? 'ring-2 ring-green-200' : ''}`}
      style={exactZoneStyle}
    >
      {/* Class icon header stays fixed */}
      <img
        src={iconSrc}
        alt={zone.className}
        className="object-contain"
        style={iconStyle}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/assets/icons/default.png';
        }}
      />

      {/* Card Stack container with minimal top margin */}
      <div className="relative w-full flex flex-col items-center" style={{ marginTop: '0' }}>
        {zone.cards.length === 0 ? (
          <div className="text-gray-300 text-[8px] mt-0">-</div>
        ) : (
          zone.cards.map((card, i) => (
            <div 
              key={card.id} 
              className="relative" 
              style={{ 
                marginBottom: i < zone.cards.length - 1 ? '-32px' : '0',
                zIndex: i 
              }}
            >
              <Card card={card} isTop={i === zone.cards.length - 1} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EcoZone;