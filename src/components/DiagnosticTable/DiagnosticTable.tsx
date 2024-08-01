import React, { useMemo, useState } from 'react';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  Column,
  Row,
  TableInstance,
  TableState,
} from 'react-table';
import { Insight } from '../../shared/types/Insight';
import styles from './DiagnosticTable.module.scss';

import sortIcon from '../../assets/sort.icon.svg';
import sortUpIcon from '../../assets/sort-up.icon.svg';
import sortDownIcon from '../../assets/sort-down.icon.svg';
import AddDiagnosticModal from '../AddDiagnosticModal/AddDiagnosticModal';

interface GlobalFilterProps {
  preGlobalFilteredRows: Row<Insight>[];
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

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
          setGlobalFilter(e.target.value || '');
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
  const [showModal, setShowModal] = useState(false);

  const columns: Column<Insight>[] = useMemo(
    () => [
      {
        Header: 'Diagnostic Date',
        accessor: 'created_at',
        Cell: ({ value }: { value: string }) => {
          const date = new Date(value);
          return `${date.getDate().toString().padStart(2, '0')}.${(
            date.getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}.${date.getFullYear()}`;
        },
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
    <div
      className={styles.DiagnosticTableContainer}
      data-testid='diagnostic-table'
    >
      <div className={styles.entriesTableContainer}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2>Diagnostics</h2>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilterState}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addButton}
          >
            <span className={styles.addIcon}>+</span> Add new
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table {...getTableProps()} className={styles.entriesTable}>
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      // @ts-expect-error: Property 'getSortByToggleProps' does not exist on type 'HeaderGroup<Insight>'
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                    >
                      {column.render('Header')}
                      <span>
                        {/* @ts-expect-error: Property 'isSorted' does not exist on type 'ColumnInstance<Insight>' */}
                        {column.isSorted ? (
                          // @ts-expect-error: Property 'isSortedDesc' does not exist on type 'ColumnInstance<Insight>'
                          column.isSortedDesc ? (
                            <div className={styles.imgWrapper}>
                              <img src={sortDownIcon} alt='sorted descending' />
                            </div>
                          ) : (
                            <div className={styles.imgWrapper}>
                              <img
                                src={sortUpIcon}
                                alt='sorted ascending'
                                width={23}
                              />
                            </div>
                          )
                        ) : (
                          <div className={styles.imgWrapper}>
                            <img
                              className={styles.sort}
                              src={sortIcon}
                              alt='sortable'
                            />
                          </div>
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
      </div>
      <AddDiagnosticModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default DiagnosticTable;
