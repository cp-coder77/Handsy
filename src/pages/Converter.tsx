// src/pages/Converter.tsx
import React, { useState, useEffect } from 'react';
import { ModelViewer } from '../components/ModelViewer';
import '../styles/Converter.css';

export default function Converter() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [availableAnimations, setAvailableAnimations] = useState<string[]>([]);

  // Set available animations when the model loads
  const handleAnimationsLoaded = (names: string[]) => {
    setAvailableAnimations(names);
  };

  // Live update the model animation as user types
  useEffect(() => {
    // Find a case-insensitive match
    const match = availableAnimations.find(
      anim => anim.toLowerCase() === inputText.trim().toLowerCase()
    );
    if (match) {
      setCurrentText(match); // Use the correct case for ModelViewer
      setError('');
    } else if (inputText.trim() !== '') {
      setCurrentText('');
      setError('No matching animation.');
    } else {
      setCurrentText('');
      setError('');
    }
  }, [inputText, availableAnimations]);

  return (
    <div className="converter-root">
      <div className="converter-input-section">
        <h1 className="converter-title">Sign Language Converter</h1>
        <input
          className="converter-input"
          type="text"
          placeholder="Type an animation name (e.g., Wave, Nod, Bow)"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        {error && <div className="converter-error">{error}</div>}
        <div className="converter-animations-list">
          <h2>Available Animations</h2>
          <ul>
            {availableAnimations.map(anim => {
              const isActive = inputText.trim().toLowerCase() === anim.toLowerCase();
              return (
                <li
                  key={anim}
                  className={isActive ? 'active' : ''}
                  onClick={() => setInputText(anim)}
                  style={{ userSelect: 'none' }}
                >
                  {anim}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="converter-model-section">
        <div>
          <ModelViewer
            text={currentText}
            onAnimationsLoaded={handleAnimationsLoaded}
          />
        </div>
      </div>
    </div>
  );
}