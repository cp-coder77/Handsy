import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Lock, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const { progress } = useProgressStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const calculateOverallProgress = () => {
    const values = Object.values(progress);
    return Math.round(values.reduce((acc, curr) => acc + curr, 0) / values.length);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUpdateProfile = () => {
    // TODO: Implement profile update
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-serif text-purple-900">Profile</h1>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900">{user.name}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-purple-600 hover:text-purple-700 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="flex items-center justify-between">
                  <p className="text-gray-900">********</p>
                  <button
                    onClick={() => {/* TODO: Implement password change */}}
                    className="text-purple-600 hover:text-purple-700 transition"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Learning Progress
                </label>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">{calculateOverallProgress()}% Complete</p>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}