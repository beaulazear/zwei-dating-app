import { memo } from 'react';
import './LocationChange.css';

const LocationChange = memo(({ onConfirm }) => {
  return (
    <div className="location-overlay">
      <div className="location-modal">
        <div className="location-icon">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <path
              fill="#fe466f"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
        </div>
        <h2 className="location-title">New Location Detected</h2>
        <p className="location-message">
          Change location to New York, NY?
        </p>
        <div className="location-buttons">
          <button className="location-btn confirm-btn" onClick={onConfirm}>
            Yes, Change Location
          </button>
          <button className="location-btn cancel-btn" onClick={onConfirm}>
            No, Keep Current
          </button>
        </div>
      </div>
    </div>
  );
});

LocationChange.displayName = 'LocationChange';

export default LocationChange;
