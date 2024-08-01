import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { insightRepository } from '../repositories/InsightRepository';
import { fetchInsights, addInsight } from '../store/actions';
import { Insight } from '../shared/types/Insight';
import { RootState } from '../store/store';

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

class InsightPresenter {
  async loadInsights(dispatch: AppDispatch, fromDate: string) {
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

  async createInsight(dispatch: AppDispatch, insight: Partial<Insight>) {
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
