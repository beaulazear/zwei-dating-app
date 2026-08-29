import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, memo, useEffect } from 'react';
import './SwipeCard.css';

const SwipeCard = memo(({ user, onSwipe, isTop, index, totalCards, buttonSwipeDirection }) => {
  const [exitX, setExitX] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);

  // Overlay opacities based on swipe direction
  const nopeOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const likeOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  // Calculate card position in stack (0 = top, 1 = second, etc)
  const stackPosition = totalCards - 1 - index;

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';

      // Check if this is a match (Dede + right swipe)
      const isMatch = direction === 'right' && user.id === 4;

      // Only animate the card away if it's not a match
      if (!isMatch) {
        setExitX(info.offset.x > 0 ? 300 : -300);
      }

      onSwipe(direction, user);
    }
  };

  // Handle button-triggered swipes
  useEffect(() => {
    if (buttonSwipeDirection && isTop) {
      // Check if this is a match
      const isMatch = buttonSwipeDirection === 'right' && user.id === 4;

      // Only animate if not a match
      if (!isMatch) {
        setExitX(buttonSwipeDirection === 'right' ? 300 : -300);
      }
    }
  }, [buttonSwipeDirection, isTop, user.id]);

  return (
    <motion.div
      className="swipe-card"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        cursor: isTop ? 'grab' : 'default',
        zIndex: index,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitX !== 0
          ? {
              x: exitX,
              opacity: 0,
              rotate: exitX > 0 ? 20 : -20
            }
          : {
              scale: isTop ? 1 : 0.95 - (stackPosition * 0.02),
              y: isTop ? 0 : stackPosition * 8,
              rotate: 0,
              opacity: 1
            }
      }
      transition={
        isTop
          ? {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.2 }
            }
          : {
              duration: 0
            }
      }
      whileDrag={{ cursor: 'grabbing' }}
    >
      <div className="card-image">
        {/* Lazy load image */}
        <img
          src={user.image}
          alt={`${user.name}, ${user.age}`}
          className="card-image-element"
          loading={isTop ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        {!imageLoaded && <div className="card-image-placeholder" />}

        {/* Swipe overlays */}
        {isTop && (
          <>
            <motion.div className="swipe-overlay nope-overlay" style={{ opacity: nopeOpacity }}>
              <svg viewBox="0 0 24 24" width="80" height="80">
                <path
                  fill="#ff4458"
                  stroke="#ffffff"
                  strokeWidth="2"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </motion.div>

            <motion.div className="swipe-overlay like-overlay" style={{ opacity: likeOpacity }}>
              <svg viewBox="0 0 24 24" width="80" height="80">
                <path
                  fill="#00d977"
                  stroke="#ffffff"
                  strokeWidth="2"
                  d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"
                />
              </svg>
            </motion.div>
          </>
        )}

        <div className="card-gradient" />
        <div className="card-info">
          <h2>
            {user.name} <span className="age">{user.age}</span>
          </h2>
          <p className="distance">
            <svg viewBox="0 0 24 24" width="14" height="14" className="location-pin">
              <path
                fill="white"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            {user.distance} miles away
          </p>
        </div>
      </div>
    </motion.div>
  );
});

SwipeCard.displayName = 'SwipeCard';

export default SwipeCard;
