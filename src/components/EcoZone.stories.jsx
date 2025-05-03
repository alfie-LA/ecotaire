import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EcoZone from './EcoZone';

export default {
  title: 'Eco-Solitaire/EcoZone',
  component: EcoZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </DndProvider>
    ),
  ],
};

// Helper to create card objects
const createCard = (id, rank, cardClass) => ({
  id: `card-${id}`,
  rank,
  class: cardClass,
  faceUp: true,
});

// Base template for EcoZone
const Template = (args) => <EcoZone {...args} />;

// Empty EcoZone for each class
export const EmptyMammalsZone = {
  render: Template,
  args: {
    zone: {
      className: 'Mammals',
      cards: [],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

export const EmptyBirdsZone = {
  render: Template,
  args: {
    zone: {
      className: 'Birds',
      cards: [],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

export const EmptyFishZone = {
  render: Template,
  args: {
    zone: {
      className: 'Fish',
      cards: [],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

export const EmptyAmphibiansZone = {
  render: Template,
  args: {
    zone: {
      className: 'Amphibians',
      cards: [],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

export const EmptyReptilesZone = {
  render: Template,
  args: {
    zone: {
      className: 'Reptiles',
      cards: [],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

// EcoZone with cards
export const ZoneWithCards = {
  render: Template,
  args: {
    zone: {
      className: 'Mammals',
      cards: [
        createCard(1, 1, 'Mammals'),
        createCard(2, 2, 'Mammals'),
        createCard(3, 3, 'Mammals'),
      ],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
  },
};

// EcoZone with hover/drop state
export const ZoneWithDropHover = {
  render: Template,
  args: {
    zone: {
      className: 'Birds',
      cards: [
        createCard(1, 1, 'Birds'),
        createCard(2, 2, 'Birds'),
      ],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
    isOver: true,
    canDrop: true,
  },
};

// EcoZone with hover/can't drop state
export const ZoneWithInvalidDrop = {
  render: Template,
  args: {
    zone: {
      className: 'Fish',
      cards: [
        createCard(1, 1, 'Fish'),
        createCard(2, 2, 'Fish'),
      ],
    },
    onDropToZone: () => console.log('Card dropped to zone'),
    isOver: true,
    canDrop: false,
  },
};

// Mobile view with all EcoZones
export const MobileEcoZones = {
  render: () => (
    <div style={{ width: '320px', height: '200px', padding: '10px', border: '1px dashed #ccc' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12px' }}>
        Mobile Portrait View
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <EcoZone
          zone={{ className: 'Mammals', cards: [createCard(1, 1, 'Mammals')] }}
          onDropToZone={() => console.log('Card dropped to zone')}
        />
        <EcoZone
          zone={{ className: 'Birds', cards: [] }}
          onDropToZone={() => console.log('Card dropped to zone')}
        />
        <EcoZone
          zone={{ className: 'Fish', cards: [createCard(1, 1, 'Fish'), createCard(2, 2, 'Fish')] }}
          onDropToZone={() => console.log('Card dropped to zone')}
        />
        <EcoZone
          zone={{ className: 'Amphibians', cards: [] }}
          onDropToZone={() => console.log('Card dropped to zone')}
        />
        <EcoZone
          zone={{ className: 'Reptiles', cards: [] }}
          onDropToZone={() => console.log('Card dropped to zone')}
        />
      </div>
    </div>
  ),
};