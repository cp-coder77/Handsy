import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Wand2, UserCircle2 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="glassmorphic rounded-full px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Box className="w-8 h-8 text-coral" />
            <span className="text-violet font-medium">Handsy</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/converter" className="text-violet hover:text-coral transition-colors">Convert</Link>
            <Link to="/how-it-works" className="text-violet hover:text-coral transition-colors">How it works?</Link>
            <Link to="/learn" className="text-violet hover:text-coral transition-colors">Learn</Link>
            <Link
              to="/converter"
              className="btn-primary px-6 py-2 rounded-full flex items-center space-x-2 shadow-sm"
            >
              <Wand2 className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
            <button
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              className={`glassmorphic text-violet p-2 rounded-full flex items-center justify-center hover:shadow transition-all ${
                isAuthenticated ? 'ring-2 ring-coral' : ''
              }`}
              title={isAuthenticated ? user?.name || 'Profile' : 'Sign In'}
            >
              <UserCircle2 className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}