# zwei Design System

Complete design system and theme documentation for the zwei dating app.

## Brand Identity

**Name:** zwei (German for "two")

**Concept:** Minimalist, modern dating app focused on meaningful connections

## Color Palette

### Primary Colors

```css
/* Base Colors */
--white: #FFFFFF;           /* Background, cards */
--jet-black: #343434;       /* Primary text, buttons */
--grey-accent: #ADADAD;     /* Secondary text, disabled states */
```

### Accent Colors

```css
/* Interactive Elements */
--action-red: #ff4458;      /* Like button, matched state */
--action-red-hover: #ff5566;

/* Overlays & Gradients */
--overlay-dark: rgba(30, 30, 30, 0.8);    /* Button container */
--overlay-gradient: rgba(0, 0, 0, 0.4);   /* Card gradient */
```

### Semantic Colors

```css
/* Success/Match */
--match-bg: #343434;        /* Match overlay background */

/* Backgrounds */
--app-bg: #FFFFFF;
--card-bg: #FFFFFF;
```

## Typography

### Font Family

**Primary Font:** BNKossell (Custom OTF)
- Used for: App logo, branding elements
- Path: `src/assets/BNKossell.otf`

**System Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes

```css
/* Headers */
--heading-xl: 64px;         /* Load screen logo */
--heading-lg: 36px;         /* Profile name & age */
--heading-md: 28px;         /* Section headers */
--heading-sm: 24px;         /* Modal titles */

/* Body Text */
--body-lg: 18px;            /* Subtitles */
--body-md: 16px;            /* Standard body */
--body-sm: 15px;            /* Profile bio, messages */
--body-xs: 14px;            /* Distance, small text */

/* Match Screen */
--match-title: 72px;        /* "It's a Match!" */
```

### Font Weights

```css
--font-light: 400;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;      /* Match screen only */
```

## Spacing System

### Base Unit: 4px

```css
/* Spacing Scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-20: 80px;
--space-30: 120px;
--space-45: 180px;          /* Card info bottom padding */
```

### Component Spacing

```css
/* Card Info */
padding: 0 24px 180px 24px;  /* Desktop */
padding: 0 20px 160px 20px;  /* Mobile */

/* Action Buttons Container */
padding: 12px 24px;          /* Desktop */
padding: 10px 20px;          /* Mobile */

/* Gaps */
gap: 24px;                   /* Large gaps */
gap: 20px;                   /* Medium gaps */
gap: 12px;                   /* Small gaps */
```

## Layout & Grid

### Viewport

```css
/* Full viewport coverage */
height: 100vh;
height: 100dvh;              /* Dynamic viewport for mobile */

/* Safe areas (iOS) */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

### Container Widths

```css
--container-sm: 400px;       /* Card width */
--container-md: 500px;       /* Main content max-width */
--container-lg: 600px;       /* Message dialog max-width */
```

## Components

### Profile Cards

```css
/* Dimensions */
width: 100%;
height: 100%;

/* Image Gradient */
gradient: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
height: 45%;                 /* Gradient coverage */

/* Text Shadows */
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);  /* Name/age */
text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);  /* Bio text */
```

### Action Buttons

```css
/* Container */
background: rgba(30, 30, 30, 0.8);
backdrop-filter: blur(10px);
border-radius: 50px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

/* Nope Button (X) */
width: 52px;                 /* Desktop */
width: 48px;                 /* Mobile */
background: rgba(255, 255, 255, 0.95);
color: #ff4458;

/* Like Button (Heart) */
width: 52px;                 /* Desktop */
width: 48px;                 /* Mobile */
background: #ff4458;
color: white;

/* Icon Sizes */
icon: 26px × 26px;
```

### Match Screen

```css
background: #343434;         /* Dark overlay */

/* Title Animation */
@keyframes scaleIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Profile Image */
width: 200px;
height: 200px;
border-radius: 20px;
border: 5px solid white;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
```

### Message Dialog

```css
/* Message Bubbles - Sent */
background: #343434;
color: white;
border-bottom-right-radius: 4px;   /* Tail effect */

/* Message Bubbles - Received */
background: white;
color: #333;
border: 1px solid #e0e0e0;
border-bottom-left-radius: 4px;

/* Avatar Border */
border: 2px solid #343434;
```

## Animations & Transitions

### Standard Transitions

```css
/* Default */
transition: all 0.2s;

/* Micro-interactions */
transition: transform 0.2s;
transition: background 0.2s;
```

### Hover States

```css
/* Buttons */
transform: scale(1.08);      /* Subtle grow */
transform: translateY(-2px); /* Lift effect */

/* Active States */
transform: scale(0.95);      /* Press effect */
transform: translateY(0);    /* Reset */
```

### Card Swipe Animation

```css
/* Framer Motion Spring */
type: 'spring';
stiffness: 300;
damping: 20;

/* Rotation on drag */
rotate: transform(x, [-200, 200], [-25, 25]);

/* Opacity on drag */
opacity: transform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
```

### Screen Transitions

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 0.3s ease-in;

/* Slide Up */
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In Right */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

## Shadows

```css
/* Cards */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

/* Buttons */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);  /* Container */

/* Match Image */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

/* Text Shadows */
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);  /* Headers */
text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);  /* Body text */
```

## Border Radius

```css
/* Buttons */
border-radius: 50%;          /* Circular buttons */
border-radius: 50px;         /* Pill buttons */

/* Cards & Images */
border-radius: 20px;         /* Standard cards */
border-radius: 22.37%;       /* iOS icon style */

/* Modals */
border-radius: 20px;

/* Input Fields */
border-radius: 24px;

/* Message Bubbles */
border-radius: 20px;
border-bottom-right-radius: 4px;  /* Sent */
border-bottom-left-radius: 4px;   /* Received */
```

## Icons & Images

### App Icons

```
apple-touch-icon.png         180×180px (PNG)
favicon.svg                  512×512px (SVG)
```

**Design:**
- Background: Black (#000000)
- Letter: White "z" in BNKossell font
- Centered vertically and horizontally

### Profile Images

**Format:** JPG
**Aspect Ratio:** 305:223 (approx. 4:3)
**Display:** Cover, centered
**Quality:** 95% JPEG

## Mobile Optimization

### Touch Targets

```css
/* Minimum touch target */
min-width: 48px;
min-height: 48px;

/* Recommended */
width: 52px;
height: 52px;
```

### Tap Highlight

```css
-webkit-tap-highlight-color: transparent;
```

### Scroll Behavior

```css
overflow: hidden;            /* Prevent bounce */
-webkit-overflow-scrolling: touch;
touch-action: pan-y;
```

### Viewport Meta Tag

```html
<meta name="viewport"
      content="width=device-width,
               initial-scale=1.0,
               maximum-scale=1.0,
               user-scalable=no,
               viewport-fit=cover" />
```

## Breakpoints

```css
/* Mobile First */
@media (max-width: 480px) {
  /* Mobile-specific styles */
}

/* Tablet and up */
@media (min-width: 481px) {
  /* Larger screen styles */
}
```

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- White on Black: 21:1 (AAA)
- White on #343434: 12.63:1 (AAA)
- Grey (#ADADAD) on White: 2.85:1 (AA Large Text)

### Focus States

```css
/* Keyboard navigation */
outline: 2px solid #ff4458;
outline-offset: 2px;
```

### Font Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

## Performance

### Will-change

```css
/* Card animations */
will-change: transform;
```

### GPU Acceleration

```css
/* Smooth animations */
transform: translate3d(0, 0, 0);
backface-visibility: hidden;
```

---

**Last Updated:** 2026-08-23
