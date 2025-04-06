
export const ANIMAL_CLASSES = ['Mammals', 'Birds', 'Reptiles', 'Amphibians', 'Fish'];

export const generateDeck = () => {
  const deck = [];
  ANIMAL_CLASSES.forEach((cls) => {
    for (let rank = 1; rank <= 10; rank++) {
      deck.push({
        id: `${cls}-${rank}`,
        class: cls,
        rank,
      });
    }
  });
  return shuffle(deck);
};

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const initializeGame = () => {
  const deck = generateDeck(); // 50 cards total
  const shuffled = shuffle(deck);

  const columns = Array.from({ length: 5 }, (_, i) => {
    const col = shuffled.splice(0, i + 1); // Deal 1 to 5 cards per column
    return col.map((card, idx) => ({
      ...card,
      faceUp: idx === i, // Only the last card in the column is face-up
    }));
  });

  const drawPile = shuffled.map((card) => ({
    ...card,
    faceUp: false,
  }));

  const discardPile = [];

  const ecoZones = ANIMAL_CLASSES.map((cls) => ({
    className: cls,
    cards: [],
  }));

  return {
    columns,
    drawPile,
    discardPile,
    ecoZones,
  };
};
