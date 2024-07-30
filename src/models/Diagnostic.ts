// src/models/Diagnostic.ts
export interface Diagnostic {
  created_at: string; // YYYY-MM-DD HH:MM:SS
  type: 'NDE bearing inner race deterioration' | 'gear' | 'motor';
  severity: 'healthy' | 'alarm' | 'critical';
}
