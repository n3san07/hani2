import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ Users }) {
  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 40,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.count}
        </div>
      ),
    },
    {
      field: "Picture",
      headerName: "Picture",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.Picture}
          width={40}
          height={40}
          alt={`Picture ${params.row.id}`}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    { field: "Name", headerName: "Name", width: 160 },
    { field: "Email", headerName: "Email", width: 250 },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      width: 250,
    },
  ];

  Users.forEach((row, index) => {
    row.count = index + 1;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        density="comfortable"
        rows={Users}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
