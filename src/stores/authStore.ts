import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      signIn: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data.user) {
            set({
              isAuthenticated: true,
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata.name || '',
              },
            });
          }
        } catch (error) {
          console.error('Sign in error:', error);
          throw error;
        }
      },
      signUp: async (email: string, password: string, name: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name },
            },
          });
          
          if (error) throw error;
          
          if (data.user) {
            set({
              isAuthenticated: true,
              user: {
                id: data.user.id,
                email: data.user.email!,
                name,
              },
            });
          }
        } catch (error) {
          console.error('Sign up error:', error);
          throw error;
        }
      },
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ isAuthenticated: false, user: null });
        } catch (error) {
          console.error('Sign out error:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);