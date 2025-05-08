import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import Panel from './Panel';
import MissionLogo from './MissionLogo';
import DateTimeDisplay from './DateTimeDisplay';
import UptimeChart from './UptimeChart';
import SensorStatusPanel from './SensorStatusPanel';
import OperationModePanel from './OperationModePanel';
import AltitudePanel from './AltitudePanel';
import MemoryPanel from './MemoryPanel';
import IMUDataPanel from './IMUDataPanel';
import BatteryVoltageGraph from './BatteryVoltageGraph';
import BatteryCurrentGraph from './BatteryCurrentGraph';
import StateOfChargeMeter from './StateOfChargeMeter';
import SolarPanelPowerGraph from './SolarPanelPowerGraph';
import EnvironmentPanel from './EnvironmentPanel';
import OrientationPanel from './OrientationPanel';
import OrientationVisualizer from './OrientationVisualizer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function DashboardLayout() {
  const layout = [
    { i: 'logo', x: 0, y: 0, w: 2, h: 3 },
    { i: 'time', x: 2, y: 0, w: 2, h: 3 },
    { i: 'altitude', x: 4, y: 0, w: 2, h: 3 },
    { i: 'opMode', x: 6, y: 0, w: 2, h: 3 },
    { i: 'sensorStatus', x: 8, y: 0, w: 2, h: 4 },
    { i: 'memory', x: 0, y: 4, w: 3, h: 5.5 },
    { i: 'uptime', x: 3, y: 4, w: 7, h: 6 },
    { i: 'imu', x: 0, y: 9, w: 2.5, h: 4 },
    { i: 'batteryVoltage', x: 2, y: 9, w: 3, h: 4 },
    { i: 'batteryCurrent', x: 5, y: 9, w: 3, h: 4 },
    { i: 'socMeter', x: 8, y: 9, w: 3, h: 4 },
    { i: 'solarPower', x: 0, y: 13, w: 12, h: 10 },
    { i: 'environment', x: 10, y: 0, w: 2, h: 3 },
    { i: 'orientation', x: 10, y: 3, w: 2, h: 3 },
    { i: 'orientation3d', x: 10, y: 6, w: 2, h: 4 }

    
  ];

  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://raspberrypi.local:5000/sensors')
        .then(res => res.json())
        .then(data => {
          console.log("Live sensorData:", data);  // ✅ <--- Put it here
          setSensorData(data);
        })
        .catch(err => console.error(err));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="dashboard" style={{ backgroundColor: '#010101', minHeight: '100vh', padding: '20px' }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={60}
        width={1400}
        isDraggable={true}
        isResizable={true}
      >
        <div key="logo"><Panel><MissionLogo /></Panel></div>
        <div key="time"><Panel title="Current Time"><DateTimeDisplay /></Panel></div>
        <div key="altitude"><Panel title="Altitude"><AltitudePanel /></Panel></div>
        <div key="opMode"><Panel><OperationModePanel mode="Normal" /></Panel></div>
        <div key="sensorStatus"><Panel title="Sensor Status"><SensorStatusPanel /></Panel></div>
        <div key="memory"><Panel title="Memory Storage"><MemoryPanel /></Panel></div>
        <div key="uptime"><Panel title="Subsystem Uptime"><UptimeChart /></Panel></div>
        <div key="imu">
          <Panel title="IMU Sensor Data">
          <IMUDataPanel
            gyro={sensorData.gyroscope}
            accel={sensorData.acceleration}
            mag={[0, 0, 0]} // or remove if you don’t use magnetometer
          />
          </Panel>
        </div>
        <div key="batteryVoltage">
          <Panel title="Battery Voltage">
            <BatteryVoltageGraph />
          </Panel>
        </div>

        <div key="batteryCurrent">
          <Panel title="Battery Current">
            <BatteryCurrentGraph />
          </Panel>
        </div>

        <div key="socMeter">
          <Panel title="State of Charge">
            <StateOfChargeMeter soc={76} />
          </Panel>
        </div>

        <div key="solarPower">
          <Panel title="Solar Panel Power">
            <SolarPanelPowerGraph />
          </Panel>
        </div>

        <div key="environment">
          <Panel title="Env. Conditions">
            <EnvironmentPanel
              temperature={sensorData.temperature}
              pressure={sensorData.pressure}
            />
          </Panel>
        </div>

        <div key="orientation">
          <Panel title="Orientation">
            <OrientationPanel orientation={sensorData.orientation} />
          </Panel>
        </div>

        <div key="orientation3d">
          <Panel title="3D Orientation">
            <OrientationVisualizer orientation={sensorData.orientation} />
          </Panel>
        </div>

      </GridLayout>
    </div>
  );
}

export default DashboardLayout;
