import React, { useMemo } from "react";
import UsersDatagrid from "../components/Datagrid/Users/UsersDatagrid";
import { Box, Typography } from "@mui/material";
import ModalUser from "../components/Datagrid/Users/ModalUser";
import { useSelector } from "react-redux";

const Users = () => {
  const role = useSelector((store) => store.user.role);
  const pageTitle = useMemo(() => {
    if (role === "admin") {
      return "Liste des utilisateurs";
    } else if (role === "manager") {
      return "Liste des employés & freelances";
    } else {
      return "Utilisateurs";
    }
  }, [role]);
  return (
    <Box>
      <ModalUser />
      <Box>
        <Typography variant='h4' gutterBottom>
          {pageTitle}
        </Typography>
        <Typography variant='subtitle2' gutterBottom color='text.secondary'>
          Effectuez des actions comme les paiements, la modification, la
          suppression, etc.
        </Typography>
      </Box>
      <UsersDatagrid />
    </Box>
  );
};

export default Users;
