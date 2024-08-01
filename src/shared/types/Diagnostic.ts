import { FaultTypeEnum } from '../enums/faultType.enum';
import { SeverityEnum } from '../enums/severity.enum';

export interface Diagnostic {
  created_at: string;
  type: FaultTypeEnum;
  severity: SeverityEnum;
}
