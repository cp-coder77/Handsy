import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('/RobotExpressive.glb');
  // Log available animations for debugging
  console.log('Animations:', gltf.animations.map(a => a.name));
  return (
    <primitive 
      object={gltf.scene} 
      scale={2}
      position={[0, -1, 0]}
    />
  );
}

export function ModelTest() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
} 