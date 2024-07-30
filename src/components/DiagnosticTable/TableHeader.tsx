// src/components/DiagnosticTable/TableHeader.tsx
import React from 'react';
import { HeaderGroup } from 'react-table';
import { Insight } from '../../models/Insight';

interface Props {
  headerGroup: HeaderGroup<Insight>;
}

const TableHeader: React.FC<Props> = ({ headerGroup }) => {
  const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
  return (
    <tr key={key} {...headerGroupProps}>
      {headerGroup.headers.map((column) => {
        const { key, ...columnProps } = column.getHeaderProps();
        return (
          <th key={key} {...columnProps}>
            {column.render('Header')}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
