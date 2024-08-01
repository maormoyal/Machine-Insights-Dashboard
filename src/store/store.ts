import { configureStore } from '@reduxjs/toolkit';
import { insightReducer } from './reducers';

export const store = configureStore({
  reducer: {
    //@ts-expect-error - ignore the error for now
    insights: insightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
