import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Progress {
  alphabet: number;
  basicPhrases: number;
  dailyConversations: number;
  emergencySigns: number;
}

interface ProgressState {
  progress: Progress;
  updateProgress: (category: keyof Progress, value: number) => Promise<void>;
  fetchProgress: () => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: {
    alphabet: 0,
    basicPhrases: 0,
    dailyConversations: 0,
    emergencySigns: 0,
  },
  updateProgress: async (category, value) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('progress')
      .upsert({ user_id: user.id, category, value });

    if (!error) {
      set((state) => ({
        progress: { ...state.progress, [category]: value },
      }));
    }
  },
  fetchProgress: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('progress')
      .select('category, value')
      .eq('user_id', user.id);

    if (data) {
      const progress = data.reduce((acc, curr) => ({
        ...acc,
        [curr.category]: curr.value,
      }), {
        alphabet: 0,
        basicPhrases: 0,
        dailyConversations: 0,
        emergencySigns: 0,
      });

      set({ progress });
    }
  },
}));