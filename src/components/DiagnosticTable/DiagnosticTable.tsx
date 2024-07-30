// src/components/DiagnosticTable/DiagnosticTable.tsx
import React, { useMemo } from 'react';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  Column,
  Row,
  TableInstance,
  TableState,
} from 'react-table';
import { Insight } from '../../models/Insight';
import styles from './DiagnosticTable.module.scss';

import sortIcon from '../../assets/sort.icon.svg';
import sortUpIcon from '../../assets/sort-up.icon.svg';
import sortDownIcon from '../../assets/sort-down.icon.svg';

interface GlobalFilterProps {
  preGlobalFilteredRows: Row<Insight>[];
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

// Define a default UI for filtering
const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <div className={styles.tableSearchWrapper}>
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || ''); // Set empty string to remove the filter entirely
        }}
        placeholder={`Search in ${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </div>
  );
};

interface DiagnosticTableProps {
  insights: Insight[];
}

const DiagnosticTable: React.FC<DiagnosticTableProps> = ({ insights }) => {
  const columns: Column<Insight>[] = useMemo(
    () => [
      {
        Header: 'Diagnostic Date',
        accessor: 'created_at',
        Cell: ({ value }: { value: string }) =>
          new Date(value).toLocaleString(),
      },
      {
        Header: 'Fault Type',
        accessor: 'type',
      },
      {
        Header: 'Severity',
        accessor: 'severity',
      },
    ],
    []
  );

  const data = useMemo(() => insights, [insights]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter: setGlobalFilterState,
    state,
  } = useTable<Insight>(
    {
      columns,
      data,
      initialState: { globalFilter: '' } as Partial<TableState<Insight>>,
    },
    useGlobalFilter,
    useSortBy
  ) as TableInstance<Insight> & {
    preGlobalFilteredRows: Row<Insight>[];
    setGlobalFilter: (filterValue: string) => void;
    state: TableState<Insight> & { globalFilter: string };
  };

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilterState}
      />
      <div className={styles.entriesTableContainer}>
        <table {...getTableProps()} className={styles.entriesTable}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img src={sortDownIcon} alt='sorted descending' />
                        ) : (
                          <img src={sortUpIcon} alt='sorted ascending' />
                        )
                      ) : (
                        <img src={sortIcon} alt='sortable' width={15} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  No results found
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td {...cell.getCellProps()} key={cellIndex}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DiagnosticTable;
