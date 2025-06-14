import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Cube({ orientation }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && orientation) {
      const [yaw, pitch, roll] = orientation.map((deg) => (deg || 0) * (Math.PI / 180));
      meshRef.current.rotation.set(pitch, yaw, roll); // X, Y, Z
    }
  });

  return (
    <group ref={meshRef}>
      {/* Cube body */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#44ccff" />
      </mesh>

      {/* X axis (red) */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="red" />
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
      </mesh>

      {/* Y axis (green) */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="green" />
        <mesh position={[0, 1, 0]} />
      </mesh>

      {/* Z axis (blue) */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="blue" />
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>
    </group>
  );
}

function OrientationVisualizer({ orientation }) {
  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <Cube orientation={orientation} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default OrientationVisualizer;