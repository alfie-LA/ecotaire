# 🌱 Eco-Solitaire

An ecological-themed solitaire card game that combines classic solitaire mechanics with environmental education. Players restore eco-zones by sorting animal cards in order of conservation status.

![Eco-Solitaire Game](public/assets/images/eco-bg.png)

## 🎮 Game Overview

Eco-Solitaire is a unique take on the classic solitaire game, where players sort animal species into five eco-zones by their conservation status.

### Game Mechanics

- **Objective:** Complete all 5 eco-zones by arranging cards in ascending order (1-10) by conservation status
- **Card System:** 50 cards across 5 animal classes (Mammals, Birds, Fish, Amphibians, Reptiles)
- **Conservation Ranking:** Cards ranked 1 (Least Concern) to 10 (Critically Endangered)
- **Gameplay:** Similar to solitaire, with specialized ecological rules for card placement

### Key Features

- 📱 Responsive design optimized for mobile and desktop
- 🔄 Landscape and portrait mode support with specialized layouts
- 🎯 Auto-suggestion for valid card moves
- 📊 Score tracking and high score system
- 📘 Interactive tutorial
- 🎨 Custom animal icons and visual effects

## 💻 Development Environment

### Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS
- **Build System:** Vite
- **Drag and Drop:** React DnD
- **Version Control:** Git/GitHub
- **Deployment:** Vercel

### Project Structure

```
ecotaire/
├── public/                # Static assets
│   └── assets/
│       ├── animations/    # Animation sprites
│       ├── icons/         # Animal class icons
│       └── images/        # Background images
├── src/
│   ├── components/        # React components
│   │   ├── Card.jsx       # Card component
│   │   ├── Column.jsx     # Game column component
│   │   ├── Deck.jsx       # Draw and discard pile
│   │   └── EcoZone.jsx    # Ecological zone component
│   ├── utils/
│   │   └── gameUtils.js   # Game logic functions
│   ├── App.jsx            # Main game application
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

### Development Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

### Running Locally

```bash
# Clone the repository
git clone https://github.com/alfie-LA/ecotaire.git
cd ecotaire

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔨 Development Strategy

### Design Principles

1. **Mobile-First:** Designed primarily for mobile devices with adaptations for desktop
2. **Responsive Layout:** Dynamically adjusts based on screen orientation and size
3. **Accessibility:** High contrast colors and clear visual feedback
4. **Performance:** Optimized for smooth gameplay on lower-end mobile devices

### Mobile UI Optimization

The mobile UI was developed with specific pixel-perfect requirements:

- **Cards:** 60px × 40px (width × height)
- **Columns:** 55px × 190px
- **EcoZones:** 55px × 140px
- **Card Stacking:** -32px overlap
- **Fixed Sections:**
  - Score section: 40px height
  - Draw/Discard pile: 50px height
  - Columns section: 200px height
  - EcoZones section: 150px height
  - Controls section: 50px height

This required a multi-layered CSS approach:

1. **CSS Variables:** Used for consistent dimensions
2. **Inline Styles:** Direct styling for critical layout properties
3. **CSS Overrides:** High-specificity selectors with !important flags
4. **Runtime Injection:** Dynamic style injection for critical CSS

### UI Challenges and Solutions

1. **Card Orientation:** Ensured cards display as horizontal rectangles (wider than tall)
   - Solution: Used a combination of fixed dimensions, !important flags, and inline styles

2. **Layout Flexibility:** Balanced fixed dimensions with responsive behavior
   - Solution: Created specialized layouts for portrait and landscape orientations

3. **Visual Hierarchy:** Maintained focus on gameplay elements
   - Solution: Used background opacity and shadows to separate UI layers

4. **Background Integration:** Positioned game elements to complement background art
   - Solution: Positioned the game panel at 20vh to align with the character artwork

### Testing Methodology

1. **DOM Inspection:** Used DOM information to verify exact pixel dimensions
2. **Screenshot Analysis:** Captured and compared screenshots before/after changes
3. **Cross-Device Testing:** Verified on multiple device sizes and orientations
4. **Performance Monitoring:** Ensured smooth animations and transitions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Animal icons created by [Icon Designer Name]
- Background artwork by [Artist Name]
- Inspired by classic solitaire games and ecological education