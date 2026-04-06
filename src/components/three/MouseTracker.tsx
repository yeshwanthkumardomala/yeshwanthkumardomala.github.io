import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MouseTracker = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const { mouse } = state;
    lightRef.current.position.x = mouse.x * 5;
    lightRef.current.position.y = mouse.y * 5;
    lightRef.current.position.z = 2;
  });

  return (
    <pointLight
      ref={lightRef}
      color="#00d4ff"
      intensity={2}
      distance={15}
      decay={2}
    />
  );
};

export default MouseTracker;
