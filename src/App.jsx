import React, { useState, useEffect } from 'react';
import Deck from './components/Deck';
import Column from './components/Column';
import EcoZone from './components/EcoZone';
import { initializeGame } from './utils/gameUtils';

// Add inline CSS directly for critical card sizing

const App = () => {
  // Add inline critical CSS to ensure card dimensions
  useEffect(() => {
    // Add critical CSS styles directly to the document head with exact pixel specs
    const style = document.createElement('style');
    style.innerHTML = `
      /* Exact specs from mobile-ui-sizing.html */
      .Card, [class*="Card"] {
        width: 60px !important;
        height: 40px !important;
        min-width: 60px !important;
        max-width: 60px !important;
        min-height: 40px !important;
        max-height: 40px !important;
        box-sizing: border-box !important;
      }
      
      .Card > div > div, [class*="Card"] > div > div {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 4px !important;
      }

      .Card img {
        width: 32px !important;
        height: 32px !important;
      }

      .Column {
        width: 55px !important;
        height: 190px !important;
        min-width: 55px !important;
        max-width: 70px !important;
      }

      .EcoZone {
        width: 55px !important;
        height: 140px !important;
        min-width: 55px !important;
        max-width: 70px !important;
      }

      .Column > div {
        margin-bottom: -32px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [gameState, setGameState] = useState(() => ({
    ...initializeGame(),
    score: 0,
    moves: 0,
  }));

  const [animatedScore, setAnimatedScore] = useState(0);

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
  return parseInt(localStorage.getItem('highScore')) || 0;
  });


  useEffect(() => {
    if (animatedScore === gameState.score) return;

    const step = () => {
      setAnimatedScore((prev) => {
        if (prev === gameState.score) return prev;
        const diff = gameState.score - prev;
        const increment = Math.sign(diff) * Math.ceil(Math.abs(diff) / 10);
        return prev + increment;
      });
    };

    const timer = setTimeout(step, 30);
    return () => clearTimeout(timer);
  }, [gameState.score, animatedScore]);

  const handleDrawCard = () => {
    setGameState((prev) => {
      let drawPile = [...prev.drawPile];
      let discardPile = [...prev.discardPile];

      if (drawPile.length === 0 && discardPile.length > 0) {
        drawPile = discardPile.map(card => ({ ...card, faceUp: false })).reverse();
        discardPile = [];
      }

      const drawn = drawPile.pop();
      if (drawn) {
        drawn.faceUp = true;
        discardPile.push(drawn);
      }

      return { ...prev, drawPile, discardPile, moves: prev.moves + 1 };
    });
  };

  const handleDropToColumn = (card, columnIndex) => {
    setGameState((prev) => {
      const columns = [...prev.columns];
      const column = [...columns[columnIndex]];
      const top = column[column.length - 1];
      if (!top || card.rank === top.rank - 1) {
        column.push(card);
        columns[columnIndex] = column;
        const discardPile = prev.discardPile.filter((c) => c.id !== card.id);
        return { ...prev, columns, discardPile, moves: prev.moves + 1 };
      }
      return prev;
    });
  };

  const handleDropToZone = (card, zoneClass) => {
    setGameState((prev) => {
      let score = prev.score;
      let moves = prev.moves + 1;

      const ecoZones = [...prev.ecoZones];
      const zoneIndex = ecoZones.findIndex((z) => z.className === zoneClass);
      const zone = { ...ecoZones[zoneIndex], cards: [...ecoZones[zoneIndex].cards] };
      const last = zone.cards[zone.cards.length - 1];

      if (!last && card.rank !== 1) return prev;
      if (last && card.rank !== last.rank + 1) return prev;

      zone.cards.push(card);
      ecoZones[zoneIndex] = zone;
      score += 10;

      if (zone.cards.length === 10) {
        score += 100;
      }

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score.toString());
      }
      
      const discardPile = prev.discardPile.filter((c) => c.id !== card.id);

      const columns = prev.columns.map((col) => {
        const idx = col.findIndex((c) => c.id === card.id);
        if (idx > -1) {
          const newCol = [...col.slice(0, idx), ...col.slice(idx + 1)];
          if (newCol.length > 0 && !newCol[newCol.length - 1].faceUp) {
            newCol[newCol.length - 1].faceUp = true;
            score += 5;
          }
          return newCol;
        }
        return col;
      });

      return { ...prev, ecoZones, discardPile, columns, score, moves };
    });
  };

  // NEW: Handle click on a card and try to auto-move it to an EcoZone if valid
  const handleCardClick = (card) => {
    const zone = gameState.ecoZones.find(z => z.className === card.class);
    const top = zone.cards[zone.cards.length - 1];

    // 1. Try placing into Eco-Zone
    if ((!top && card.rank === 1) || (top && card.rank === top.rank + 1)) {
      handleDropToZone(card, card.class);
      return;
    }

    // 2. Try placing into another valid tableau column (Solitaire-style)
    const sourceColumnIndex = gameState.columns.findIndex(col => col.some(c => c.id === card.id));
    if (sourceColumnIndex > -1) {
      const sourceColumn = gameState.columns[sourceColumnIndex];
      const cardIndex = sourceColumn.findIndex(c => c.id === card.id);
      const movingStack = sourceColumn.slice(cardIndex); // All face-up cards from clicked card down

      for (let i = 0; i < gameState.columns.length; i++) {
        if (i === sourceColumnIndex) continue; // skip the same column

        const destColumn = gameState.columns[i];
        const topDestCard = destColumn[destColumn.length - 1];

        const canDrop =
          (destColumn.length === 0) ||
          (topDestCard.class === card.class && topDestCard.rank === card.rank + 1);

        if (canDrop) {
          setGameState(prev => {
            const newColumns = [...prev.columns];

            const from = [...newColumns[sourceColumnIndex]];
            const to = [...newColumns[i]];

            to.push(...movingStack);
            from.splice(cardIndex); // remove moved cards

            if (from.length > 0 && !from[from.length - 1].faceUp) {
              from[from.length - 1].faceUp = true;
            }

            newColumns[sourceColumnIndex] = from;
            newColumns[i] = to;

            return {
              ...prev,
              columns: newColumns,
              moves: prev.moves + 1,
              score: prev.score + 5,
            };
          });
          return;
        }
      }
    }

    // 3. Try placing into any tableau column from discard
    for (let i = 0; i < gameState.columns.length; i++) {
      if (i === sourceColumnIndex) continue; // prevent bouncing back to original column
      const column = gameState.columns[i];
      const columnTop = column[column.length - 1];
      if (
        (column.length === 0 && card.class === columnTop?.class) ||
        (card.rank === columnTop?.rank - 1 && card.class === columnTop?.class)
      ) {
        handleDropToColumn(card, i);
        return;
      }
    }
  };

  const handleNewGame = () => {
    setGameState({
      ...initializeGame(),
      score: 0,
      moves: 0,
    });
    setAnimatedScore(0);
  };

  // State for device orientation
  const [windowOrientation, setWindowOrientation] = useState(
    typeof window !== 'undefined' ? 
      window.innerWidth > window.innerHeight ? 'landscape' : 'portrait' 
      : 'portrait'
  );

  // Explicitly track if we're on mobile
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? 
      window.innerWidth < 768 : false
  );

  // Detect orientation and device changes
  useEffect(() => {
    const handleResize = () => {
      setWindowOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile landscape layout showing just active gameplay elements
  const mobileLandscapeLayout = (
    <div className="h-[100svh] w-screen overflow-hidden flex flex-col p-1 bg-cover bg-center"
         style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}>
      {/* Tiny scores - absolute positioned to save space */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2 py-0.5 bg-black/30 text-white text-[8px]">
        <div className="flex-1 text-center">S:{animatedScore}</div>
        <div className="flex-1 text-center">🏆{highScore}</div>
        <div className="flex-1 text-center">M:{gameState.moves}</div>
      </div>

      {/* Main game layout with reduced spacing */}
      <div className="flex flex-row mt-4 gap-0 h-[calc(100%-30px)]">
        {/* Draw/Discard */}
        <div className="w-[30px] flex flex-col items-center justify-start">
          <Deck
            drawPile={gameState.drawPile}
            discardPile={gameState.discardPile.slice(-3)}
            onDrawCard={handleDrawCard}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Main game area - tight columns */}
        <div className="flex-1 flex flex-col space-y-0">
          {/* Columns */}
          <div className="flex justify-between h-1/2 w-full px-0">
            {gameState.columns.map((columnCards, index) => (
              <Column
                key={index}
                columnIndex={index}
                cards={columnCards}
                onCardDrop={(card) => handleDropToColumn(card, index)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {/* EcoZones */}
          <div className="flex justify-between h-1/2 w-full px-0 pt-1">
            {gameState.ecoZones.map((zone, index) => (
              <EcoZone key={index} zone={zone} onDropToZone={handleDropToZone} />
            ))}
          </div>
        </div>
      </div>

      {/* Tiny action buttons - absolute positioned */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 py-0.5 bg-black/30">
        <button
          className="bg-blue-500 text-white px-1 py-0 text-[7px] rounded"
          onClick={() => setShowHowToPlay(true)}
        >
          📘
        </button>
        
        <button
          className="bg-green-600 text-white px-1 py-0 text-[7px] rounded"
          onClick={handleNewGame}
        >
          🔄
        </button>
      </div>
    </div>
  );

  // Regular layout for desktop or portrait orientation
  const regularLayout = (
    <div className="h-[100svh] w-screen bg-cover bg-center bg-no-repeat overflow-hidden"
         style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}>
      <div className="h-full w-full max-w-[1300px] mx-auto px-0 sm:px-4 bg-white/30 rounded-none sm:rounded-xl shadow-lg py-1 sm:py-6 flex flex-col">

        {/* Score section */}
        <div className="grid grid-cols-3 items-center mb-0 sm:mb-4">
          <div className="text-center">
            <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              {animatedScore}
            </div>
            <div className="text-[8px] sm:text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
              Score
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm sm:text-2xl font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
              🏆{highScore}
            </div>
            <div className="text-[8px] sm:text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
              High Score
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm sm:text-2xl font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
              {gameState.moves}
            </div>
            <div className="text-[8px] sm:text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
              Moves
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col gap-0 sm:gap-4 justify-center h-full">
          {/* Draw/Discard pile */}
          <div className="flex justify-center items-center">
            <Deck
              drawPile={gameState.drawPile}
              discardPile={gameState.discardPile.slice(-3)}
              onDrawCard={handleDrawCard}
              onCardClick={handleCardClick}
            />
          </div>

          {/* Cards area */}
          <div className="flex-1 flex flex-col justify-between h-full py-0">
            {/* Columns */}
            <div className="grid grid-cols-5 gap-0 justify-items-center w-full">
              {gameState.columns.map((columnCards, index) => (
                <Column
                  key={index}
                  columnIndex={index}
                  cards={columnCards}
                  onCardDrop={(card) => handleDropToColumn(card, index)}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>

            {/* EcoZones */}
            <div className="grid grid-cols-5 gap-0 justify-items-center w-full mt-0 sm:mt-4">
              {gameState.ecoZones.map((zone, index) => (
                <EcoZone key={index} zone={zone} onDropToZone={handleDropToZone} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Game controls */}
        <div className="flex justify-center space-x-1 sm:space-x-4 mt-0 sm:mt-4 pb-1">
          <button
            className="bg-blue-500 text-white px-1 py-0 sm:px-4 sm:py-2 rounded text-[10px] sm:text-base hover:bg-blue-600"
            onClick={() => setShowHowToPlay(true)}
          >
            📘 How to Play
          </button>
          
          <button
            className="bg-green-600 text-white px-1 py-0 sm:px-4 sm:py-2 rounded text-[10px] sm:text-base hover:bg-green-700"
            onClick={handleNewGame}
          >
            🔄 New Game
          </button>
        </div>
      </div>
    </div>
  );

  // Choose layout based on device and orientation
  return (
    <div
      className="h-[100svh] w-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}
    >
      {/* Fixed layout with no gap - follows mobile-ui-sizing.html specs exactly */}
      <div className="w-full max-w-[320px] mx-auto px-2 bg-white/50 py-2 flex flex-col" style={{ height: 'auto', minHeight: 'min-content' }}>
        
        {/* Score section - fixed 40px height */}
        <div className="grid grid-cols-3 items-center bg-black/30 rounded shadow-md" style={{ height: '40px', marginBottom: '8px' }}>
          <div className="text-center px-1">
            <div className="text-base font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] leading-none">
              {animatedScore}
            </div>
            <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
              Score
            </div>
          </div>
          
          <div className="text-center px-1">
            <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
              🏆{highScore}
            </div>
            <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
              High
            </div>
          </div>
          
          <div className="text-center px-1">
            <div className="text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
              {gameState.moves}
            </div>
            <div className="text-[8px] font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)] leading-none">
              Moves
            </div>
          </div>
        </div>

        {/* Draw/Discard pile - fixed 50px height */}
        <div className="flex justify-center items-center" style={{ height: '50px', marginBottom: '8px' }}>
          <Deck
            drawPile={gameState.drawPile}
            discardPile={gameState.discardPile.slice(-3)}
            onDrawCard={handleDrawCard}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Columns - fixed 200px height */}
        <div className="grid grid-cols-5 gap-1 justify-items-center w-full" style={{ height: '200px', marginBottom: '8px' }}>
          {gameState.columns.map((columnCards, index) => (
            <Column
              key={index}
              columnIndex={index}
              cards={columnCards}
              onCardDrop={(card) => handleDropToColumn(card, index)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        {/* EcoZones - fixed 150px height */}
        <div className="grid grid-cols-5 gap-1 justify-items-center w-full" style={{ height: '150px', marginBottom: '8px' }}>
          {gameState.ecoZones.map((zone, index) => (
            <EcoZone key={index} zone={zone} onDropToZone={handleDropToZone} />
          ))}
        </div>
        
        {/* Game controls - fixed 50px height */}
        <div className="flex justify-center space-x-4" style={{ height: '50px' }}>
          <button
            className="bg-blue-600 text-white w-[40px] h-[40px] flex items-center justify-center rounded-lg text-lg"
            onClick={() => setShowHowToPlay(true)}
          >
            📘
          </button>
          
          <button
            className="bg-green-600 text-white w-[40px] h-[40px] flex items-center justify-center rounded-lg text-lg"
            onClick={handleNewGame}
          >
            🔄
          </button>
        </div>
      </div>
      
      {showHowToPlay && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-lg relative">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-green-700">🌱 How to Play Eco-Solitaire</h2>
            <ul className="list-disc ml-4 sm:ml-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-800">
              <li>Sort species into the correct Eco-Zone by class (Mammals, Birds, etc.).</li>
              <li>Cards must be placed in order from rank 1 (Least Concern) to 10 (Critically Endangered).</li>
              <li>Use the draw and discard piles to cycle through available cards.</li>
              <li>Click a card to automatically move it to a valid column or zone.</li>
              <li>Restore all 5 zones to win!</li>
            </ul>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-md text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default App;

