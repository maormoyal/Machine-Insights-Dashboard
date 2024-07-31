// src/components/Dashboard/Dashboard.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { insightPresenter } from '../../presenters/InsightPresenter';
import DiagnosticTable from '../DiagnosticTable/DiagnosticTable';
import FusionTrendGraph from '../FusionTrendGraph/FusionTrendGraph';
import Layout from '../Layout/Layout';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const insights = useAppSelector((state) => state.insights.insights);

  useEffect(() => {
    insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.dashboard}>
        <FusionTrendGraph insights={insights} />
        <DiagnosticTable insights={insights} />
      </div>
    </Layout>
  );
};

export default Dashboard;
