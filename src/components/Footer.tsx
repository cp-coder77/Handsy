import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-violet text-base mt-20 py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-base mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-tiffany hover:text-coral transition">Home</Link>
                </li>
                <li>
                  <Link to="/learn" className="text-tiffany hover:text-coral transition">Learn</Link>
                </li>
                <li>
                  <Link to="/converter" className="text-tiffany hover:text-coral transition">Converter</Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-tiffany hover:text-coral transition">How It Works</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/guides" className="text-tiffany hover:text-coral transition">Guides</Link>
                </li>
                <li>
                  <Link to="/video-tutorials" className="text-tiffany hover:text-coral transition">Video Tutorials</Link>
                </li>
                <li>
                  <Link to="/quizzes" className="text-tiffany hover:text-coral transition">Quizzes</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-tiffany hover:text-coral transition">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-tiffany hover:text-coral transition">Contact</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-tiffany hover:text-coral transition">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-tiffany hover:text-coral transition">Terms of Service</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:text-coral transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:text-coral transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:text-coral transition">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-4 text-tiffany">
                Contact us at:<br />
                <a href="mailto:hello@handsy.com" className="hover:text-coral transition">hello@handsy.com</a>
              </p>
            </div>
          </div>

          <div className="border-t border-base/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-tiffany text-sm mb-4 md:mb-0">
                © {currentYear} Handsy. All rights reserved.
              </p>
              <p className="text-tiffany text-sm flex items-center">
                Made with <Heart className="w-4 h-4 text-coral mx-1" /> by Handsy Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}