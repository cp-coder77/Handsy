import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Model URL from GitHub Pages
const MODEL_URL = 'https://cp-coder77.github.io/TextToSignLanguage/handsy.glb';

export function SignModel({ text }: { text: string }) {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    // Stop all currently running animations
    Object.values(actions).forEach(action => {
      if (action.isRunning()) {
        action.fadeOut(0.5);
      }
    });

    // Determine which animation to play based on text input
    let animationName = 'static_pose';
    
    if (text.toLowerCase().includes('hello')) {
      animationName = 'hello';
    } else if (text.toLowerCase().includes('nice to meet you')) {
      animationName = 'nice_to_meet_you';
    } else if (text.toLowerCase().includes('all')) {
      animationName = 'all';
    }

    // Play the selected animation with fade in
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      // Cleanup: stop all animations when component unmounts
      Object.values(actions).forEach(action => action.stop());
    };
  }, [text, actions]);

  // Add subtle floating animation
  useFrame((state) => {
    if (group.current) {
      // Gentle floating movement
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        scale={2} // Adjust scale as needed
        position={[0, -1, 0]} // Adjust position as needed
      />
    </group>
  );
}

// Preload the model to improve initial loading performance
useGLTF.preload(MODEL_URL);