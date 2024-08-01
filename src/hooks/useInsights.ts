// src/hooks/useInsights.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useInsightsDispatch = () => useDispatch<AppDispatch>();
export const useInsightsSelector: TypedUseSelectorHook<RootState> = useSelector;
