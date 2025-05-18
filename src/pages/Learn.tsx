import React, { useEffect } from 'react';
import { Search, PlayCircle, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { useProgressStore } from '../stores/progressStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'Alphabet',
    description: 'Master the basics of sign language alphabet',
    key: 'alphabet' as const,
  },
  {
    title: 'Basic Phrases',
    description: 'Learn everyday conversational signs',
    key: 'basicPhrases' as const,
  },
  {
    title: 'Daily Conversations',
    description: 'Practice common dialogue scenarios',
    key: 'dailyConversations' as const,
  },
  {
    title: 'Emergency Signs',
    description: 'Essential signs for urgent situations',
    key: 'emergencySigns' as const,
  },
];

export default function Learn() {
  const { progress, fetchProgress } = useProgressStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProgress();
  }, [isAuthenticated, navigate, fetchProgress]);

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-purple-900 mb-6">
            Learn Sign Language
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Start your journey to mastering sign language with our comprehensive learning resources.
          </p>

          {/* Search Section */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for signs, phrases, or lessons..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Learning Resources */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <PlayCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Video Tutorials</h3>
              </div>
              <p className="text-gray-600 mb-4">Learn through visual demonstrations and expert guidance.</p>
              <button 
                onClick={() => navigate('/video-tutorials')}
                className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Guides</h3>
              </div>
              <p className="text-gray-600 mb-4">Comprehensive written guides with detailed explanations.</p>
              <button 
                onClick={() => navigate('/guides')}
                className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                View Guides <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Quizzes</h3>
              </div>
              <p className="text-gray-600 mb-4">Test your knowledge and track your progress.</p>
              <button 
                onClick={() => navigate('/quizzes')}
                className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Take Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div key={category.key} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
                    style={{ width: `${progress[category.key]}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{progress[category.key]}% Complete</span>
                  <button className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}