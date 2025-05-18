import React from 'react';
import { Html, useProgress } from '@react-three/drei';

// Component to be used inside Canvas
export function ModelLoader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-purple-600 font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

// Component to be used outside Canvas
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-purple-600 font-medium">Loading...</p>
    </div>
  );
}