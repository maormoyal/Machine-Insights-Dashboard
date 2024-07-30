// src/repositories/InsightRepository.ts
import { Insight } from '../models/Insight';
import axios from 'axios';

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
      .catch(() => [
        {
          insight_id: '1',
          created_at: '2024-05-20 12:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'critical',
        },
        // More mock data
        {
          insight_id: '2',
          created_at: '2024-05-21 10:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'alarm',
        },
        {
          insight_id: '3',
          created_at: '2024-05-22 08:00:00',
          type: 'gear',
          severity: 'healthy',
        },
        {
          insight_id: '4',
          created_at: '2024-05-23 06:00:00',
          type: 'motor',
          severity: 'critical',
        },
        // Add more objects here
        {
          insight_id: '5',
          created_at: '2024-05-24 04:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'alarm',
        },
        {
          insight_id: '6',
          created_at: '2024-05-25 02:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'healthy',
        },
        {
          insight_id: '7',
          created_at: '2024-05-26 00:00:00',
          type: 'gear',
          severity: 'critical',
        },
        {
          insight_id: '8',
          created_at: '2024-05-27 22:00:00',
          type: 'motor',
          severity: 'alarm',
        },
        {
          insight_id: '9',
          created_at: '2024-05-28 20:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'healthy',
        },
        {
          insight_id: '10',
          created_at: '2024-05-29 18:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'critical',
        },
        {
          insight_id: '11',
          created_at: '2024-05-30 16:00:00',
          type: 'gear',
          severity: 'alarm',
        },
        {
          insight_id: '12',
          created_at: '2024-05-31 14:00:00',
          type: 'motor',
          severity: 'healthy',
        },
        {
          insight_id: '13',
          created_at: '2024-06-01 12:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'critical',
        },
        {
          insight_id: '14',
          created_at: '2024-06-02 10:00:00',
          type: 'NDE bearing inner race deterioration',
          severity: 'alarm',
        },
        {
          insight_id: '15',
          created_at: '2024-06-03 08:00:00',
          type: 'gear',
          severity: 'healthy',
        },
        {
          insight_id: '16',
          created_at: '2024-06-04 06:00:00',
          type: 'motor',
          severity: 'critical',
        },
      ]);
  }

  async addInsight(insight: Partial<Insight>): Promise<{ insight_id: string }> {
    // Mock implementation
    return axios
      .post('/api/insights', insight)
      .then((response) => response.data)
      .catch(() => ({ insight_id: 'new-id' }));
  }
}

export const insightRepository = new InsightRepository();
