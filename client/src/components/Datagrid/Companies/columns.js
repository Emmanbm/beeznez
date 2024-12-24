import CompanyLogo from "./CompanyLogo";

export const columns = [
  {
    field: "name",
    headerName: "Nom",
  },
  {
    field: "email",
    headerName: "Email de contact",
  },
  { field: "website", headerName: "Site internet" },
  {
    field: "logo",
    headerName: "Logo",
    headerAlign: "center",
    align: "center",
    renderCell: CompanyLogo,
  },
];
