import { useState, useEffect, lazy, Suspense } from 'react';
import SwipeCard from './components/SwipeCard';
import LoadScreen from './components/LoadScreen';
import { users } from './data/users';
import { preloadFirstCard } from './utils/preloadImages';
import robertImage from './assets/beau-profile.jpg'; // Using Beau's image for Robert
import './App.css';

// Lazy load components not needed immediately
const LocationChange = lazy(() => import('./components/LocationChange'));
const MessageDialog = lazy(() => import('./components/MessageDialog'));

// Robert user object for Dede's POV
const robertUser = {
  id: 999,
  name: 'Robert',
  age: 28,
  image: robertImage,
  distance: 3
};

function App() {
  const [appState, setAppState] = useState('loading'); // loading, location, swiping, match, messaging
  const [currentUsers, setCurrentUsers] = useState(users);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [buttonSwipeDirection, setButtonSwipeDirection] = useState(null);
  const [dedePOV, setDedePOV] = useState(false);


  // Handle app initialization flow
  useEffect(() => {
    if (appState === 'loading') {
      // Preload first card image while showing load screen
      preloadFirstCard(users);

      const timer = setTimeout(() => {
        setAppState('location');
      }, 2000); // Show load screen for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleLocationConfirm = () => {
    setAppState('swiping');
  };

  const handleLocationDecline = () => {
    // Secret: trigger Dede's POV
    setDedePOV(true);
    setMatchedUser(robertUser);
    setAppState('messaging');
  };

  const handleSwipe = (direction, user) => {
    // Match with Dede (id 4) when swiping right
    if (direction === 'right' && user.id === 4) {
      // Don't remove the card yet - show match popup first
      setMatchedUser(user);
      setMatches((prev) => [...prev, user]);
      setShowMatch(true);
      setAppState('match');
    } else {
      // For non-matches, remove the card normally
      setTimeout(() => {
        setCurrentUsers((prev) => prev.filter((u) => u.id !== user.id));
      }, 300);
    }
  };

  const handleSendMessage = () => {
    setShowMatch(false);
    // Remove Dede's card now
    setCurrentUsers((prev) => prev.filter((u) => u.id !== matchedUser.id));
    setAppState('messaging');
  };

  const handleCloseMessage = () => {
    setAppState('swiping');
  };

  const handleButtonSwipe = (direction) => {
    if (currentUsers.length > 0) {
      const topUser = currentUsers[currentUsers.length - 1];
      setButtonSwipeDirection(direction);
      // Reset after a brief moment to allow next swipe
      setTimeout(() => setButtonSwipeDirection(null), 100);
      handleSwipe(direction, topUser);
    }
  };

  // Render different screens based on app state
  if (appState === 'loading') {
    return <LoadScreen />;
  }

  if (appState === 'messaging' && matchedUser) {
    return (
      <Suspense fallback={<LoadScreen />}>
        <MessageDialog user={matchedUser} onClose={handleCloseMessage} dedePOV={dedePOV} />
      </Suspense>
    );
  }

  return (
    <div className={`app ${appState === 'location' || appState === 'match' ? 'app-dimmed' : ''}`}>
      <main className="main-content">
        <div className="card-container">
          {currentUsers.length === 0 ? (
            <div className="no-more-cards">
              <h2>No more profiles nearby</h2>
              <p>Check back later for new people!</p>
            </div>
          ) : (
            currentUsers.map((user, index) => (
              <SwipeCard
                key={user.id}
                user={user}
                onSwipe={handleSwipe}
                isTop={index === currentUsers.length - 1}
                index={index}
                totalCards={currentUsers.length}
                buttonSwipeDirection={index === currentUsers.length - 1 ? buttonSwipeDirection : null}
              />
            ))
          )}
        </div>

        {currentUsers.length > 0 && (
          <div className="action-buttons">
            <button
              className="action-btn nope-btn"
              onClick={() => handleButtonSwipe('left')}
            >
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            <button
              className="action-btn like-btn"
              onClick={() => handleButtonSwipe('right')}
            >
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path fill="currentColor" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
              </svg>
            </button>
          </div>
        )}
      </main>

      {showMatch && matchedUser && (
        <div className="match-overlay">
          <div className="match-modal" onClick={(e) => e.stopPropagation()}>
            <div className="match-icon">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
              </svg>
            </div>
            <h2 className="match-title">It's a Match!</h2>
            <p className="match-message">
              Send a Message?
            </p>
            <div className="match-buttons">
              <button className="match-btn send-btn" onClick={handleSendMessage}>
                Send
              </button>
              <button className="match-btn not-now-btn" onClick={() => {
                setShowMatch(false);
                setAppState('swiping');
                // Remove Dede's card now
                setCurrentUsers((prev) => prev.filter((u) => u.id !== matchedUser.id));
              }}>
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {appState === 'location' && (
        <Suspense fallback={null}>
          <LocationChange onConfirm={handleLocationConfirm} onDecline={handleLocationDecline} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
