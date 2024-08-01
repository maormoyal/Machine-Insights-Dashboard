import React, { useState } from 'react';
import { useInsightsDispatch } from '../../hooks/useInsights';
import { insightPresenter } from '../../presenters/InsightPresenter';
import Modal from '../Modal/Modal';
import styles from './AddDiagnosticModal.module.scss';
import { FaultTypeEnum } from '../../shared/enums/faultType.enum';
import { SeverityEnum } from '../../shared/enums/severity.enum';

interface AddDiagnosticModalProps {
  show: boolean;
  onClose: () => void;
}

const AddDiagnosticModal: React.FC<AddDiagnosticModalProps> = ({
  show,
  onClose,
}) => {
  const [createdAt, setCreatedAt] = useState('');
  const [type, setType] = useState<FaultTypeEnum>(
    FaultTypeEnum.NDEBearingInnerRaceDeterioration
  );
  const [severity, setSeverity] = useState<SeverityEnum>(SeverityEnum.Healthy);
  const dispatch = useInsightsDispatch();

  const handleSubmit = () => {
    if (!createdAt) return;
    const newDiagnostic = { created_at: createdAt, type, severity };
    insightPresenter.createInsight(dispatch, newDiagnostic);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>Add New Diagnostic</h2>
        <div className={styles.formGroup}>
          <label htmlFor='createdAt'>Diagnostic date</label>
          <input
            id='createdAt'
            type='date'
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='type'>Fault type</label>
          <select
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value as FaultTypeEnum)}
          >
            <option value='NDE bearing inner race deterioration'>
              NDE bearing inner race deterioration
            </option>
            <option value='gear'>Gear</option>
            <option value='motor'>Motor</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='severity'>Severity</label>
          <select
            id='severity'
            value={severity}
            onChange={(e) => setSeverity(e.target.value as SeverityEnum)}
          >
            <option value='healthy'>Healthy</option>
            <option value='alarm'>Alarm</option>
            <option value='critical'>Critical</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={styles.saveButton}
            disabled={!createdAt}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddDiagnosticModal;
