import { create } from 'zustand';

type ExpandState = {
  expandedRows: Record<string, boolean>;
  toggleRow: (id: string) => void;
};

export const useExpandStore = create<ExpandState>((set) => ({
  expandedRows: {},
  toggleRow: (id: string) => set((state) => ({
    expandedRows: {
      ...state.expandedRows,
      [id]: !state.expandedRows[id],
    },
  })),
}));