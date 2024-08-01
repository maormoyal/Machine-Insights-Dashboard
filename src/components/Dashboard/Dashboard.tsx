import React, { useEffect } from 'react';
import {
  useInsightsDispatch,
  useInsightsSelector,
} from '../../hooks/useInsights';
import { insightPresenter } from '../../presenters/InsightPresenter';
import DiagnosticTable from '../DiagnosticTable/DiagnosticTable';
import FusionTrendGraph from '../FusionTrendGraph/FusionTrendGraph';
import Layout from '../Layout/Layout';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const dispatch = useInsightsDispatch();
  const insights = useInsightsSelector((state) => state.insights.insights);

  useEffect(() => {
    insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.dashboard}>
        <FusionTrendGraph
          data-testid='fusion-trend-graph'
          insights={insights}
        />
        <DiagnosticTable data-testid='diagnostic-table' insights={insights} />
      </div>
    </Layout>
  );
};

export default Dashboard;
