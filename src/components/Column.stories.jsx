import React from 'react';
import Column from './Column';

export default {
  title: 'Eco-Solitaire/Column',
  component: Column,
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

// Base template for Column
const Template = (args) => <Column {...args} />;

// Empty column
export const EmptyColumn = {
  render: Template,
  args: {
    columnIndex: 0,
    cards: [],
    onCardDrop: () => console.log('Card dropped'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Column with a few cards
export const ColumnWithCards = {
  render: Template,
  args: {
    columnIndex: 1,
    cards: [
      createCard(1, 4, 'Mammals'),
      createCard(2, 3, 'Mammals'),
      createCard(3, 2, 'Mammals'),
    ],
    onCardDrop: () => console.log('Card dropped'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Column with many cards (some face down)
export const FullColumn = {
  render: Template,
  args: {
    columnIndex: 2,
    cards: [
      createCard(1, 9, 'Birds', false),
      createCard(2, 8, 'Birds', false),
      createCard(3, 7, 'Birds'),
      createCard(4, 6, 'Birds'),
      createCard(5, 5, 'Birds'),
      createCard(6, 4, 'Birds'),
      createCard(7, 3, 'Birds'),
    ],
    onCardDrop: () => console.log('Card dropped'),
    onCardClick: () => console.log('Card clicked'),
  },
};

// Column in hover state (when card is being dragged over)
export const HoverColumn = {
  render: Template,
  args: {
    columnIndex: 3,
    cards: [
      createCard(1, 7, 'Fish'),
      createCard(2, 6, 'Fish'),
    ],
    onCardDrop: () => console.log('Card dropped'),
    onCardClick: () => console.log('Card clicked'),
    isOver: true, // This would normally be provided by useDrop
  },
};

// Mobile column simulation
export const MobileColumn = {
  render: (args) => (
    <div style={{ width: '320px', height: '500px', padding: '10px', border: '1px dashed #ccc' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12px' }}>
        Mobile Portrait View
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Column {...args} />
        <Column {...args} />
        <Column {...args} />
        <Column {...args} />
        <Column {...args} />
      </div>
    </div>
  ),
  args: {
    columnIndex: 0,
    cards: [
      createCard(1, 5, 'Reptiles', false),
      createCard(2, 4, 'Reptiles'),
      createCard(3, 3, 'Reptiles'),
    ],
    onCardDrop: () => console.log('Card dropped'),
    onCardClick: () => console.log('Card clicked'),
  },
};