import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ onAnimations }: { onAnimations: (names: string[]) => void }) {
  const { scene, animations } = useGLTF('/RobotExpressive.glb') as any;
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [currentAction, setCurrentAction] = useState<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      const names = animations.map((clip: any) => clip.name);
      onAnimations(names);
      console.log('Available animations:', names);
    }
  }, [animations, scene, onAnimations]);

  useEffect(() => {
    if (animations && animations.length && mixer.current) {
      const action = mixer.current.clipAction(animations[0]);
      action.reset().play();
      setCurrentAction(action);
    }
    // eslint-disable-next-line
  }, [animations]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  // Expose a playAnimation method via ref or callback
  Model.playAnimation = (name: string) => {
    if (mixer.current && animations && animations.length) {
      const clip = THREE.AnimationClip.findByName(animations, name);
      if (clip) {
        if (currentAction) currentAction.stop();
        const action = mixer.current.clipAction(clip);
        action.reset().play();
        setCurrentAction(action);
      } else {
        alert('Animation not found. Please check the available animations and try again.');
      }
    }
  };

  return <primitive object={scene} />;
}
// @ts-ignore
Model.playAnimation = (name: string) => {};

function App() {
  const [animations, setAnimations] = useState<string[]>([]);
  const [input, setInput] = useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <Model onAnimations={setAnimations} />
        <OrbitControls />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#222c',
          color: 'white',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <strong>Available Animations:</strong>
          {animations.length === 0 ? (
            <div>No animations found in this model.</div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {animations.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type animation name here..."
            style={{ marginRight: 8, padding: 4, borderRadius: 4, border: 'none' }}
          />
          <button
            onClick={() => {
              // @ts-ignore
              Model.playAnimation(input);
            }}
            style={{ padding: '4px 12px', borderRadius: 4, border: 'none', background: '#3498db', color: 'white' }}
          >
            Play Animation
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;