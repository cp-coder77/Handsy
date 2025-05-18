/// <reference types="react" />
/// <reference types="dom-speech-recognition" />

import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Send, Volume2, X, Loader2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModelViewer } from '../components/ModelViewer';

interface ConversionHistory {
  text: string;
  timestamp: number;
}

// Basic type definitions for speech recognition
interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  }[];
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

export default function Converter() {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentText, setCurrentText] = useState('');

  // List of supported languages
  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'ja-JP', name: 'Japanese' },
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0][0].transcript)
          .join('');
        
        setInputText(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please enable microphone access.');
        } else {
          setError('An error occurred with speech recognition. Please try again.');
        }
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition is not supported in your browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleRecording = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not available.');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      setError('');
      recognition.lang = selectedLanguage;
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  }, [isRecording, recognition, selectedLanguage]);

  const handleClearText = () => {
    setInputText('');
    setError('');
    setCurrentText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter some text to convert.');
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      // Add to conversion history
      setConversionHistory((prev: ConversionHistory[]) => [
        { text: inputText, timestamp: Date.now() },
        ...prev.slice(0, 9) // Keep last 10 conversions
      ]);

      // Update current text for animation
      setCurrentText(inputText);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleHistoryItemClick = (text: string) => {
    setInputText(text);
    setCurrentText(text);
    setShowHistory(false);
  };

  const handleAnimationError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-violet mb-6">
            Convert Text to Sign Language
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Type or speak your text, and watch it transform into accurate sign language animations.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleClearText}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 transition"
                >
                  Clear Text
                </button>

                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="ml-auto flex items-center gap-2 text-gray-600 hover:text-violet transition"
                >
                  <History className="w-5 h-5" />
                  History
                </button>
              </div>

              <AnimatePresence>
                {showHistory && conversionHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 rounded-xl p-4 mb-4"
                  >
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Conversions</h3>
                    <div className="space-y-2">
                      {conversionHistory.map((item) => (
                        <button
                          key={item.timestamp}
                          onClick={() => handleHistoryItemClick(item.text)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-white transition"
                        >
                          <p className="text-gray-700">{item.text}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here or click the microphone to start speaking..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet focus:border-transparent"
                />
                <AnimatePresence>
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Recording...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${
                    isRecording
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled={!recognition}
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      Start Recording
                    </>
                  )}
                </button>
                
                <button
                  type="submit"
                  disabled={isConverting}
                  className="flex-1 bg-coral text-white px-6 py-3 rounded-full hover:bg-coral-dark transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Convert to Sign Language
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-violet">Sign Language Animation</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-violet transition">
                <Volume2 className="w-5 h-5" />
                Play Audio
              </button>
            </div>
            
            <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden">
              <ModelViewer 
                text={currentText} 
                onAnimationError={handleAnimationError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}