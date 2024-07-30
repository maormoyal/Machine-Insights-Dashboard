// src/components/DiagnosticTable/TableRow.tsx
import React from 'react';
import { Row } from 'react-table';
import { Insight } from '../../models/Insight';

interface Props {
  row: Row<Insight>;
}

const TableRow: React.FC<Props> = ({ row }) => {
  const { key, ...rowProps } = row.getRowProps();
  return (
    <tr key={key} {...rowProps}>
      {row.cells.map((cell) => {
        const { key, ...cellProps } = cell.getCellProps();
        return (
          <td key={key} {...cellProps}>
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
