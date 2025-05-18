import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VideoTutorials() {
  const navigate = useNavigate();
  const videoId = '1CAWj8QWKulyMYDRH6TmClcglC5aXcIM-';

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-serif text-purple-900">Video Tutorials</h1>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="aspect-video relative rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src={`https://drive.google.com/file/d/${videoId}/preview`}
                allow="autoplay"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tutorial</h2>
            <p className="text-gray-600 mb-6">
              Learn the fundamentals of sign language through our comprehensive video guide. 
              This tutorial covers essential hand gestures and basic communication techniques.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Topics Covered:</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Basic hand positions and movements</li>
                  <li>Common everyday phrases</li>
                  <li>Proper finger spelling techniques</li>
                  <li>Practice exercises and tips</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Duration:</h3>
                <p className="text-gray-600 mt-1">45 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}