// src/store/actions.ts
import { Insight } from '../models/Insight';

export const FETCH_INSIGHTS = 'FETCH_INSIGHTS';
export const ADD_INSIGHT = 'ADD_INSIGHT';

interface FetchInsightsAction {
  type: typeof FETCH_INSIGHTS;
  payload: Insight[];
}

interface AddInsightAction {
  type: typeof ADD_INSIGHT;
  payload: Insight;
}

export type InsightActionTypes = FetchInsightsAction | AddInsightAction;

export const fetchInsights = (insights: Insight[]): InsightActionTypes => ({
  type: FETCH_INSIGHTS,
  payload: insights,
});

export const addInsight = (insight: Insight): InsightActionTypes => ({
  type: ADD_INSIGHT,
  payload: insight,
});
