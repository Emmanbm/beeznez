import { alpha, Box, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import CustomToolbar from "./CustomToolbar";

const noSortableColumns = ["action", "completed", "logo"];

const RenderDataGrid = ({
  loading,
  rows,
  columns,
  width = 1000,
  containerProps,
  ...props
}) => {
  const renderColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      flex: 1,
      headerName: column.headerName.toLocaleUpperCase(),
      sortable: !noSortableColumns.includes(column.field),
      headerClassName: "HeaderDataGrid",
    }));
  }, []);
  return (
    <Box
      height='100%'
      minWidth='100%'
      width={width}
      overflow='auto'
      sx={{
        "& .HeaderDataGrid": {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
        },
      }}
      {...containerProps}>
      <DataGrid
        rows={rows}
        columns={renderColumns}
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
        }}
        disableRowSelectionOnClick
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        {...props}
      />
    </Box>
  );
};

export default RenderDataGrid;
