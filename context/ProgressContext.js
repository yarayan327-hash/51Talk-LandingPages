'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  reviewCount: 0,
  completedWords: [],
  dailyGoal: 10, // Default daily goal
  currentStreak: 0,
  lastReviewDate: null,
  isGoalAchieved: false,
};

// Action types
const actionTypes = {
  SET_REVIEW_COUNT: 'SET_REVIEW_COUNT',
  INCREMENT_REVIEW_COUNT: 'INCREMENT_REVIEW_COUNT',
  ADD_COMPLETED_WORD: 'ADD_COMPLETED_WORD',
  SET_DAILY_GOAL: 'SET_DAILY_GOAL',
  RESET_DAILY_PROGRESS: 'RESET_DAILY_PROGRESS',
  UPDATE_STREAK: 'UPDATE_STREAK',
  SET_GOAL_ACHIEVED: 'SET_GOAL_ACHIEVED',
  LOAD_PROGRESS: 'LOAD_PROGRESS',
};

// Reducer function
const progressReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_REVIEW_COUNT:
      return {
        ...state,
        reviewCount: action.payload,
        isGoalAchieved: action.payload >= state.dailyGoal,
      };

    case actionTypes.INCREMENT_REVIEW_COUNT:
      const newReviewCount = state.reviewCount + 1;
      return {
        ...state,
        reviewCount: newReviewCount,
        isGoalAchieved: newReviewCount >= state.dailyGoal,
      };

    case actionTypes.ADD_COMPLETED_WORD:
      const isWordAlreadyCompleted = state.completedWords.some(
        word => word.id === action.payload.id
      );

      if (isWordAlreadyCompleted) {
        return state;
      }

      return {
        ...state,
        completedWords: [...state.completedWords, {
          ...action.payload,
          completedAt: new Date().toISOString()
        }],
        reviewCount: state.reviewCount + 1,
        isGoalAchieved: state.reviewCount + 1 >= state.dailyGoal,
      };

    case actionTypes.SET_DAILY_GOAL:
      return {
        ...state,
        dailyGoal: action.payload,
        isGoalAchieved: state.reviewCount >= action.payload,
      };

    case actionTypes.RESET_DAILY_PROGRESS:
      return {
        ...state,
        reviewCount: 0,
        completedWords: [],
        isGoalAchieved: false,
      };

    case actionTypes.UPDATE_STREAK:
      return {
        ...state,
        currentStreak: action.payload,
        lastReviewDate: new Date().toISOString(),
      };

    case actionTypes.SET_GOAL_ACHIEVED:
      return {
        ...state,
        isGoalAchieved: action.payload,
      };

    case actionTypes.LOAD_PROGRESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// Create context
const ProgressContext = createContext();

// Provider component
export const ProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('wordLearningProgress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        dispatch({
          type: actionTypes.LOAD_PROGRESS,
          payload: parsedProgress,
        });
      } catch (error) {
        console.error('Error loading progress from localStorage:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('wordLearningProgress', JSON.stringify(state));
  }, [state]);

  // Check if we need to reset daily progress (new day)
  useEffect(() => {
    const checkAndResetDailyProgress = () => {
      const now = new Date();
      const today = now.toDateString();
      const lastReview = state.lastReviewDate ? new Date(state.lastReviewDate).toDateString() : null;

      if (lastReview !== today) {
        dispatch({ type: actionTypes.RESET_DAILY_PROGRESS });

        // Update streak based on yesterday's achievement
        if (state.isGoalAchieved && lastReview) {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastReview === yesterday.toDateString()) {
            dispatch({
              type: actionTypes.UPDATE_STREAK,
              payload: state.currentStreak + 1,
            });
          } else {
            dispatch({
              type: actionTypes.UPDATE_STREAK,
              payload: 1,
            });
          }
        }
      }
    };

    checkAndResetDailyProgress();
  }, [state.lastReviewDate, state.isGoalAchieved, state.currentStreak]);

  // Action creators
  const actions = {
    setReviewCount: (count) => {
      dispatch({
        type: actionTypes.SET_REVIEW_COUNT,
        payload: count,
      });
    },

    incrementReviewCount: () => {
      dispatch({
        type: actionTypes.INCREMENT_REVIEW_COUNT,
      });
    },

    addCompletedWord: (word) => {
      dispatch({
        type: actionTypes.ADD_COMPLETED_WORD,
        payload: word,
      });
    },

    setDailyGoal: (goal) => {
      dispatch({
        type: actionTypes.SET_DAILY_GOAL,
        payload: goal,
      });
    },

    updateStreak: (streak) => {
      dispatch({
        type: actionTypes.UPDATE_STREAK,
        payload: streak,
      });
    },

    resetDailyProgress: () => {
      dispatch({
        type: actionTypes.RESET_DAILY_PROGRESS,
      });
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;