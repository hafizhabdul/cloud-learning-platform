import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { UserProgress, CloudProvider, LearningPath } from '../types';

interface AppState {
  user: {
    id: string;
    name: string;
    email: string;
    progress: UserProgress;
  } | null;
  selectedProvider: CloudProvider | null;
  currentLearningPath: LearningPath | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'SET_SELECTED_PROVIDER'; payload: CloudProvider }
  | { type: 'SET_CURRENT_LEARNING_PATH'; payload: LearningPath }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'UPDATE_PROGRESS'; payload: { moduleId: string; score: number } };

const initialState: AppState = {
  user: {
    id: 'user-1',
    name: 'Cloud Learner',
    email: 'learner@example.com',
    progress: {
      userId: 'user-1',
      completedModules: [],
      scores: {},
      certifications: [],
      totalHours: 0,
      streakDays: 0,
      lastActivity: new Date(),
    },
  },
  selectedProvider: null,
  currentLearningPath: null,
  theme: 'light',
  sidebarOpen: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SELECTED_PROVIDER':
      return { ...state, selectedProvider: action.payload };
    case 'SET_CURRENT_LEARNING_PATH':
      return { ...state, currentLearningPath: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'UPDATE_PROGRESS':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          progress: {
            ...state.user.progress,
            completedModules: state.user.progress.completedModules.includes(action.payload.moduleId)
              ? state.user.progress.completedModules
              : [...state.user.progress.completedModules, action.payload.moduleId],
            scores: {
              ...state.user.progress.scores,
              [action.payload.moduleId]: action.payload.score,
            },
            lastActivity: new Date(),
          },
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
