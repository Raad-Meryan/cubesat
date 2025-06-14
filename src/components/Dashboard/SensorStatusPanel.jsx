import './SensorStatusPanel.css';

const dummySensorData = {
  GPS: true,
  OBC: true,
  TEMP: true,
  IMU: true,
  INA: true,
  'Power Gen': false,
  'Photo Diode': false,
  'Cell TEMP': false,
  MTQ: false,
  'On-Board Camera': true,
  'Earth Sensor': true
  
};

function SensorStatusPanel() {
  return (
    <div className="sensor-panel">
      <ul className="sensor-list">
        {Object.entries(dummySensorData).map(([sensor, isOn]) => (
          <li key={sensor}>
            <span className={`indicator ${isOn ? 'on' : 'off'}`}></span>
            {sensor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SensorStatusPanel;