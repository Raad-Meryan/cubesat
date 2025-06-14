import PowerLineGraph from "./PowerLineGraph";
export default function BatteryCurrentGraph({ value }) {
  return (
    <PowerLineGraph
      value={value}
      colour="#ffce56"
      yUnit="A"
      yMax={10}            // tweak for your system
      label="Battery Current"
    />
  );
}