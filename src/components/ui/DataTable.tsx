import React from 'react';
import { clsx } from 'clsx';
import styles from './DataTable.module.css';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  isMono?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick 
}: DataTableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={clsx(styles.th, col.className)}>
                <span className="type-label">{col.header}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr 
              key={row.id} 
              className={clsx(styles.tr, { [styles.clickable]: onRowClick })}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, idx) => {
                const content = typeof col.accessor === 'function' 
                  ? col.accessor(row) 
                  : (row[col.accessor] as React.ReactNode);
                
                return (
                  <td key={idx} className={clsx(styles.td, col.className, { 'type-mono': col.isMono })}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
