import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

interface DataTableProps<T> {
  rows: T[];
  columns: GridColDef[];
}
const DataTable = <T extends {}>({ rows, columns }: DataTableProps<T>) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        pageSizeOptions={[5]}
        disableColumnMenu
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default DataTable;
