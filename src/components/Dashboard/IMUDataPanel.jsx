  import React from 'react';
  import './IMUDataPanel.css';

  function IMUDataPanel({ gyro = [0, 0, 0], accel = [0, 0, 0], mag = [0, 0, 0] }) {
    const formatVector = ([x, y, z]) =>
      `X: ${x.toFixed(2)} | Y: ${y.toFixed(2)} | Z: ${z.toFixed(2)}`;

    return (
      <div className="imu-panel">
        <h4>Accelerometer</h4>
        <p>{formatVector(accel)}</p>
        <h4>Gyroscope</h4>
        <p>{formatVector(gyro)}</p>
        <h4>Magnetometer</h4>
        <p>{formatVector(mag)}</p>
      </div>
    );
  }

  export default IMUDataPanel;
