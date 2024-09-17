import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React from "react";

const CommonTable = (props) => {
  const { isLoading = false, rowData = [], columnDefs = [] } = props;
  return (
    <AgGridReact
      pagination={true}
      loading={isLoading}
      rowData={rowData}
      columnDefs={columnDefs}
      noRowsOverlayComponent={()=> <div className="font-bold text-gray-700">No Data Found.</div>}
    />
  );
};

export default CommonTable;
