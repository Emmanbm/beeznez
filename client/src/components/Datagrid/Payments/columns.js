const statusLabels = {
  success: "Complété",
  completed: "Complété",
  failed: "Échec",
  pending: "En attente",
  processing: "En cours...",
};

export const columns = [
  {
    field: "id",
    headerName: "ID",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  { field: "payer", headerName: "Payeur" },
  { field: "recipient", headerName: "Bénéficiaire" },
  {
    field: "amount",
    headerName: "Montant",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "currency",
    headerName: "Devise",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "createdAt",
    headerName: "Date",
    type: "dateTime",
    valueGetter: (value) => {
      if (!value) {
        return null;
      }
      return new Date(value);
    },
  },
  {
    field: "status",
    headerName: "Statut",
    headerAlign: "center",
    align: "center",
    valueGetter: (value) => statusLabels[value?.toLowerCase()],
  },
];
