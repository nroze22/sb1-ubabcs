import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Criterion {
  id: string;
  type: 'inclusion' | 'exclusion';
  criteriaType: 'conditions' | 'labs' | 'vitals' | 'demographics' | 'scores';
  field: string;
  operator: string;
  value: string;
  unit?: string;
}

interface CriteriaState {
  criteria: Criterion[];
  addCriterion: (criterion: Criterion) => void;
  removeCriterion: (id: string) => void;
  updateCriterion: (id: string, updates: Partial<Criterion>) => void;
  clearCriteria: () => void;
}

export const useCriteriaStore = create<CriteriaState>()(
  persist(
    (set) => ({
      criteria: [],
      addCriterion: (criterion) =>
        set((state) => ({ criteria: [...state.criteria, criterion] })),
      removeCriterion: (id) =>
        set((state) => ({
          criteria: state.criteria.filter((c) => c.id !== id),
        })),
      updateCriterion: (id, updates) =>
        set((state) => ({
          criteria: state.criteria.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      clearCriteria: () => set({ criteria: [] }),
    }),
    {
      name: 'talosix-criteria',
    }
  )
);