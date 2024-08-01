import { FaultTypeEnum } from '../enums/faultType.enum';
import { SeverityEnum } from '../enums/severity.enum';

export interface Insight {
  insight_id: string;
  created_at: string;
  type: FaultTypeEnum;
  severity: SeverityEnum;
}
