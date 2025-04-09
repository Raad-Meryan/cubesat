import React from 'react';
import './OperationModePanel.css';

function OperationModePanel({ mode = 'Normal' }) {
  const colorMap = {
    Safe: '#f44336', // Red
    Sleep: '#ff9800', // Orange
    Normal: '#4caf50', // Green
    Initial: '#2196f3' // Blue
  };

  const color = colorMap[mode] || '#9e9e9e'; // Default gray

  return (
    <div className="operation-mode-panel">
      <div className="title">Operation Mode</div>
      <div className="mode" style={{ color }}>
        {mode}
      </div>
    </div>
  );
}

export default OperationModePanel;
