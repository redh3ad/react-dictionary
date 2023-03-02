import { configureStore } from '@reduxjs/toolkit';
import wordSlice from './wordSlice';

export const store = configureStore({
  reducer: { word: wordSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
