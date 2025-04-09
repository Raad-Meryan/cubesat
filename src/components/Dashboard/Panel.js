// src/components/Dashboard/Panel.js
import React from 'react';
import './Panel.css';

function Panel({ title, children }) {
  return (
    <div className="panel">
      {title && <div className="panel-title">{title}</div>}
      <div className="panel-content">{children}</div>
    </div>
  );
}

export default Panel;
