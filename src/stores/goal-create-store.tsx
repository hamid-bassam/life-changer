import { create } from 'zustand';
import { SubGoalInputType, TagInputType } from '../_components/Goal/GoalInputUtils';

interface GoalStore {
  tags: TagInputType[];
  setTags: (tags: TagInputType[]) => void;
  subGoals: SubGoalInputType[];
  addSubGoal: (subGoal: SubGoalInputType) => void;
  clearSubGoals: () => void;
}

export const useGoalCreateStore = create<GoalStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  subGoals: [],
  addSubGoal: (subGoal) => set((state) => ({ subGoals: [...state.subGoals, subGoal] })),
  clearSubGoals: () => set({ subGoals: [] }),
}));