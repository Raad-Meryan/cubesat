import React from 'react';
import './OrientationPanel.css';

function OrientationPanel({ orientation = [0, 0, 0] }) {
  const [heading, roll, pitch] = orientation || [];

  return (
    <div className="orientation-panel">
      <h4>Orientation (Euler)</h4>
      <p>Yaw: {heading?.toFixed(2)}°</p>
      <p>Roll: {roll?.toFixed(2)}°</p>
      <p>Pitch: {pitch?.toFixed(2)}°</p>
    </div>
  );
}

export default OrientationPanel;
