import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Panel from './Panel';
import MissionLogo from './MissionLogo';
import DateTimeDisplay from './DateTimeDisplay';
import UptimeChart from './UptimeChart';
import SensorStatusPanel from './SensorStatusPanel';
import SystemStatusPanel from './SystemStatusPanel';
import OperationModePanel from './OperationModePanel';
import AltitudePanel from './AltitudePanel';
import MemoryPanel from './MemoryPanel';
import IMUDataPanel from './IMUDataPanel';
import BatteryVoltageGraph from './BatteryVoltageGraph';
import BatteryCurrentGraph from './BatteryCurrentGraph';
import StateOfChargeMeter from './StateOfChargeMeter';
//import SolarPanelPowerGraph from './SolarPanelPowerGraph';
import EnvironmentPanel from './EnvironmentPanel';
import OrientationPanel from './OrientationPanel';
import OrientationVisualizer from './OrientationVisualizer';
import LastSnapshotModal from "./LastSnapshotModal";
import CapturedImagesButton from "./CapturedImagesButton";
import ThermalPanel from './ThermalPanel';
import ThermalHeatmapPanel from './ThermalHeatmapPanel';
import ThermalGraphPanel from './ThermalGraphPanel';
import SolarPowerGraph from './SolarPowerGraph';
import TemperatureStatsPanel from "./TemperatureStatsPanel";
import SubsystemTempGraph from './SubsystemTempGraph';
import BeaconPulse from "./BeaconPulse";
import BeaconPulseGraph from "./BeaconPulseGraph";
import ScheduleCaptureModal from "./ScheduleCaptureModal";
import { fetchSensors, fetchMemory } from '../../services/api'; 
import cloneDeep from 'lodash/cloneDeep';   //  npm i lodash
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
function DashboardLayout() {
  const baseLayout = [
  { i: 'logo',            x: 0,  y: 0,  w: 2,  h: 4 },
  { i: 'time',            x: 2,  y: 0,  w: 2,  h: 4 },
  { i: 'altitude',        x: 4,  y: 0,  w: 2,  h: 4 },
  { i: 'opMode',          x: 6,  y: 0,  w: 2,  h: 4 },
  { i: 'sensorStatus',    x: 8,  y: 0,  w: 2,  h: 7 },
  { i: 'orientation3d',   x:10,  y:0, w: 2,  h: 4 },

  { i: 'thermalHeatmap',  x: 0,  y:4, w: 3,  h: 6 },
  { i: 'thermalGraph',    x:3,  y:4, w: 5,  h: 6 },
  { i: 'orientation',     x:10,  y: 4,  w: 2,  h: 3 },
  { i: 'systemStatus',    x:8,  y: 7,  w: 2,  h: 4 },
  { i: 'imu',             x: 10,  y: 7,  w: 2,  h: 4 },

  { i: 'uptime',          x: 0,  y: 10,  w: 6,  h: 6 },
  { i: 'thermal',         x: 6,  y:10, w: 2,  h: 4 },
  { i: "beacon",          x: 6, y: 14, w: 2, h: 2 },
  { i: 'environment',     x:8,  y: 11,  w: 2,  h: 3 },
  { i: "tempStats",       x: 10, y: 11, w: 2, h: 3 },

  { i: "beaconGraph",     x: 0, y: 16, w: 8, h: 6 },
  { i: 'subsysTemp',      x: 8, y: 16, w: 4, h: 6 },
  
  { i: 'lastSnapBtn',     x: 0,  y:22, w: 3,  h: 5 },
  { i: 'galleryBtn',      x: 3,  y:22, w: 3,  h: 5 },
  { i: 'scheduleBtn',     x: 8, y: 22, w: 2, h: 3 },
  { i: 'memory',          x: 6,  y: 22,  w: 2,  h: 5 },
  { i: 'gps',             x: 11,  y:22, w: 2,  h: 3 },

  { i: 'socMeter',        x: 0,  y:27, w: 2,  h: 6 },
  { i: 'batteryVoltage',  x: 2,  y:27, w: 5,  h: 6 },
  { i: 'batteryCurrent',  x: 7,  y:27, w: 5,  h: 6 },
  { i: 'solarPower',      x: 8,  y:23, w: 4,  h: 4 }
];

const layouts = {
  lg: cloneDeep(baseLayout),
  md: cloneDeep(baseLayout),
  sm: cloneDeep(baseLayout),
  xs: cloneDeep(baseLayout),
  xxs: cloneDeep(baseLayout)
};

  function GPSPanel({ gps }) {
  if (!gps?.lat) return <p>No fix yet…</p>;
  return (
    <div>
      <p>Lat: {gps.lat}</p>
      <p>Lon: {gps.lon}</p>
      {gps.alt && <p>Alt: {gps.alt} m</p>}
    </div>
  );
}


  const [sensorData, setSensorData] = useState({});
  const [cdhsUptime, setCdhsUptime] = useState(0);
  const [memoryData, setMemoryData] = useState({ used_gb: 0, total_gb: 1 });
  const [showSched, setShowSched] = useState(false);

useEffect(() => {
  const h = setInterval(() => {
    fetchSensors()
      .then(d => {
        setSensorData(d);
       if (typeof d.uptime_h === "number") {      // field added in Python
         setCdhsUptime(d.uptime_h);               // days
        }
      })
      .catch(console.error);
  }, 250);                                      // one sample = 250ms
  return () => clearInterval(h);
}, []);

useEffect(() => {
  const h = setInterval(() => {
    fetchMemory()
      .then(setMemoryData)
      .catch(console.error);
  }, 5000);
  return () => clearInterval(h);
}, []);
  

 return (
  <div className="dashboard" style={{ backgroundColor:'#010101',
                                      minHeight:'100vh', padding:'20px' }}>

    {/* NEW wrapper with full width */}
    <div className="grid-wrapper">

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg:1200, md:996, sm:768, xs:480, xxs:0 }}
        cols={{ lg:12,  md:10,  sm:6,  xs:4,  xxs:2 }}
        rowHeight={60}
        isDraggable
        isResizable
        onBreakpointChange={bp => console.log('breakpoint →', bp)}
      >
        <div key="logo"><Panel><MissionLogo /></Panel></div>
        <div key="time"><Panel title="Current Time"><DateTimeDisplay /></Panel></div>
        <div key="altitude"><Panel title="Altitude"><AltitudePanel /></Panel></div>
        <div key="opMode"><Panel><OperationModePanel mode="Normal" /></Panel></div>
        <div key="sensorStatus"><Panel title="Components' Status"><SensorStatusPanel /></Panel></div>
        <div key="systemStatus"><Panel title="System Status"><SystemStatusPanel /></Panel></div>
        <div key="memory">
  <Panel title="Memory Storage">
  <MemoryPanel
        usedGB={memoryData.used_gb}
        totalGB={memoryData.total_gb}
  />
