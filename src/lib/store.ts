import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Criterion, AnalysisResult } from './types';

interface ScreeningState {
  criteria: Criterion[];
  results: AnalysisResult[];
  settings: {
    openaiKey: string;
  };
  setCriteria: (criteria: Criterion[]) => void;
  setResults: (results: AnalysisResult[]) => void;
  setSettings: (settings: { openaiKey: string }) => void;
  reset: () => void;
}

const initialState = {
  criteria: [],
  results: [],
  settings: {
    openaiKey: '',
  },
};

export const useScreeningStore = create<ScreeningState>()(
  persist(
    (set) => ({
      ...initialState,
      setCriteria: (criteria) => set({ criteria }),
      setResults: (results) => set({ results }),
      setSettings: (settings) => set({ settings }),
      reset: () => set(initialState),
    }),
    {
      name: 'talosix-screening-store',
      partialize: (state) => ({
        criteria: state.criteria,
        settings: state.settings,
      }),
    }
  )
);