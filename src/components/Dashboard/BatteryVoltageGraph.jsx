import PowerLineGraph from "./PowerLineGraph";
export default function BatteryVoltageGraph({ value }) {
  return (
    <PowerLineGraph
      value={value}
      colour="#36a2eb"
      yUnit="V"
      yMax={16}            // Li-ion 4 S ≈16 V max
      label="Battery Voltage"
    />
  );
}