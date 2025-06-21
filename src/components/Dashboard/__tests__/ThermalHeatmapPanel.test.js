import { interpolateGrid } from '../ThermalHeatmapPanel.jsx';

// helper to flatten 2D array to 1D for easier assertions? Not needed.

describe('interpolateGrid', () => {
  it('interpolates an 8x8 grid to expected values with scale 2', () => {
    const base = Array.from({ length: 64 }, (_, i) => i); // 0..63
    const result = interpolateGrid(base, 2);

    expect(result.length).toBe(16);
    expect(result[0].length).toBe(16);

    // Check a few cells
    expect(result[0][0]).toBeCloseTo(0);
    expect(result[0][1]).toBeCloseTo(0.5);
    expect(result[1][0]).toBeCloseTo(4);
    expect(result[1][1]).toBeCloseTo(4.5);
    expect(result[15][15]).toBeCloseTo(63);
  });
});
