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

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function DashboardLayout() {
  const layout = [
    { i: 'logo', x: 0, y: 0, w: 2, h: 4 },
    { i: 'time', x: 2, y: 0, w: 2, h: 3 },
    { i: 'altitude', x: 4, y: 0, w: 2, h: 3 },
    { i: 'opMode', x: 6, y: 0, w: 2, h: 3 },
    { i: 'sensorStatus', x: 8, y: 0, w: 2, h: 4 },
    { i: 'memory', x: 0, y: 4, w: 4, h: 5 },
    { i: 'uptime', x: 4, y: 4, w: 8, h: 6 }
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
      </GridLayout>
    </div>
  );
}

export default DashboardLayout;
