import React from 'react';
import Deck from './Deck';

export default {
  title: 'Eco-Solitaire/Deck',
  component: Deck,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
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

// Generate an array of cards for the draw pile
const generateDrawPile = (count = 10) => {
  const cards = [];
  const classes = ['Mammals', 'Birds', 'Fish', 'Amphibians', 'Reptiles'];
  
  for (let i = 0; i < count; i++) {
    const classIndex = i % 5;
    const rank = (i % 10) + 1;
    cards.push(createCard(`draw-${i}`, rank, classes[classIndex], false));
  }
  
  return cards;
};

// Base template for Deck
const Template = (args) => <Deck {...args} />;

// Full deck
export const FullDeck = {
  render: Template,
  args: {
    drawPile: generateDrawPile(20),
    discardPile: [],
    onDrawCard: () => console.log('Card drawn'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Deck with some cards in discard pile
export const DeckWithDiscards = {
  render: Template,
  args: {
    drawPile: generateDrawPile(15),
    discardPile: [
      createCard('discard-1', 3, 'Mammals'),
      createCard('discard-2', 7, 'Birds'),
      createCard('discard-3', 2, 'Fish'),
    ],
    onDrawCard: () => console.log('Card drawn'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Empty draw pile, cards in discard (recycle state)
export const RecycleDeck = {
  render: Template,
  args: {
    drawPile: [],
    discardPile: [
      createCard('discard-1', 4, 'Reptiles'),
      createCard('discard-2', 9, 'Amphibians'),
      createCard('discard-3', 1, 'Mammals'),
      createCard('discard-4', 6, 'Birds'),
    ],
    onDrawCard: () => console.log('Card drawn'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Empty deck
export const EmptyDeck = {
  render: Template,
  args: {
    drawPile: [],
    discardPile: [],
    onDrawCard: () => console.log('Card drawn'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Mobile view
export const MobileDeck = {
  render: (args) => (
    <div style={{ width: '320px', padding: '10px', border: '1px dashed #ccc' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12px' }}>
        Mobile Portrait View
      </div>
      <Deck {...args} />
    </div>
  ),
  args: {
    drawPile: generateDrawPile(10),
    discardPile: [
      createCard('discard-1', 5, 'Mammals'),
      createCard('discard-2', 2, 'Birds'),
    ],
    onDrawCard: () => console.log('Card drawn'),
    onCardClick: () => console.log('Card clicked'),
  },
};