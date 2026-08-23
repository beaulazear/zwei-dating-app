# zwei User Flow Documentation

Complete user flow and interaction documentation for the zwei dating app prototype.

## Overview

The app demonstrates a scripted user flow from **Robert's perspective** (male user) interacting with the app, matching with **Dede** (female user), and initiating a conversation.

## Flow Scenes

### Scene 1: App Load Screen (S1)

**Component:** `LoadScreen.jsx`

**Duration:** 2 seconds

**Display:**
- Centered "zwei" logo in BNKossell font
- White background
- Simple fade-in animation

**State Management:**
```javascript
appState: 'loading'
```

**Auto-transition to:** Location Change Screen after 2 seconds

---

### Scene 2: Location Change Modal (S2)

**Component:** `LocationChange.jsx`

**Purpose:** Confirm user's location for matching

**Display:**
- Modal overlay with dark background
- Location pin icon
- Title: "Change Location"
- Message: "New location detected. Change range to New York, New York?"
- Two buttons:
  - "Yes, Change Location"
  - "No, Keep Current"

**User Interaction:**
- Click either button → Proceed to Profile Browsing

**State Management:**
```javascript
appState: 'location'
```

**Transition:**
- User clicks any button → `handleLocationConfirm()`
- Sets `appState: 'swiping'`

---

### Scene 3-5: Profile Browsing - Swipe Left (S3-S5)

**Component:** `SwipeCard.jsx` × 3

**Profiles Shown:**
1. **Jessica, 27** - 4 miles away
2. **Sarah, 25** - 6 miles away
3. **Beau, 25** - 3 miles away

**User Action:** Robert swipes LEFT (reject) on all three profiles

**Swipe Mechanics:**
- Drag card to the left > 100px
- OR click X button
- Card animates off screen (300px left)
- Next card becomes visible

**State Updates:**
```javascript
// Remove user from currentUsers array
setCurrentUsers(prev => prev.filter(u => u.id !== user.id))
```

---

### Scene 6: Profile Browsing - Swipe Right (S6)

**Component:** `SwipeCard.jsx`

**Profile:**
- **Dede, 23** - 10 miles away
- Bio: "2 truths and a lie: I'm double jointed. My cat is in an extremely popular meme. I was bitten by a dolphin in Maui."

**User Action:** Robert swipes RIGHT (like) on Dede

**Swipe Mechanics:**
- Drag card to the right > 100px
- OR click Heart button
- Card animates off screen (300px right)

**Match Logic:**
```javascript
if (direction === 'right' && user.id === 4) {
  setMatchedUser(user);
  setMatches(prev => [...prev, user]);
  setTimeout(() => {
    setShowMatch(true);
    setAppState('match');
  }, 300);
}
```

**State Updates:**
- `matchedUser: Dede`
- `matches: [Dede]`
- `showMatch: true`
- `appState: 'match'`

---

### Scene 7: Match Screen (S7)

