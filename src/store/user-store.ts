import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// JSON only store string dates.
const initialState = {
  birthDate: new Date(2001, 8, 9).toISOString(),
  lifeExpectancy: 100,
};

type UserState = typeof initialState & {
  setBirthDate: (date: Date) => void;
  setLifeExpectancy: (years: number) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      setBirthDate: (date: Date) => set({ birthDate: date.toISOString() }),
      setLifeExpectancy: (years: number) => set({ lifeExpectancy: years }),
      reset: () => set(initialState),
      ...initialState,
    }),
    { name: 'user-storage' }
  )
);
