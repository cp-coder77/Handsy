import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen, GraduationCap, ArrowRight, Filter } from 'lucide-react';

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  readTime: string;
}

const guides: Guide[] = [
  {
    id: 1,
    title: 'Getting Started with ASL',
    description: 'Learn the basics of American Sign Language, including finger spelling and basic greetings.',
    category: 'Basics',
    level: 'Beginner',
    readTime: '10 min'
  },
  {
    id: 2,
    title: 'Common Everyday Phrases',
    description: 'Master essential phrases for daily communication in ASL.',
    category: 'Conversation',
    level: 'Beginner',
    readTime: '15 min'
  },
  {
    id: 3,
    title: 'Advanced Grammar Structures',
    description: 'Dive deep into complex ASL grammar patterns and sentence structures.',
    category: 'Grammar',
    level: 'Advanced',
    readTime: '20 min'
  },
  {
    id: 4,
    title: 'Numbers and Time',
    description: 'Learn how to sign numbers, tell time, and discuss dates in ASL.',
    category: 'Basics',
    level: 'Intermediate',
    readTime: '12 min'
  }
];

const categories = ['All', 'Basics', 'Conversation', 'Grammar', 'Culture', 'Vocabulary'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Guides() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || guide.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

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
            <h1 className="text-4xl font-serif text-purple-900">ASL Learning Guides</h1>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid gap-6">
            {filteredGuides.map(guide => (
              <div key={guide.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h2>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        {guide.level}
                      </span>
                      <span className="text-gray-500">
                        {guide.readTime} read
                      </span>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 transition">
                    <ArrowRight className="w-5 h-5" />
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