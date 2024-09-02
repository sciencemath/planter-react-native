import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const PLANTER_USER_STORE = 'planter-user-store';

type UserStore = {
  isOnboardingFinished: boolean;
  toggleIsOnboarded: () => void;
};

export const useUserStore = create<UserStore>(
  persist<UserStore>(
    (set) => ({
      isOnboardingFinished: false,
      toggleIsOnboarded: () => {
        set((state) => {
          return {
            ...state,
            isOnboardingFinished: !state.isOnboardingFinished,
          };
        });
      },
    }),
    {
      name: PLANTER_USER_STORE,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
