'use client';

import type { EmployeeFormValues } from './EmployeeForm';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useMemo } from 'react';
import {Trash2 } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);
interface Props {
  employees: EmployeeFormValues[];
  onDelete: (employee: EmployeeFormValues) => void;
}
export default function EmployeeTable({ employees, onDelete }: Props) {
  const columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },
    {
      headerName: 'Joining Date',
      field: 'joiningDate',
      sortable: true,
      valueFormatter: (params) => {
        if (!params.value) return '-';
        const dateParts = params.value.split(' ')[0].split('-');
        if (dateParts.length === 3) {
          const year = dateParts[0];
          const month = dateParts[1];
          const day = dateParts[2];
          return `${day}/${month}/${year}`;
        }
        return params.value;
      },
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: { data: EmployeeFormValues }) => (
        <button
          className='text-red-600 hover:text-red-800'
          onClick={() => onDelete(params.data)}
        >
          <Trash2 size={18} />
        </button>
      ),
      sortable: false,
      filter: false,
      cellStyle: { textAlign: 'center' },
      pinned: 'right',
      maxWidth: 100,
      editable: false,
    },
  ];
  const defaultColDef: ColDef = useMemo(
    () => ({
      floatingFilter: true,
      resizable: true,
      editable: true,
      flex: 1,
      minWidth: 150,
      filter: 'agTextColumnFilter',
      suppressFloatingFilterButton: true,
      suppressHeaderFilterButton: true,
    }),
    []
  );
  return (
    <div
      className='ag-theme-alpine'
      style={{ width: '100%', height: 500, marginTop: '2rem' }}
    >
      <AgGridReact
        rowData={employees}
        columnDefs={columnDefs}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 30, 40]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
