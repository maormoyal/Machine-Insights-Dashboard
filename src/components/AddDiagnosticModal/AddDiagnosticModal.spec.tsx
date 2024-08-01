import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddDiagnosticModal from './AddDiagnosticModal';
import { SeverityEnum, FaultTypeEnum } from '../../shared/enums';
import { insightPresenter } from '../../presenters/InsightPresenter';
import { useInsightsDispatch } from '../../hooks/useInsights';

jest.mock('../../hooks/useInsights');
jest.mock('../../presenters/InsightPresenter');

const mockUseInsightsDispatch = useInsightsDispatch as jest.Mock;
mockUseInsightsDispatch.mockReturnValue(jest.fn());

describe('AddDiagnosticModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the HTMLDialogElement and its methods
    window.HTMLDialogElement.prototype.showModal = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  it('renders the modal correctly', () => {
    render(<AddDiagnosticModal show={true} onClose={mockOnClose} />);

    expect(screen.getByText('Add New Diagnostic')).toBeInTheDocument();
    expect(screen.getByLabelText('Diagnostic date')).toBeInTheDocument();
    expect(screen.getByLabelText('Fault type')).toBeInTheDocument();
    expect(screen.getByLabelText('Severity')).toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(<AddDiagnosticModal show={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls createInsight with correct data when the save button is clicked', () => {
    render(<AddDiagnosticModal show={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText('Diagnostic date'), {
      target: { value: '2024-05-01' },
    });
    fireEvent.change(screen.getByLabelText('Fault type'), {
      target: { value: FaultTypeEnum.Gear },
    });
    fireEvent.change(screen.getByLabelText('Severity'), {
      target: { value: SeverityEnum.Alarm },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(insightPresenter.createInsight).toHaveBeenCalledWith(
      expect.any(Function),
      {
        created_at: '2024-05-01',
        type: FaultTypeEnum.Gear,
        severity: SeverityEnum.Alarm,
      }
    );
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('disables the save button if the date is not set', () => {
    render(<AddDiagnosticModal show={true} onClose={mockOnClose} />);

    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('enables the save button if the date is set', () => {
    render(<AddDiagnosticModal show={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText('Diagnostic date'), {
      target: { value: '2024-05-01' },
    });

    expect(screen.getByText('Save')).toBeEnabled();
  });
});
