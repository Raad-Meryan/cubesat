import React, { useEffect, useState } from "react";
import "./BeaconPulse.css";

import {
  BEACON_PERIOD_MS,
  FLASH_MS,
  LOST_TIMEOUT_MS
} from "./beacon-constants";

export default function BeaconPulse() {
  const [flash, setFlash] = useState(false);
  const [lost,  setLost]  = useState(false);
  const [last,  setLast]  = useState(Date.now());

  /* ── poll /beacon ─────────────────────────────────────────── */
  useEffect(() => {
    const poll = () => {
      fetch(process.env.REACT_APP_API_URL + "/beacon", { cache: "no-store" })
        .then(r => r.ok ? r.json() : null)
        .then(j => {
          if (!j) return;                 // ignore HTTP errors
          setLast(Date.now());
          setLost(false);                 // link is alive
          setFlash(true);
          setTimeout(() => setFlash(false), FLASH_MS);
        })
        .catch(console.error);
    };

    poll();                               // initial hit
    const id = setInterval(poll, BEACON_PERIOD_MS);
    return () => clearInterval(id);
  }, []);

  /* ── watchdog: declare lost if too long since last packet ── */
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - last > LOST_TIMEOUT_MS) setLost(true);
    }, 500);
    return () => clearInterval(id);
  }, [last]);

  return (
    <div className="pulse-wrapper">
      <span
        className={`pulse-dot ${flash ? "on" : ""} ${lost ? "lost" : ""}`}
      />
      <span className="pulse-label">
        Beacon&nbsp;{lost ? "Lost" : "OK"}
      </span>
    </div>
  );
}
