// src/models/Insight.ts
export interface Insight {
  insight_id: string;
  created_at: string; // YYYY-MM-DD HH:MM:SS
  type: 'NDE bearing inner race deterioration' | 'gear' | 'motor';
  severity: 'healthy' | 'alarm' | 'critical';
}
