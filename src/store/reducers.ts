import { InsightActionTypes, FETCH_INSIGHTS, ADD_INSIGHT } from './actions';
import { Insight } from '../shared/types/Insight';

interface InsightState {
  insights: Insight[];
}

const initialState: InsightState = {
  insights: [],
};

export const insightReducer = (
  state = initialState,
  action: InsightActionTypes
): InsightState => {
  switch (action.type) {
    case FETCH_INSIGHTS:
      return {
        ...state,
        insights: action.payload,
      };
    case ADD_INSIGHT:
      return {
        ...state,
        insights: [...state.insights, action.payload],
      };
    default:
      return state;
  }
};
