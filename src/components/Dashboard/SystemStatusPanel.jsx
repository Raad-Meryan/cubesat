import './SensorStatusPanel.css';

const dummySensorData = {
  CDHS: true,
  COMM: true,
  EPS: true,
  ADCS: true,
  Payload: true,
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