// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { insightReducer } from './reducers';

export const store = configureStore({
  reducer: {
    insights: insightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
