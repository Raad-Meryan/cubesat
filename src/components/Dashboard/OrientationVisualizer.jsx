// OrientationVisualizer.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const AXIS_LEN = 2.5;          //  <<<  change this to any length you like
const AXIS_RAD = 0.03;         //  cylinder radius

/* ─────────── Cube + coloured axes ──────────────────────────────────── */
function Cube({ orientation = [0, 0, 0] }) {
  const ref = useRef();

  // keep the cube aligned with live Euler angles (deg → rad)
  useFrame(() => {
    const [yaw, pitch, roll] = orientation.map(
      (deg) => (deg ?? 0) * (Math.PI / 180)
    );
    if (ref.current) ref.current.rotation.set(pitch, yaw, roll, "XYZ");
  });

  return (
    <group ref={ref}>
      {/* ── cube body ─────────────────────────────── */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#1499c5" />
      </mesh>

      {/* ── X axis (red) ─────────────────────────── */}
      <mesh position={[AXIS_LEN / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[AXIS_RAD, AXIS_RAD, AXIS_LEN, 8]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* ── Y axis (green) ───────────────────────── */}
      <mesh position={[0, AXIS_LEN / 2, 0]}>
        <cylinderGeometry args={[AXIS_RAD, AXIS_RAD, AXIS_LEN, 8]} />
        <meshBasicMaterial color="green" />
      </mesh>

      {/* ── Z axis (blue) ────────────────────────── */}
      <mesh position={[0, 0, AXIS_LEN / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[AXIS_RAD, AXIS_RAD, AXIS_LEN, 8]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
}

/* ─────────── Full visualiser panel ─────────────────────────────────── */
export default function OrientationVisualizer({ orientation }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",          // fill the grid-cell
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <Cube orientation={orientation} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
