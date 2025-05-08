import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Cube({ orientation }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && orientation) {
      const [yaw, pitch, roll] = orientation.map((deg) => (deg || 0) * (Math.PI / 180));
      meshRef.current.rotation.set(pitch, yaw, roll); // pitch = X, yaw = Y, roll = Z
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#44ccff" />
    </mesh>
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