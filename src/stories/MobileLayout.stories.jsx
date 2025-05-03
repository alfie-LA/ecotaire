import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Column';
import EcoZone from '../components/EcoZone';
import Deck from '../components/Deck';

export default {
  title: 'Eco-Solitaire/MobileLayout',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    ),
  ],
};

// Helper to create card objects
const createCard = (id, rank, cardClass, faceUp = true) => ({
  id: `card-${id}`,
  rank,
  class: cardClass,
  faceUp,
});

// Mobile portrait layout
export const MobilePortrait = {
  render: () => {
    // Mocked game data
    const drawPile = Array(8).fill().map((_, i) => createCard(`draw-${i}`, i + 1, 'Mammals', false));
    const discardPile = [createCard('discard-1', 5, 'Mammals')];
    
    const columns = [
      [createCard('col1-1', 3, 'Birds', false), createCard('col1-2', 2, 'Birds')],
      [createCard('col2-1', 4, 'Mammals')],
      [createCard('col3-1', 7, 'Fish', false), createCard('col3-2', 6, 'Fish', false), createCard('col3-3', 5, 'Fish')],
      [createCard('col4-1', 2, 'Reptiles', false), createCard('col4-2', 1, 'Reptiles')],
      [createCard('col5-1', 8, 'Amphibians')]
    ];
    
    const ecoZones = [
      { className: 'Mammals', cards: [createCard('eco1-1', 1, 'Mammals')] },
      { className: 'Birds', cards: [] },
      { className: 'Fish', cards: [createCard('eco3-1', 1, 'Fish'), createCard('eco3-2', 2, 'Fish')] },
      { className: 'Reptiles', cards: [] },
      { className: 'Amphibians', cards: [] }
    ];
    
    return (
      <div className="w-[320px] h-[568px] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}>
        <div className="h-full w-full bg-white/50 px-2 py-1 flex flex-col">
          {/* Score section */}
          <div className="grid grid-cols-3 items-center mb-2 py-1 bg-black/30 rounded shadow-md">
            <div className="text-center px-1">
              <div className="text-base font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] leading-none">
                125
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                Score
              </div>
            </div>
            
            <div className="text-center px-1">
              <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                🏆250
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                High
              </div>
            </div>
            
            <div className="text-center px-1">
              <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                17
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                Moves
              </div>
            </div>
          </div>
          
          {/* Deck */}
          <div className="flex justify-center items-center mb-2">
            <Deck
              drawPile={drawPile}
              discardPile={discardPile}
              onDrawCard={() => console.log('Draw card')}
              onCardClick={() => console.log('Card clicked')}
            />
          </div>
          
          {/* Game columns */}
          <div className="flex-1 flex flex-col justify-between h-full py-0">
            {/* Columns */}
            <div className="grid grid-cols-5 gap-2 justify-items-center w-full mb-4">
              {columns.map((columnCards, index) => (
                <Column
                  key={index}
                  columnIndex={index}
                  cards={columnCards}
                  onCardDrop={() => console.log('Card dropped')}
                  onCardClick={() => console.log('Card clicked')}
                />
              ))}
            </div>
            
            {/* EcoZones */}
            <div className="grid grid-cols-5 gap-2 justify-items-center w-full">
              {ecoZones.map((zone, index) => (
                <EcoZone key={index} zone={zone} onDropToZone={() => console.log('Card dropped to zone')} />
              ))}
            </div>
          </div>
          
          {/* Game controls */}
          <div className="flex justify-center space-x-4 mt-2 pb-1 h-[40px]">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded-lg text-lg h-full shadow-md"
              onClick={() => console.log('How to play')}
            >
              📘
            </button>
            
            <button
              className="bg-green-600 text-white px-4 py-1 rounded-lg text-lg h-full shadow-md"
              onClick={() => console.log('New game')}
            >
              🔄
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// Mobile landscape layout
export const MobileLandscape = {
  render: () => {
    // Mocked game data
    const drawPile = Array(8).fill().map((_, i) => createCard(`draw-${i}`, i + 1, 'Mammals', false));
    const discardPile = [createCard('discard-1', 5, 'Mammals')];
    
    const columns = [
      [createCard('col1-1', 3, 'Birds', false), createCard('col1-2', 2, 'Birds')],
      [createCard('col2-1', 4, 'Mammals')],
      [createCard('col3-1', 7, 'Fish', false), createCard('col3-2', 6, 'Fish', false), createCard('col3-3', 5, 'Fish')],
      [createCard('col4-1', 2, 'Reptiles', false), createCard('col4-2', 1, 'Reptiles')],
      [createCard('col5-1', 8, 'Amphibians')]
    ];
    
    const ecoZones = [
      { className: 'Mammals', cards: [createCard('eco1-1', 1, 'Mammals')] },
      { className: 'Birds', cards: [] },
      { className: 'Fish', cards: [createCard('eco3-1', 1, 'Fish'), createCard('eco3-2', 2, 'Fish')] },
      { className: 'Reptiles', cards: [] },
      { className: 'Amphibians', cards: [] }
    ];
    
    return (
      <div className="w-[568px] h-[320px] mx-auto bg-cover bg-center" style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}>
        <div className="h-full w-full bg-white/50 p-1 flex flex-col">
          {/* Score section */}
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 grid grid-rows-3 grid-cols-1 bg-black/30 rounded p-1 shadow-md">
            <div className="text-center px-1 mb-1">
              <div className="text-base font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] leading-none">
                125
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                Score
              </div>
            </div>
            
            <div className="text-center px-1 mb-1">
              <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                🏆250
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                High
              </div>
            </div>
            
            <div className="text-center px-1">
              <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                17
              </div>
              <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
                Moves
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 flex flex-row landscape:pl-8 gap-0 justify-start h-full">
            {/* Left section - Draw/Discard pile */}
            <div className="flex justify-center items-start landscape:pt-2 mr-1">
              <Deck
                drawPile={drawPile}
                discardPile={discardPile}
                onDrawCard={() => console.log('Draw card')}
                onCardClick={() => console.log('Card clicked')}
              />
            </div>
            
            {/* Right section for game columns and eco zones */}
            <div className="flex-1 flex flex-col justify-between h-full py-0 pl-0">
              {/* Columns */}
              <div className="grid grid-cols-5 gap-1 justify-items-center w-full mx-0">
                {columns.map((columnCards, index) => (
                  <Column
                    key={index}
                    columnIndex={index}
                    cards={columnCards}
                    onCardDrop={() => console.log('Card dropped')}
                    onCardClick={() => console.log('Card clicked')}
                  />
                ))}
              </div>
              
              {/* EcoZones */}
              <div className="grid grid-cols-5 gap-1 justify-items-center w-full mx-0 landscape:mt-1 mb-0">
                {ecoZones.map((zone, index) => (
                  <EcoZone key={index} zone={zone} onDropToZone={() => console.log('Card dropped to zone')} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Game controls */}
          <div className="absolute right-2 top-1 flex-col space-y-1 space-x-0">
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 shadow-md block mb-1"
              onClick={() => console.log('How to play')}
            >
              📘
            </button>
            
            <button
              className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700 shadow-md block"
              onClick={() => console.log('New game')}
            >
              🔄
            </button>
          </div>
        </div>
      </div>
    );
  }
};