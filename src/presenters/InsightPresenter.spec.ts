// src/presenters/InsightPresenter.spec.ts
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { insightRepository } from '../repositories/InsightRepository';
import { fetchInsights, addInsight } from '../store/actions';
import { Insight } from '../shared/types/Insight';
import { RootState } from '../store/store';
import { insightPresenter } from './InsightPresenter';
import { FaultTypeEnum } from '../shared/enums/faultType.enum';
import { SeverityEnum } from '../shared/enums/severity.enum';

jest.mock('../repositories/InsightRepository');

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

describe('InsightPresenter', () => {
  let dispatch: AppDispatch;

  beforeEach(() => {
    dispatch = jest.fn() as unknown as AppDispatch;
    jest.clearAllMocks();
  });

  describe('loadInsights', () => {
    it('dispatches fetchInsights with the fetched insights', async () => {
      const mockInsights: Insight[] = [
        {
          insight_id: '1',
          created_at: '2024-01-01',
          type: FaultTypeEnum.Gear,
          severity: SeverityEnum.Alarm,
        },
      ];
      (insightRepository.getInsights as jest.Mock).mockResolvedValue(
        mockInsights
      );

      await insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');

      expect(insightRepository.getInsights).toHaveBeenCalledWith(
        '2024-01-01 00:00:00'
      );
      expect(dispatch).toHaveBeenCalledWith(fetchInsights(mockInsights));
    });

    it('logs an error if fetching insights fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Fetching error');
      (insightRepository.getInsights as jest.Mock).mockRejectedValue(mockError);

      await insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching insights:',
        mockError
      );
      consoleErrorSpy.mockRestore();
    });

    it('logs an error if fetched data is not an array', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (insightRepository.getInsights as jest.Mock).mockResolvedValue(
        'not an array'
      );

      await insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Fetched data is not an array:',
        'not an array'
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('createInsight', () => {
    it('dispatches addInsight with the created insight', async () => {
      const mockInsight: Partial<Insight> = {
        created_at: '2024-01-01',
        type: FaultTypeEnum.Gear,
        severity: SeverityEnum.Alarm,
      };
      const mockNewInsight = { insight_id: '1' };
      (insightRepository.addInsight as jest.Mock).mockResolvedValue(
        mockNewInsight
      );

      await insightPresenter.createInsight(dispatch, mockInsight);

      expect(insightRepository.addInsight).toHaveBeenCalledWith(mockInsight);
      expect(dispatch).toHaveBeenCalledWith(
        addInsight({
          ...mockInsight,
          insight_id: mockNewInsight.insight_id,
        } as Insight)
      );
    });

    it('logs an error if creating insight fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Creating error');
      (insightRepository.addInsight as jest.Mock).mockRejectedValue(mockError);

      await insightPresenter.createInsight(dispatch, {
        created_at: '2024-01-01',
        type: FaultTypeEnum.Gear,
        severity: SeverityEnum.Alarm,
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error creating insight:',
        mockError
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
