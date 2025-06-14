// StateOfChargeMeter.jsx
import React from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./StateOfChargeMeter.css";      // ⬅ add

export default function StateOfChargeMeter({ soc = 0 }) {
  return (
    /* fills the whole Panel cell and centres the gauge */
    <div className="soc-wrapper">
      <CircularProgressbar
        value={soc}
        text={`${soc}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor:
            soc > 50 ? "#10b510" : soc > 20 ? "#ffaa00" : "#ff3333",
          trailColor: "#444"
        })}
      />
      {/*  optional extra label – delete if you already print a title
           in <Panel title="State of Charge">… */}
      <span className="soc-caption">State of Charge</span>
    </div>
  );
}
