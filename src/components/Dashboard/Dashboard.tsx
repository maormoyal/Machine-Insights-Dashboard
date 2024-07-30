// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { insightPresenter } from '../../presenters/InsightPresenter';
import DiagnosticTable from '../DiagnosticTable/DiagnosticTable';
import FusionTrendGraph from '../FusionTrendGraph/FusionTrendGraph';
import AddDiagnosticModal from '../AddDiagnosticModal/AddDiagnosticModal';
import Layout from '../Layout/Layout';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const insights = useAppSelector((state) => state.insights.insights);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    insightPresenter.loadInsights(dispatch, '2024-01-01 00:00:00');
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.dashboard}>
        <FusionTrendGraph insights={insights} />
        <div className={styles.header}>
          <h2>Diagnostics</h2>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addButton}
          >
            + Add new
          </button>
        </div>
        <DiagnosticTable insights={insights} />
        <AddDiagnosticModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
