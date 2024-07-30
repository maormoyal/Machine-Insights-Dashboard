// src/presenters/InsightPresenter.ts
import { Dispatch } from 'redux';
import { insightRepository } from '../repositories/InsightRepository';
import { fetchInsights, addInsight } from '../store/actions';
import { Insight } from '../models/Insight';

class InsightPresenter {
  async loadInsights(dispatch: Dispatch, fromDate: string) {
    try {
      const insights = await insightRepository.getInsights(fromDate);
      if (Array.isArray(insights)) {
        dispatch(fetchInsights(insights));
      } else {
        console.error('Fetched data is not an array:', insights);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  }

  async createInsight(dispatch: Dispatch, insight: Partial<Insight>) {
    try {
      const newInsight = await insightRepository.addInsight(insight);
      dispatch(
        addInsight({ ...insight, insight_id: newInsight.insight_id } as Insight)
      );
    } catch (error) {
      console.error('Error creating insight:', error);
    }
  }
}

export const insightPresenter = new InsightPresenter();
