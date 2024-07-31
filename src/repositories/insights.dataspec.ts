import { Insight } from '../models/Insight';
export const insightsMockData: Insight[] = [
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
  {
    insight_id: '1',
    created_at: '2024-07-20 12:00:00',
    type: 'NDE bearing inner race deterioration',
    severity: 'critical',
  },
  {
    insight_id: '2',
    created_at: '2024-07-21 10:00:00',
    type: 'NDE bearing inner race deterioration',
    severity: 'alarm',
  },
  {
    insight_id: '3',
    created_at: '2024-07-22 08:00:00',
    type: 'gear',
    severity: 'critical',
  },
  {
    insight_id: '4',
    created_at: '2024-07-23 06:00:00',
    type: 'motor',
    severity: 'critical',
  },
  {
    insight_id: '5',
    created_at: '2024-07-24 04:00:00',
    type: 'NDE bearing inner race deterioration',
    severity: 'alarm',
  },
  {
    insight_id: '6',
    created_at: '2024-07-25 02:00:00',
    type: 'NDE bearing inner race deterioration',
    severity: 'critical',
  },
];