</Panel>
</div>
        <div key="uptime"><Panel title="Subsystem Uptime"><UptimeChart cdhs={cdhsUptime} /></Panel></div>
        <div key="imu">
          <Panel title="IMU Sensor Data">
          <IMUDataPanel
            gyro={sensorData.gyroscope}
            accel={sensorData.acceleration}
            mag={sensorData.magnetometer} // or remove if you don’t use magnetometer
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
            <StateOfChargeMeter soc={0} />
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

        <div key="lastSnapBtn">
          <Panel>
            <LastSnapshotModal />
          </Panel>
        </div>

        <div key="galleryBtn">
          <Panel>
            <CapturedImagesButton />
          </Panel>
        </div>

        <div key="gps">
          <Panel title="GPS">
            <GPSPanel gps={sensorData.gps} />
          </Panel>
        </div>

        <div key="thermal">
          <Panel title="Thermal Sensor">
            <ThermalPanel data={sensorData.thermal} />
          </Panel>
        </div>

        <div key="thermalHeatmap">
          <Panel title="Thermal Heatmap">
            <ThermalHeatmapPanel pixels={sensorData.thermal?.pixels} />
          </Panel>
        </div>

        <div key="thermalGraph">
          <Panel title="Thermal Avg Over Time">
            <ThermalGraphPanel
              avg={sensorData.thermal?.avg}
              min={sensorData.thermal?.min}
              max={sensorData.thermal?.max}
            />
          </Panel>
        </div>

      <div key="solarPower">
        <Panel title="Solar Panel Power">
          <SolarPowerGraph />
        </Panel>
      </div>

      <div key="tempStats">
  <Panel title="CubeSat Board Temp (5-min)">
    <TemperatureStatsPanel value={sensorData.temperature} />
  </Panel>
</div>

<div key="subsysTemp">
  <Panel title="Subsystem Temperatures">
    <SubsystemTempGraph
      cdhs={sensorData.temperature}   // real BMP-280 reading
      /* eps, adcs, comm default to 0 so no prop needed yet */
    />
  </Panel>
</div>


<div key="beacon">
  <Panel title="Beacon">
    <BeaconPulse />
  </Panel>
</div>


<div key="beaconGraph">
  <Panel title="Beacon Pulse (5 min)">
    <BeaconPulseGraph />
  </Panel>
</div>

<div key="scheduleBtn">
  <Panel>
    <button onClick={() => setShowSched(true)}>Schedule Snapshot</button>
    {showSched && <ScheduleCaptureModal onClose={() => setShowSched(false)} />}
  </Panel>
</div>


      </ResponsiveGridLayout>
    </div>
  </div>
  );
}

export default DashboardLayout;
