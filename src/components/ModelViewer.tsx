/// <reference types="react" />
/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />
/// <reference types="three" />

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useAnimations, useGLTF } from '@react-three/drei';
import { ModelLoader, LoadingSpinner } from './ModelLoader';
import * as THREE from 'three';

interface ModelViewerProps {
  text: string;
  className?: string;
  onAnimationError?: (error: string) => void;
}

// Ensure the model path is relative to the public directory
const MODEL_PATH = '/model.glb';

// Animation mapping with fallbacks and word combinations
const ANIMATION_MAP: Record<string, string[]> = {
  // Greetings
  'hello': ['Wave', 'Greeting'],
  'hi': ['Wave', 'Greeting'],
  'hey': ['Wave', 'Greeting'],
  'good morning': ['Wave', 'Greeting'],
  'good afternoon': ['Wave', 'Greeting'],
  'good evening': ['Wave', 'Greeting'],
  'good night': ['Wave', 'Greeting'],
  
  // Common phrases
  'nice to meet you': ['Dance', 'Wave'],
  'thank you': ['Bow', 'Wave'],
  'thanks': ['Bow', 'Wave'],
  'goodbye': ['Wave', 'Bow'],
  'bye': ['Wave', 'Bow'],
  'see you': ['Wave', 'Bow'],
  'see you later': ['Wave', 'Bow'],
  
  // Responses
  'yes': ['Nod', 'Wave'],
  'no': ['Shake', 'Wave'],
  'maybe': ['Shake', 'Wave'],
  'okay': ['Nod', 'Wave'],
  'ok': ['Nod', 'Wave'],
  
  // Requests
  'please': ['Bow', 'Wave'],
  'help': ['Wave', 'Greeting'],
  'excuse me': ['Wave', 'Greeting'],
  'sorry': ['Bow', 'Wave'],
  
  // Emotions
  'happy': ['Dance', 'Wave'],
  'sad': ['Bow', 'Wave'],
  'angry': ['Shake', 'Wave'],
  'excited': ['Dance', 'Wave'],
  
  // Default animations
  'default': ['Idle', 'Wave'],
};

// Add a function to check if the model exists
async function checkModelExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path);
    if (!response.ok) return false;
    const contentType = response.headers.get('content-type');
    return contentType?.includes('model/gltf-binary') || contentType?.includes('application/octet-stream') || false;
  } catch {
    return false;
  }
}

function SignModel({ text, onAnimationError }: { text: string; onAnimationError?: (error: string) => void }) {
  const group = useRef<THREE.Group>(null);
  const [modelError, setModelError] = useState<string | null>(null);
  const [modelData, setModelData] = useState<{ scene: THREE.Group; animations: THREE.AnimationClip[] } | null>(null);
  
  // Load model using useGLTF hook
  const gltf = useGLTF(MODEL_PATH);
  
  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelExists = await checkModelExists(MODEL_PATH);
        if (!modelExists) {
          throw new Error('3D model file not found or invalid');
        }
        
        if (gltf) {
          setModelData({ scene: gltf.scene, animations: gltf.animations });
        }
      } catch (error) {
        console.error('Error loading model:', error);
        setModelError('Failed to load 3D model. Please make sure the model file exists and is valid.');
        onAnimationError?.('Failed to load 3D model. Please make sure the model file exists and is valid.');
      }
    };

    loadModel();
  }, [gltf, onAnimationError]);

  const { actions, names } = useAnimations(modelData?.animations || [], group);
  const [currentAction, setCurrentAction] = useState<THREE.AnimationAction | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!text.trim() || modelError || !modelData) return;

    const playAnimation = async (animationName: string) => {
      const action = actions[animationName];
      if (!action) {
        onAnimationError?.(`Animation "${animationName}" not found`);
        return false;
      }

      setIsTransitioning(true);
      
      // Fade out current animation
      if (currentAction) {
        currentAction.fadeOut(0.3);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Play new animation
      action.reset().fadeIn(0.3).play();
      setCurrentAction(action);
      setIsTransitioning(false);
      return true;
    };

    const cleanText = text.trim().toLowerCase();
    let possibleAnimations = ['Idle'];

    // Find matching animations
    for (const [key, animations] of Object.entries(ANIMATION_MAP)) {
      if (cleanText.includes(key)) {
        possibleAnimations = animations;
        break;
      }
    }
    
    // Try each animation in the list until one works
    const playNextAnimation = async (index: number) => {
      if (index >= possibleAnimations.length) {
        onAnimationError?.(`No matching animation found for "${text}"`);
        return;
      }

      const success = await playAnimation(possibleAnimations[index]);
      if (!success) {
        playNextAnimation(index + 1);
      }
    };

    playNextAnimation(0);

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.3);
      }
    };
  }, [text, actions, currentAction, onAnimationError, modelError, modelData]);

  if (modelError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center p-8">
          <p className="text-red-600 mb-4">{modelError}</p>
          <p className="text-gray-600">Please make sure the 3D model file exists in the public directory.</p>
        </div>
      </div>
    );
  }

  if (!modelData) {
    return <ModelLoader />;
  }

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={modelData.scene} 
        scale={2}
        position={[0, -1, 0]}
      />
    </group>
  );
}

export function ModelViewer({ text, className = '', onAnimationError }: ModelViewerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  const handleAnimationError = (errorMessage: string) => {
    setError(errorMessage);
    onAnimationError?.(errorMessage);
  };

  useEffect(() => {
    const checkModel = async () => {
      const exists = await checkModelExists(MODEL_PATH);
      setModelExists(exists);
      setIsLoading(false);
    };
    checkModel();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (modelExists === false) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center p-8">
          <p className="text-red-600 mb-4">3D Model Not Found</p>
          <p className="text-gray-600 mb-4">Please make sure to add a valid GLB model file at:</p>
          <code className="bg-gray-100 p-2 rounded">public/RobotExpressive.glb</code>
          <p className="text-gray-600 mt-4">You can download a sample robot model from:</p>
          <a 
            href="https://market.pmnd.rs/model/robot-expressive" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            https://market.pmnd.rs/model/robot-expressive
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Optimize for different screen densities
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <spotLight position={[-5, 5, 5]} intensity={0.5} />
          
          {/* Environment and controls */}
          <Environment preset="city" />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Model */}
          <SignModel text={text} onAnimationError={handleAnimationError} />
        </Suspense>
      </Canvas>
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload(MODEL_PATH);