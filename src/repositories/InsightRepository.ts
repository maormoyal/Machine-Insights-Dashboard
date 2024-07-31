import { Insight } from '../models/Insight';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { insightsMockData } from './insights.dataspec';

class InsightRepository {
  async getInsights(fromDate: string): Promise<Insight[]> {
    // Mock implementation
    return axios
      .get<Insight[]>('/api/insights', { params: { from_date: fromDate } })
      .then((response) => {
        if (Array.isArray(response.data)) {
          return response.data;
        }
        throw new Error('Response data is not an array');
      })
      .catch(() => insightsMockData);
  }

  async addInsight(insight: Partial<Insight>): Promise<{ insight_id: string }> {
    // Mock implementation
    return axios
      .post('/api/insights', insight)
      .then((response) => response.data)
      .catch(() => ({ insight_id: uuidv4() }));
  }
}

export const insightRepository = new InsightRepository();
