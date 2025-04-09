import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function MemoryPanel({ usedGB = 20, totalGB = 64 }) {
  const percentage = (usedGB / totalGB) * 100;

  return (
    <div style={{ width: 250, background: '#1e1e1e', padding: 35, borderRadius: 4, color: 'white' }}>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor:
            percentage > 80 ? '#d44a3a' :
            percentage > 60 ? 'rgba(237, 129, 40, 0.89)' :
            '#299c46',
          trailColor: '#444',
          textColor: '#fff'
        })}
      >
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
          {usedGB} GB
        </div>
        <div style={{ fontSize: 12 }}>
          of {totalGB} GB
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
export default MemoryPanel;
