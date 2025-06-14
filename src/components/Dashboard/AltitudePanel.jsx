import React, { useEffect, useState } from 'react';
import './AltitudePanel.css';

// Constants outside the component
const START_ALTITUDE = 600; // km
const DECAY_PER_DAY = 0.0806972240154939; // km/day
const START_DATE = new Date('2025-03-01T00:00:00Z');

function AltitudePanel() {
  const [altitude, setAltitude] = useState(START_ALTITUDE);

  useEffect(() => {
    const updateAltitude = () => {
      const now = new Date();
      const msDiff = now.getTime() - START_DATE.getTime();
      const daysPassed = msDiff / (1000 * 60 * 60 * 24); // convert ms to days
      const currentAltitude = START_ALTITUDE - (DECAY_PER_DAY * daysPassed);
      setAltitude(currentAltitude.toFixed(2));
    };

    updateAltitude();
    const interval = setInterval(updateAltitude, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []); // ✅ now safe and clean

  return (
    <div className="altitude-panel">
      <div className="altitude-value">{Number(altitude).toLocaleString()} km</div>
    </div>
  );
}

export default AltitudePanel;
