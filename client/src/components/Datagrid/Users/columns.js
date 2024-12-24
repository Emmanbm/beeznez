import ActionsButtons from "./ActionsButtons";

export const columns = [
  {
    field: "firstName",
    headerName: "Prénom",
  },
  {
    field: "lastName",
    headerName: "Nom",
  },
  { field: "email", headerName: "Email" },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    align: "center",
  },
  // {
  //   field: "action",
  //   headerName: "Action",
  //   headerAlign: "center",
  //   align: "center",
  //   renderCell: ActionsButtons,
  // },
];
