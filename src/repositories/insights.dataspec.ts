import { Insight } from '../shared/types/Insight';
import { FaultTypeEnum } from '../shared/enums/faultType.enum';
import { SeverityEnum } from '../shared/enums/severity.enum';

export const insightsMockData: Insight[] = [
  {
    insight_id: '15',
    created_at: '2024-06-03 08:00:00',
    type: FaultTypeEnum.Gear,
    severity: SeverityEnum.Healthy,
  },
  {
    insight_id: '16',
    created_at: '2024-06-04 06:00:00',
    type: FaultTypeEnum.Motor,
    severity: SeverityEnum.Critical,
  },
  {
    insight_id: '1',
    created_at: '2024-07-20 12:00:00',
    type: FaultTypeEnum.NDEBearingInnerRaceDeterioration,
    severity: SeverityEnum.Critical,
  },
  {
    insight_id: '2',
    created_at: '2024-07-21 10:00:00',
    type: FaultTypeEnum.NDEBearingInnerRaceDeterioration,
    severity: SeverityEnum.Alarm,
  },
  {
    insight_id: '3',
    created_at: '2024-07-22 08:00:00',
    type: FaultTypeEnum.NDEBearingInnerRaceDeterioration,
    severity: SeverityEnum.Critical,
  },
  {
    insight_id: '4',
    created_at: '2024-07-23 06:00:00',
    type: FaultTypeEnum.Gear,
    severity: SeverityEnum.Critical,
  },
  {
    insight_id: '5',
    created_at: '2024-07-24 04:00:00',
    type: FaultTypeEnum.NDEBearingInnerRaceDeterioration,
    severity: SeverityEnum.Alarm,
  },
  {
    insight_id: '6',
    created_at: '2024-07-25 02:00:00',
    type: FaultTypeEnum.NDEBearingInnerRaceDeterioration,
    severity: SeverityEnum.Critical,
  },
];
