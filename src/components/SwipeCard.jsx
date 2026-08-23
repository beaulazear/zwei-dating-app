import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import './SwipeCard.css';

const SwipeCard = ({ user, onSwipe, isTop }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 300 : -300);
      onSwipe(info.offset.x > 0 ? 'right' : 'left', user);
    }
  };

  return (
    <motion.div
      className="swipe-card"
      style={{
        x,
        rotate,
        opacity,
        cursor: isTop ? 'grab' : 'default',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <div className="card-image" style={{ backgroundImage: `url(${user.image})` }} />
      <div className="card-info">
        <div className="card-header">
          <h2>
            {user.name} <span className="age">{user.age}</span>
          </h2>
          <p className="distance">
            <svg viewBox="0 0 24 24" width="14" height="14" className="location-pin">
              <path
                fill="#666"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            {user.distance} miles away
          </p>
        </div>
        {user.truthsAndLie && (
          <div className="truths-section">
            <p className="truths-header">{user.truthsAndLie.header}</p>
            <p className="truths-text">{user.truthsAndLie.text}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SwipeCard;
