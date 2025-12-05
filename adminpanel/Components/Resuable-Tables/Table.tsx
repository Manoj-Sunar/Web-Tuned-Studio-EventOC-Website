"use client";

import React, { useCallback, useState, memo, JSX } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Loader from "../Loader";

// ⭐ Column now supports custom rendering
export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => JSX.Element | string;
}

export interface TableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  rowKey?: keyof T;
  loading?: Record<string, boolean>;
}

// ⭐ Optimized generic table
function TableInner<T extends Record<string, any>>({
  columns,
  data,
  onEdit,
  onDelete,
  rowKey,
  loading,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Unique row key
  const getRowKey = useCallback(
    (row: T) => (rowKey ? String(row[rowKey]) : crypto.randomUUID()),
    [rowKey]
  );


  // Select all rows
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedRows(new Set(data.map(getRowKey)));
      } else {
        setSelectedRows(new Set());
      }
    },
    [data, getRowKey]
  );



  // Select single row
  const handleSelectRow = useCallback(
    (row: T, checked: boolean) => {
      const key = getRowKey(row);
      setSelectedRows((prev) => {
        const updated = new Set(prev);
        checked ? updated.add(key) : updated.delete(key);
        return updated;
      });
    },
    [getRowKey]
  );



  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedRows.size === data.length && data.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>

            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-3 font-semibold text-gray-700 text-[13px]"
              >
                {col.header}
              </th>
            ))}

            <th className="px-4 py-3 font-semibold text-gray-700 text-[13px]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => {
              const key = getRowKey(row);
              const isSelected = selectedRows.has(key);

              return (
                <tr
                  key={key}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors "
                >
                  {/* Row checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      className="h-4 w-4 rounded border-gray-300"
                      onChange={(e) => handleSelectRow(row, e.target.checked)}
                    />
                  </td>

                  {/* Table Cells */}
                  {columns.map((col) => {
                    const value = row[col.accessor];
                    return (
                      <>
                        {col.accessor === "coverImageUrl" ? (
                          <td key={String(col.accessor)} className="px-4 py-3">
                            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                              <img
                                src={value}
                                alt={col.accessor as string}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                        ) : (
                          <td
                            key={String(col.accessor)}
                            className="px-4 py-3 text-gray-700 text-[14px] whitespace-nowrap"
                          >
                            {col.render ? col.render(value, row) : String(value)}
                          </td>
                        )}
                      </>
                    );
                  })}

                  {/* Actions */}
                  <td className="px-4 py-3 flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row?.id)}
                        className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => onDelete(row?.id)}
                        className="p-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        {loading?.[row?.id] ? <Loader /> : <Trash2 className="w-4 h-4 text-red-500" />}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-4 py-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Memo wrapper
const Table = memo(TableInner) as <T extends Record<string, any>>(
  props: TableProps<T>
) => JSX.Element;

export default Table;
