import React from 'react';
import { Keyboard, Cpu, Play, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Keyboard className="w-8 h-8 text-purple-600" />,
    title: "Enter Your Text",
    description: "Type or speak your message.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    title: "Convert",
    description: "Let our AI Process.",
  },
  {
    icon: <Play className="w-8 h-8 text-purple-600" />,
    title: "Watch",
    description: "View the sign Language animation.",
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-purple-900 mb-6">
            The Process!
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Discover how Handsy transforms your text into accurate sign language animations in just three simple steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                  <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-20">
            <h2 className="text-3xl font-serif text-purple-900 mb-6">Why Choose Handsy?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Accurate Translations</h3>
                <p className="text-gray-600">
                  Our AI-powered system ensures precise and natural sign language translations every time.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Real-time Processing</h3>
                <p className="text-gray-600">
                  Experience instant translations with our high-performance processing engine.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Easy to Use</h3>
                <p className="text-gray-600">
                  Simple and intuitive interface makes sign language translation accessible to everyone.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Multiple Input Methods</h3>
                <p className="text-gray-600">
                  Choose between text input or voice recognition for maximum flexibility.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-serif text-purple-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already breaking communication barriers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition">
                Try Handsy Now
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg border border-gray-200 hover:bg-gray-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}