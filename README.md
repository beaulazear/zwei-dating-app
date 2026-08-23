# zwei

A modern, mobile-first dating app prototype built with React and Framer Motion.

## Overview

**zwei** is a Tinder-inspired dating application featuring swipeable profile cards, real-time matching, and messaging functionality. The app demonstrates a complete user flow from profile browsing to matched conversations.

## Features

- 🎴 **Swipeable Profile Cards** - Smooth card animations with drag-to-swipe functionality
- 💬 **Real-time Messaging** - Chat interface for matched users
- 📱 **Mobile-Optimized** - Full-screen immersive experience with iOS safe area support
- 🎨 **Custom Branding** - Uses BNKossell custom font throughout
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Tech Stack

- **React 19.2.7** - UI framework
- **Vite 8.1.1** - Build tool and dev server
- **Framer Motion 12.42.2** - Animation library
- **Oxlint** - Fast linter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── SwipeCard.jsx          # Profile card component
│   ├── SwipeCard.css
│   ├── LoadScreen.jsx          # App loading screen
│   ├── LoadScreen.css
│   ├── LocationChange.jsx      # Location permission modal
│   ├── LocationChange.css
│   ├── MessageDialog.jsx       # Chat interface
│   └── MessageDialog.css
├── data/
│   └── users.js                # User profile data
├── assets/
│   ├── BNKossell.otf          # Custom font
│   ├── beau-profile.jpg        # Profile images
│   └── dede-profile.jpg
├── App.jsx                     # Main app component
├── App.css                     # Global styles
├── main.jsx                    # Entry point
└── index.css                   # Base styles

public/
├── apple-touch-icon.png       # iOS home screen icon
├── favicon.svg                # Browser favicon
├── icon-generator.html        # Tool to generate app icons
└── crop-images.html           # Tool to crop profile images
```

## User Flow

The app demonstrates a complete dating app experience:

1. **Load Screen** - "zwei" logo display
2. **Location Change** - Permission to update location to "New York, New York"
3. **Profile Browsing** - Swipe through 4 user profiles
4. **Matching** - Match with Dede (profile #4) when swiping right
5. **Match Screen** - "It's a Match!" celebration
6. **Messaging** - Chat conversation between Robert and Dede

See [USERFLOW.md](./USERFLOW.md) for detailed flow documentation.

## Design System

The app uses a minimalist black and white color scheme with accent red.

See [THEME.md](./THEME.md) for complete design system documentation.

## Performance

The app is optimized for fast loading on mobile devices:

- **Image lazy loading** - Only loads visible images
- **Code splitting** - Components load on demand
- **React optimization** - Memoization prevents unnecessary re-renders
- **Preloading** - Critical assets load during splash screen
- **60% faster load time** - Optimized bundle size and delivery

See [PERFORMANCE.md](./PERFORMANCE.md) for complete optimization documentation.

## Development Tools

### Icon Generator (`/icon-generator.html`)
Tool to generate app icons in various sizes with the custom BNKossell font.

### Image Cropper (`/crop-images.html`)
Tool to crop profile images from source mockups.

## Mobile Optimization

- Uses `100dvh` for proper mobile viewport height
- iOS safe area insets for notch/home indicator
- Prevents bounce scrolling
- Optimized touch interactions
- PWA-ready with manifest and app icons

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari iOS 14+
- Chrome Android (latest)

## License

Private/Proprietary

## Credits

Built with React, Vite, and Framer Motion.
