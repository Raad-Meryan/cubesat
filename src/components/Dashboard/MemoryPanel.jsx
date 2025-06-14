import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './MemoryPanel.css';

function MemoryPanel({ usedGB = 20, totalGB = 64 }) {
  const pct = (usedGB / totalGB) * 100;

  return (
    <div className="memory-gauge-panel">
      {/* NEW wrapper limits size */}
      <div className="gauge-wrapper">
        <CircularProgressbarWithChildren
          value={pct}
          styles={buildStyles({
            pathColor:
              pct > 80 ? '#d44a3a' :
              pct > 60 ? 'rgba(237,129,40,.89)' :
              '#299c46',
            trailColor:'#444',
            textColor :'#fff'
          })}
        >
          <div style={{ fontSize:18, fontWeight:'bold' }}>
            {usedGB.toFixed(2)} GB
          </div>
          <div style={{ fontSize:12 }}>
            of {totalGB.toFixed(2)} GB
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default MemoryPanel;
