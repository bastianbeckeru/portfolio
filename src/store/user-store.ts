import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = { birthDate: new Date(2001, 8, 9) };

type UserState = typeof initialState & {
  setBirthDate: (date: Date) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      setBirthDate: (date: Date) => set({ birthDate: date }),
      reset: () => set(initialState),
      ...initialState,
    }),
    { name: 'user-storage' }
  )
);