**Display:**
- Full-screen dark overlay (#343434)
- Large animated title: "It's a Match!"
- Subtitle: "You and Dede have liked each other"
- Profile image of Dede (200×200px, rounded corners)
- Prompt: "Send a Message?"
- Two buttons:
  - "SEND MESSAGE" (white background)
  - "KEEP SWIPING" (transparent with border)

**Animations:**
- Overlay: fade in (0.3s)
- Title: scale in animation (0.5s)

**User Interaction:**
- Click "SEND MESSAGE" → Open Message Dialog
- Click "KEEP SWIPING" → Close match screen, return to browsing

**State Transition:**
```javascript
// Send Message clicked
handleSendMessage() {
  setShowMatch(false);
  setAppState('messaging');
}

// Keep Swiping clicked
setShowMatch(false);
```

---

### Scene 8-10: Message Dialog (S8-S10)

**Component:** `MessageDialog.jsx`

**Display:**
- Full-screen overlay
- Header:
  - Back button (left)
  - Dede's avatar (40×40px, circular)
  - Name: "Dede"
- Messages container (scrollable)
- Input field at bottom
- Send button (paper plane icon)

**Message Flow:**

#### S8: Robert sends first message
```
Robert: "Hey, Dede! Anything fun going on tonight?"
```
- User types in input field
- Clicks send button
- Message appears in chat (right-aligned, dark background)

#### S9: Dede responds
```
Dede: "Hihihi, yes! House party?"
```
- Response from Dede (left-aligned, white background with border)

#### S10: Robert replies
```
Robert: "Great! What's the Address?"
```
- User types and sends second message

**Message Styling:**
```css
/* Sent (Robert) */
background: #343434;
color: white;
border-bottom-right-radius: 4px;  /* Chat tail */

/* Received (Dede) */
background: white;
color: #333;
border: 1px solid #e0e0e0;
border-bottom-left-radius: 4px;
```

**State Management:**
```javascript
const [messages, setMessages] = useState([]);
const [inputText, setInputText] = useState('');

// Add message
setMessages([...messages, {
  text: inputText,
  sender: 'user',
  timestamp: new Date()
}]);
```

**User Interactions:**
- Type message → Input field updates
- Click Send OR press Enter → Message sent
- Click Back button → Return to swiping view (`setAppState('swiping')`)

---

## State Management

### App States

```javascript
const [appState, setAppState] = useState('loading');
```

**Possible Values:**
- `'loading'` - Load screen
- `'location'` - Location change modal
- `'swiping'` - Profile browsing
- `'match'` - Match celebration screen
- `'messaging'` - Chat interface

### User Data Structure

```javascript
{
  id: 4,
  name: 'Dede',
  age: 23,
  image: dedeImage,
  distance: 10,
  truthsAndLie: {
    header: '2 truths and a lie:',
    text: 'I\'m double jointed. My cat is in an extremely popular meme. I was bitten by a dolphin in Maui.'
  }
}
```

### Match State

```javascript
const [currentUsers, setCurrentUsers] = useState(users);
const [matches, setMatches] = useState([]);
const [showMatch, setShowMatch] = useState(false);
const [matchedUser, setMatchedUser] = useState(null);
```

## Swipe Interaction Details

### Drag to Swipe

**Framer Motion Configuration:**
```javascript
drag={isTop ? 'x' : false}
dragConstraints={{ left: 0, right: 0 }}
onDragEnd={handleDragEnd}
```

**Swipe Detection:**
```javascript
const handleDragEnd = (event, info) => {
  if (Math.abs(info.offset.x) > 100) {
    setExitX(info.offset.x > 0 ? 300 : -300);
    onSwipe(info.offset.x > 0 ? 'right' : 'left', user);
  }
};
```

**Threshold:** 100px horizontal movement

**Exit Animation:** Card moves 300px in swipe direction

### Button Swipe

**Implementation:**
```javascript
const handleButtonSwipe = (direction) => {
  if (currentUsers.length > 0) {
    const topUser = currentUsers[currentUsers.length - 1];
    handleSwipe(direction, topUser);
  }
};
```

**Buttons:**
- X button: `onClick={() => handleButtonSwipe('left')}`
- Heart button: `onClick={() => handleButtonSwipe('right')}`

## Animation Timeline

```
0ms     → Load screen appears (fade in)
2000ms  → Location modal appears (slide up)
User action → Modal closes, cards appear
User swipes → Card exits (300ms spring animation)
Match detected → 300ms delay → Match screen (fade in + scale)
User clicks → Message dialog (slide in from right, 300ms)
```

## Card Stack Behavior

**Z-Index Management:**
```javascript
isTop={index === currentUsers.length - 1}
```

- Only the top card is draggable
- Cards below are visible but not interactive
- Each swipe removes the top card from the stack

**Visual Layering:**
- Latest card appears on top
- Previous cards stack underneath
- Removed cards exit the viewport

## Navigation Flow

```
LoadScreen
    ↓ (2s auto)
LocationChange
    ↓ (user clicks)
SwipeCard Stack
    ↓ (swipe right on Dede)
Match Screen
    ↓ (click "Send Message")
Message Dialog
    ↓ (click back)
SwipeCard Stack
```

## Edge Cases

### No More Cards
```javascript
{currentUsers.length === 0 ? (
  <div className="no-more-cards">
    <h2>No more profiles nearby</h2>
    <p>Check back later for new people!</p>
  </div>
) : (
  // Render cards
)}
```

### Message Input
- Send button disabled when input is empty
- Enter key sends message (no Shift+Enter multiline)
- Input clears after sending

### Back Navigation
- From Message Dialog → Returns to swipe view
- Match screen dismissed → Returns to swipe view
- Keep Swiping → Closes match overlay

## Mobile Considerations

### Touch Events
- Tap highlight disabled (`-webkit-tap-highlight-color: transparent`)
- No zoom (`user-scalable=no`)
- Full viewport coverage (`viewport-fit=cover`)

### Safe Areas
- Action buttons respect iOS home indicator
- Message input above keyboard
- Top padding for status bar/notch

### Gesture Prevention
- Prevents bounce scrolling
- Disables pull-to-refresh
- Blocks horizontal page swipes (except on cards)

---

## User Flow Diagram

```
┌─────────────┐
│ Load Screen │ (2s)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Location   │ (User confirms)
│   Change    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Jessica   │ ◄─┐
│   Swipe ←   │   │
└──────┬──────┘   │
       │          │
       ▼          │
┌─────────────┐   │ Swipe Left
│    Sarah    │   │ (3 times)
│   Swipe ←   │   │
└──────┬──────┘   │
       │          │
       ▼          │
┌─────────────┐   │
│    Beau     │   │
│   Swipe ←   │ ──┘
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Dede     │ Swipe Right →
│   Swipe →   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  It's a     │
│   Match!    │
└──────┬──────┘
       │ "Send Message"
       ▼
┌─────────────┐
│  Message    │ ┌──────────────────┐
│  Dialog     │ │ Robert: Hey...   │
│             │ │ Dede: Hihihi...  │
│             │ │ Robert: Great!   │
└─────────────┘ └──────────────────┘
```

---

**Last Updated:** 2026-08-23
