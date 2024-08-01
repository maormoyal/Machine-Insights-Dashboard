import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { insightRepository } from './InsightRepository';
import { insightsMockData } from './insights.dataspec';
import { Insight } from '../shared/types/Insight';
import { FaultTypeEnum } from '../shared/enums/faultType.enum';
import { SeverityEnum } from '../shared/enums/severity.enum';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('InsightRepository', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch insights from API', async () => {
    const mockData: Insight[] = [
      {
        insight_id: '1',
        created_at: '2024-05-01 00:00:00',
        type: FaultTypeEnum.Gear,
        severity: SeverityEnum.Alarm,
      },
    ];
    mock
      .onGet('/api/insights', { params: { from_date: '2024-05-01' } })
      .reply(200, mockData);

    const insights = await insightRepository.getInsights('2024-05-01');
    expect(insights).toEqual(mockData);
  });

  it('should return mock data if API request fails', async () => {
    mock
      .onGet('/api/insights', { params: { from_date: '2024-05-01' } })
      .networkError();

    const insights = await insightRepository.getInsights('2024-05-01');
    expect(insights).toEqual(insightsMockData);
  });

  it('should add a new insight and return its id', async () => {
    const newInsight: Partial<Insight> = {
      created_at: '2024-05-01 00:00:00',
      type: FaultTypeEnum.Motor,
      severity: SeverityEnum.Critical,
    };
    const mockResponse = { insight_id: 'mock-uuid' };
    mock.onPost('/api/insights').reply(200, mockResponse);

    const response = await insightRepository.addInsight(newInsight);
    expect(response).toEqual(mockResponse);
  });

  it('should return a mock UUID if adding a new insight fails', async () => {
    const newInsight: Partial<Insight> = {
      created_at: '2024-05-01 00:00:00',
      type: FaultTypeEnum.Motor,
      severity: SeverityEnum.Critical,
    };
    mock.onPost('/api/insights').networkError();

    const response = await insightRepository.addInsight(newInsight);
    expect(response).toEqual({ insight_id: 'mock-uuid' });
  });
});
