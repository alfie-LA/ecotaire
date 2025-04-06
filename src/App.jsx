import React, { useState, useEffect } from 'react';
import Deck from './components/Deck';
import Column from './components/Column';
import EcoZone from './components/EcoZone';
import { initializeGame } from './utils/gameUtils';

const App = () => {
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

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto max-h-screen"
      style={{ backgroundImage: `url('/assets/images/eco-bg.png')` }}
    >
      <div className="w-full max-w-[1300px] mx-auto px-4 bg-white/30 rounded-xl shadow-lg py-6">

        <div className="text-center text-5xl sm:text-5xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] ">
          Score: {animatedScore}
        </div>
        <div className="text-center mb-4 text-sm font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
          Moves: {gameState.moves}
        </div>

        <div className="text-center mb-4 text-1xl sm:text-2xl font-extrabold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]">
         🏆 High Score: {highScore}
        </div>

        <div className="flex justify-center items-center flex-wrap gap-2 mb-6 px-2">
          <Deck
            drawPile={gameState.drawPile}
            discardPile={gameState.discardPile.slice(-3)}
            onDrawCard={handleDrawCard}
            onCardClick={handleCardClick} // NEW
          />
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-2 justify-items-center w-full max-w-[420px] sm:max-w-[720px] mx-auto mb-8">
          {gameState.columns.map((columnCards, index) => (
            <Column
              key={index}
              cards={columnCards}
              onDropCard={(card) => handleDropToColumn(card, index)}
              onCardClick={handleCardClick} // NEW
            />
          ))}
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-2 justify-items-center w-full max-w-[420px] sm:max-w-[720px] mx-auto mb-8">
          {gameState.ecoZones.map((zone, index) => (
            <EcoZone key={index} zone={zone} onDropToZone={handleDropToZone} />
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowHowToPlay(true)}
          >
          📘 How to Play
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleNewGame}
          >
            🔄 New Game
          </button>
        </div>
      </div>
      {showHowToPlay && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
      <h2 className="text-xl font-bold mb-4 text-green-700">🌱 How to Play Eco-Solitaire</h2>
      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-800">
        <li>Sort species into the correct Eco-Zone by class (Mammals, Birds, etc.).</li>
        <li>Cards must be placed in order from rank 1 (Least Concern) to 10 (Critically Endangered).</li>
        <li>Use the draw and discard piles to cycle through available cards.</li>
        <li>Click a card to automatically move it to a valid column or zone.</li>
        <li>Restore all 5 zones to win!</li>
      </ul>
      <button
        onClick={() => setShowHowToPlay(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
      >
        ✖
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default App;

