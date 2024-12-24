import CustomCheckbox from "./CustomCheckbox";

export const columns = [
  {
    field: "completed",
    headerName: "État",
    headerAlign: "center",
    align: "center",
    renderCell: CustomCheckbox,
  },
  { field: "name", headerName: "Nom" },
  { field: "description", headerName: "Description" },
  {
    field: "dueDate",
    headerName: "Date d'échéance",
    headerAlign: "center",
    align: "center",
    valueGetter: (value) => {
      if (!value) {
        return null;
      }
      return new Date(value).toLocaleDateString("fr-FR");
    },
  },
  {
    field: "priority",
    headerName: "Priorité",
    headerAlign: "center",
    align: "center",
  },
];
