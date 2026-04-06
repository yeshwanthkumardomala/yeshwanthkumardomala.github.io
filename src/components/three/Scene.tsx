import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import FloatingIcons from './FloatingIcons';
import MouseTracker from './MouseTracker';

const Scene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00d4ff" />
        <MouseTracker />
        <ParticleField />
        <FloatingIcons />
      </Canvas>
    </div>
  );
};

export default Scene;
