// ThermalHeatmapPanel.jsx with bilinear interpolation
import React from 'react';
import './ThermalHeatmapPanel.css';

export function interpolateGrid(data, scale = 4) {
  const w = 8, h = 8;
  const newW = w * scale;
  const newH = h * scale;
  const result = Array(newH).fill(0).map(() => Array(newW).fill(0));

  for (let y = 0; y < newH; y++) {
    for (let x = 0; x < newW; x++) {
      const gx = x / scale;
      const gy = y / scale;

      const x0 = Math.floor(gx);
      const y0 = Math.floor(gy);
      const x1 = Math.min(x0 + 1, w - 1);
      const y1 = Math.min(y0 + 1, h - 1);

      const dx = gx - x0;
      const dy = gy - y0;

      const i = y0 * w + x0;
      const j = y0 * w + x1;
      const k = y1 * w + x0;
      const l = y1 * w + x1;

      const a = data[i];
      const b = data[j];
      const c = data[k];
      const d = data[l];

      result[y][x] =
        a * (1 - dx) * (1 - dy) +
        b * dx * (1 - dy) +
        c * (1 - dx) * dy +
        d * dx * dy;
    }
  }
  return result;
}

function ThermalHeatmapPanel({ pixels }) {
  if (!pixels || pixels.length !== 64) {
    return <p>No data</p>;
  }

  const scale = 4;
  const interpolated = interpolateGrid(pixels, scale);

  return (
    <div
      className="heatmap-container"
      style={{
        gridTemplateColumns: `repeat(${8 * scale}, 1fr)`
      }}
    >
      {interpolated.flat().map((temp, idx) => {
        const clamped = Math.min(40, Math.max(20, temp));
        const hue = 240 - ((clamped - 20) / 20) * 240;
        const bgColor = `hsl(${hue}, 100%, 50%)`;
        return (
          <div
            key={idx}
            className="heatmap-cell"
            style={{ backgroundColor: bgColor }}
            title={`${temp.toFixed(1)}°C`}
          />
        );
      })}
    </div>
  );
}

export default ThermalHeatmapPanel;
