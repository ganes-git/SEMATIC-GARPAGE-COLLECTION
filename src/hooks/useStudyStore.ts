import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TimerMode = 'study' | 'shortBreak' | 'longBreak';

interface StudyStore {
    // Timer State
    timeLeft: number;
    isActive: boolean;
    mode: TimerMode;
    streak: number;
    totalStudyTime: number; // in minutes

    // Actions
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: TimerMode) => void;
    tick: () => void;
    incrementStreak: () => void;
}

const MODES = {
    study: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export const useStudyStore = create<StudyStore>()(
    persist(
        (set, get) => ({
            timeLeft: MODES.study,
            isActive: false,
            mode: 'study',
            streak: 0,
            totalStudyTime: 0,

            startTimer: () => set({ isActive: true }),
            pauseTimer: () => set({ isActive: false }),
            resetTimer: () => set((state) => ({
                isActive: false,
                timeLeft: MODES[state.mode]
            })),

            setMode: (mode) => set({
                mode,
                timeLeft: MODES[mode],
                isActive: false
            }),

            tick: () => {
                const { timeLeft, isActive, mode } = get();
                if (!isActive) return;

                if (timeLeft > 0) {
                    set({ timeLeft: timeLeft - 1 });
                } else {
                    // Timer finished
                    set({ isActive: false });
                    if (mode === 'study') {
                        set((state) => ({
                            streak: state.streak + 1,
                            totalStudyTime: state.totalStudyTime + 25 // Approximate
                        }));
                        // Notification or sound could trigger here
                    }
                }
            },

            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
        }),
        {
            name: 'flowstate-storage',
        }
    )
);
