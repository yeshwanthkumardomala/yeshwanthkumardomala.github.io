import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Octahedron, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, speed, shape }: {
  position: [number, number, number];
  color: string;
  speed: number;
  shape: 'icosahedron' | 'octahedron' | 'torus' | 'box';
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
  });

  const material = <meshStandardMaterial color={color} transparent opacity={0.15} wireframe />;

  switch (shape) {
    case 'icosahedron':
      return <Icosahedron ref={meshRef} args={[0.6, 1]} position={position}>{material}</Icosahedron>;
    case 'octahedron':
      return <Octahedron ref={meshRef} args={[0.5]} position={position}>{material}</Octahedron>;
    case 'torus':
      return <Torus ref={meshRef} args={[0.5, 0.15, 8, 20]} position={position}>{material}</Torus>;
    case 'box':
      return <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position}>{material}</Box>;
  }
};

const FloatingIcons = () => {
  const shapes: Array<{
    position: [number, number, number];
    color: string;
    speed: number;
    shape: 'icosahedron' | 'octahedron' | 'torus' | 'box';
  }> = [
    { position: [-4, 2, -3], color: '#00d4ff', speed: 0.4, shape: 'icosahedron' },
    { position: [4, -1, -2], color: '#39ff14', speed: 0.6, shape: 'octahedron' },
    { position: [-3, -2, -4], color: '#ffb347', speed: 0.3, shape: 'torus' },
    { position: [3, 3, -5], color: '#00d4ff', speed: 0.5, shape: 'box' },
    { position: [5, 0, -3], color: '#39ff14', speed: 0.35, shape: 'icosahedron' },
    { position: [-5, 1, -2], color: '#ffb347', speed: 0.45, shape: 'octahedron' },
    { position: [0, -3, -4], color: '#00d4ff', speed: 0.55, shape: 'torus' },
    { position: [2, 2, -6], color: '#39ff14', speed: 0.25, shape: 'box' },
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </>
  );
};

export default FloatingIcons;
