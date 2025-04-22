import React from 'react';
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
    { i: 'solarPower', x: 0, y: 13, w: 12, h: 10 }
    
  ];

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
              gyro={[0.02, -0.01, 0.005]}
              accel={[0.0, 9.8, 0.1]}
              mag={[0.3, 0.1, -0.2]}
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
      </GridLayout>
    </div>
  );
}

export default DashboardLayout;
