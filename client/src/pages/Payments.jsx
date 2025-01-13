import React from "react";
import { Box, Typography } from "@mui/material";
import PaymentsDataGrid from "../components/Datagrid/Payments/PaymentsDataGrid";

const Payments = () => {
  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Historique des paiements
      </Typography>
      <PaymentsDataGrid />
    </Box>
  );
};

export default Payments;
