import React from "react";
import UsersDatagrid from "../../components/Datagrid/Users/UsersDatagrid";
import { Container, Typography } from "@mui/material";

const Employees = () => {
  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom>
        Tous les employés
      </Typography>
      <UsersDatagrid />
    </Container>
  );
};

export default Employees;
