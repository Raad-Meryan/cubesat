import React, { useState } from "react";

export default function ScheduleCaptureModal({ onClose }) {
  const [ts, setTs] = useState("");

  const submit = () => {
    fetch(process.env.REACT_APP_API_URL + "/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ts })
    }).then(onClose);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#1e1e1e", padding: 20, borderRadius: 4 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, color: "#fff" }}>Schedule Snapshot</h3>
        <input
          type="datetime-local"
          value={ts}
          onChange={e => setTs(e.target.value.replace(":", "-"))}
          style={{ marginBottom: 10 }}
        />
        <br />
        <button onClick={submit} style={{ marginRight: 8 }}>
          Schedule
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
