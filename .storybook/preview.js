import '../src/index.css'; // Import your Tailwind CSS

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Add background options
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f8f9fa',
        },
        {
          name: 'dark',
          value: '#343a40',
        },
        {
          name: 'game-bg',
          value: 'rgba(255, 255, 255, 0.5)', // Similar to the game's background
        },
      ],
    },
    // Add viewport presets for mobile testing
    viewport: {
      viewports: {
        mobilePortrait: {
          name: 'Mobile Portrait',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobileLandscape: {
          name: 'Mobile Landscape',
          styles: {
            width: '568px',
            height: '320px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
};

export default preview;