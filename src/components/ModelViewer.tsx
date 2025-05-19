import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useAnimations, useGLTF } from '@react-three/drei';
import { ModelLoader, LoadingSpinner } from './ModelLoader';
import * as THREE from 'three';

interface ModelViewerProps {
  text: string;
  className?: string;
  onAnimationError?: (error: string) => void;
  onAnimationsLoaded?: (names: string[]) => void;
}

// Ensure the model path is relative to the public directory
const MODEL_PATH = '/RobotExpressive.glb';

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

function SignModel({ text, onAnimationError, onAnimationsLoaded }: { text: string; onAnimationError?: (error: string) => void; onAnimationsLoaded?: (names: string[]) => void }) {
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

  const { actions } = useAnimations(modelData?.animations || [], group);
  const [currentAction, setCurrentAction] = useState<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (modelError || !modelData) return;

    // Case-insensitive animation name matching
    const animationName = text.trim() || 'Idle';
    // Find the actual key in actions that matches (case-insensitive)
    const actionKey = Object.keys(actions).find(
      key => key.toLowerCase() === animationName.toLowerCase()
    );
    const action = actionKey ? actions[actionKey] : undefined;

    if (!action) {
      onAnimationError?.(`Animation "${animationName}" not found`);
      return;
    }

    // Only play if not already playing this animation
    if (currentAction !== action) {
      // Fade out previous action
      if (currentAction) {
        currentAction.fadeOut(0.3);
      }
      // Play new action
      action.reset().fadeIn(0.3).play();
      setCurrentAction(action);
    }

    return () => {
      if (currentAction && currentAction !== action) {
        currentAction.fadeOut(0.3);
      }
    };
  }, [text, actions, currentAction, onAnimationError, modelError, modelData]);

  // Log available animation names for debugging
  useEffect(() => {
    if (modelData?.animations) {
      const animNames = modelData.animations.map(a => a.name);
      console.log('Available model animations:', animNames);
      if (onAnimationsLoaded) onAnimationsLoaded(animNames);
    }
  }, [modelData, onAnimationsLoaded]);

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

export function ModelViewer({ text, className = '', onAnimationError, onAnimationsLoaded }: ModelViewerProps) {
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
    <div className={`relative w-full h-full ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 20, 0], fov: 60 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
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
          <SignModel text={text} onAnimationError={handleAnimationError} onAnimationsLoaded={onAnimationsLoaded} />
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