# Eco-Solitaire Storybook

This is the Storybook documentation for Eco-Solitaire, a card game focused on environmental conservation themes.

## Getting Started

To run Storybook:

```bash
npm run storybook
```

This will start Storybook on port 6006. Open your browser at http://localhost:6006 to view the component library.

## Available Components

### Card Component

The Card component displays individual cards with:
- Rank (1-10 representing conservation status)
- Class (Mammals, Birds, Fish, Amphibians, Reptiles)
- Visual styling based on rank and class
- Draggable functionality

### Column Component

The Column component displays a vertical stack of cards with:
- Multiple stacked cards with overlap
- Drag and drop functionality
- Empty state display
- Responsive design for mobile and desktop

### EcoZone Component

The EcoZone component represents habitat zones for different animal classes with:
- Class-specific styling and icons
- Drop target functionality
- Card stacking
- Visual feedback for valid/invalid drops

### Deck Component

The Deck component shows the draw and discard piles with:
- Draw pile interaction
- Discard pile display
- Recycle functionality when draw pile is empty
- Visual feedback for interactions

## Mobile Layouts

The MobileLayout stories showcase complete game layouts for:
- Portrait orientation
- Landscape orientation

Use the viewport controls in Storybook to toggle between different screen sizes and orientations.

## Development Guidelines

When developing components:

1. Test in both portrait and landscape orientations
2. Ensure components work well at small screen sizes
3. Use the provided stories to validate UI consistency
4. Pay attention to contrast, spacing, and touch target sizes
5. Follow the Tailwind CSS utility patterns established in the codebase

## Purpose of Storybook

This Storybook setup helps:
- Visualize UI components in isolation
- Test responsive designs across different viewports
- Document component variations and props
- Improve collaboration on design and implementation
- Identify and fix UI issues before deployment