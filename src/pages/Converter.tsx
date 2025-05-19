/// <reference types="dom-speech-recognition" />

import React, { useState, useEffect } from 'react';
import { ModelViewer } from '../components/ModelViewer';
import '../styles/Converter.css';

export default function Converter() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [availableAnimations, setAvailableAnimations] = useState<string[]>([]);

  // Fetch available animations from the ModelViewer (static list for now)
  useEffect(() => {
    // These should match the animation names in your GLB model
    setAvailableAnimations([
      'Idle', 'Wave', 'Greeting', 'Dance', 'Bow', 'Nod', 'Shake',
    ]);
  }, []);

  // Live update the model animation as user types
  useEffect(() => {
    if (availableAnimations.includes(inputText)) {
      setCurrentText(inputText);
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
        <h1 className="converter-title">Robot Sign Language Converter</h1>
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
            {availableAnimations.map(anim => (
              <li key={anim} className={inputText === anim ? 'active' : ''}>{anim}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="converter-model-section">
        <ModelViewer text={currentText} />
      </div>
    </div>
  );
}