import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
  headCells: {
    style: {
      paddingTop: '8px', // override the cell padding for head cells
      paddingBottom: '8px',
      fontSize: 15,
      fontWeight: 'bolder',
      background: '#8c8c8c',
      color: '#fff',

      '&:hover': {
        color: '#fff',
      },
    },
  },
};

type props = {
  columnDefs: any;
  rowData: any;
};

export default function ReactDataTable({ columnDefs, rowData }: props) {
  if (rowData !== null) {
    return (
      <DataTable
        columns={columnDefs}
        customStyles={customStyles}
        data={rowData}
        fixedHeader
        pagination
      />
    );
  } else {
    return null;
  }
}
