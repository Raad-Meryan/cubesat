import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function StateOfChargeMeter({ soc = 76 }) {
  return (
    <div style={{ width: 150 }}>
      <CircularProgressbar
        value={soc}
        text={`${soc}%`}
        styles={buildStyles({
          textColor: 'white',
          pathColor: soc > 50 ? 'green' : soc > 20 ? 'orange' : 'red',
          trailColor: '#444'
        })}
      />
      <div style={{ marginTop: 10, color: 'white', textAlign: 'center' }}>State of Charge</div>
    </div>
  );
}