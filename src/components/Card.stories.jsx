import React from 'react';
import Card from './Card';

export default {
  title: 'Eco-Solitaire/Card',
  component: Card,
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

// Base card template
const Template = (args) => <Card {...args} />;

// Face-up card stories for each class
export const MammalCard = {
  render: Template,
  args: {
    card: {
      id: '1',
      rank: 4,
      class: 'Mammals',
      faceUp: true,
    },
    isTop: true,
  },
};

export const BirdCard = {
  render: Template,
  args: {
    card: {
      id: '2',
      rank: 7,
      class: 'Birds',
      faceUp: true,
    },
    isTop: true,
  },
};

export const FishCard = {
  render: Template,
  args: {
    card: {
      id: '3',
      rank: 2,
      class: 'Fish',
      faceUp: true,
    },
    isTop: true,
  },
};

export const AmphibianCard = {
  render: Template,
  args: {
    card: {
      id: '4',
      rank: 9,
      class: 'Amphibians',
      faceUp: true,
    },
    isTop: true,
  },
};

export const ReptileCard = {
  render: Template,
  args: {
    card: {
      id: '5',
      rank: 1,
      class: 'Reptiles',
      faceUp: true,
    },
    isTop: true,
  },
};

// Face-down card
export const FaceDownCard = {
  render: Template,
  args: {
    card: {
      id: '6',
      rank: 5,
      class: 'Mammals',
      faceUp: false,
    },
    isTop: true,
  },
};

// Non-draggable card (not on top)
export const NonDraggableCard = {
  render: Template,
  args: {
    card: {
      id: '7',
      rank: 3,
      class: 'Birds',
      faceUp: true,
    },
    isTop: false,
  },
};

// Card with different rankings
export const LowRankCard = {
  render: Template,
  args: {
    card: {
      id: '8',
      rank: 1, // Least concern
      class: 'Fish',
      faceUp: true,
    },
    isTop: true,
  },
};

export const HighRankCard = {
  render: Template,
  args: {
    card: {
      id: '9',
      rank: 10, // Critical
      class: 'Mammals',
      faceUp: true,
    },
    isTop: true,
  },
};

// Mobile card simulation - portrait orientation
export const MobilePortraitCard = {
  render: (args) => (
    <div style={{ width: '320px', height: '100vh', padding: '10px', border: '1px dashed #ccc' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12px' }}>
        Mobile Portrait View
      </div>
      <Card {...args} />
    </div>
  ),
  args: {
    card: {
      id: '10',
      rank: 5,
      class: 'Mammals',
      faceUp: true,
    },
    isTop: true,
  },
};