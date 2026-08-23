import { useState, useEffect } from 'react';
import SwipeCard from './components/SwipeCard';
import LoadScreen from './components/LoadScreen';
import LocationChange from './components/LocationChange';
import MessageDialog from './components/MessageDialog';
import { users } from './data/users';
import './App.css';

function App() {
  const [appState, setAppState] = useState('loading'); // loading, location, swiping, match, messaging
  const [currentUsers, setCurrentUsers] = useState(users);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  // Handle app initialization flow
  useEffect(() => {
    if (appState === 'loading') {
      const timer = setTimeout(() => {
        setAppState('location');
      }, 2000); // Show load screen for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleLocationConfirm = () => {
    setAppState('swiping');
  };

  const handleSwipe = (direction, user) => {
    setTimeout(() => {
      setCurrentUsers((prev) => prev.filter((u) => u.id !== user.id));

      // Match with Dede (id 4) when swiping right
      if (direction === 'right' && user.id === 4) {
        setMatchedUser(user);
        setMatches((prev) => [...prev, user]);
        setTimeout(() => {
          setShowMatch(true);
          setAppState('match');
        }, 300);
      }
    }, 300);
  };

  const handleSendMessage = () => {
    setShowMatch(false);
    setAppState('messaging');
  };

  const handleCloseMessage = () => {
    setAppState('swiping');
  };

  const handleButtonSwipe = (direction) => {
    if (currentUsers.length > 0) {
      const topUser = currentUsers[currentUsers.length - 1];
      handleSwipe(direction, topUser);
    }
  };

  // Render different screens based on app state
  if (appState === 'loading') {
    return <LoadScreen />;
  }

  if (appState === 'location') {
    return <LocationChange onConfirm={handleLocationConfirm} />;
  }

  if (appState === 'messaging' && matchedUser) {
    return <MessageDialog user={matchedUser} onClose={handleCloseMessage} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">
        </div>
        <h1 className="logo">zwei</h1>
        <div className="header-icon">
        </div>
      </header>

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
              />
            ))
          )}
        </div>

        {currentUsers.length > 0 && (
          <div className="action-buttons">
            <button
              className="action-btn rewind-btn"
              onClick={() => {}}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#ADADAD" d="M12.5,8c-2.65,0-5.05,0.99-6.9,2.6L2,7v9h9l-3.62-3.62c1.39-1.16,3.16-1.88,5.12-1.88 c3.54,0,6.55,2.31,7.6,5.5l2.37-0.78C21.08,11.03,17.15,8,12.5,8z"/>
              </svg>
            </button>

            <button
              className="action-btn nope-btn"
              onClick={() => handleButtonSwipe('left')}
            >
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#343434" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            <button
              className="action-btn star-btn"
              onClick={() => {}}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#ADADAD" d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/>
              </svg>
            </button>

            <button
              className="action-btn like-btn"
              onClick={() => handleButtonSwipe('right')}
            >
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="#343434" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"/>
              </svg>
            </button>

            <button
              className="action-btn boost-btn"
              onClick={() => {}}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#ADADAD" d="M13,2.05v2.02c3.95,0.49,7,3.85,7,7.93c0,4.08-3.05,7.44-7,7.93v2.02c5.05-0.5,9-4.76,9-9.95 C22,6.81,18.05,2.55,13,2.05z M12,19c-3.87,0-7-3.13-7-7c0-3.87,3.13-7,7-7v3l4-4l-4-4v3c-5.52,0-10,4.48-10,10s4.48,10,10,10 c3.31,0,6.24-1.61,8.06-4.09l-1.48-1.48C17.33,17.97,14.83,19,12,19z"/>
              </svg>
            </button>
          </div>
        )}
      </main>

      {showMatch && matchedUser && (
        <div className="match-overlay">
          <div className="match-content" onClick={(e) => e.stopPropagation()}>
            <h1 className="match-title">It's a Match!</h1>
            <p className="match-subtitle">You and {matchedUser.name} have liked each other</p>
            <div className="match-images">
              <div className="match-image" style={{ backgroundImage: `url(${matchedUser.image})` }} />
            </div>
            <p className="match-prompt">Send a Message?</p>
            <button className="send-message-btn" onClick={handleSendMessage}>
              SEND MESSAGE
            </button>
            <button className="keep-swiping-btn" onClick={() => setShowMatch(false)}>
              KEEP SWIPING
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
