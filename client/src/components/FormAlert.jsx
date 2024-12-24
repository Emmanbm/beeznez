import { Alert } from "@mui/material";
import React from "react";

const FormAlert = ({ error }) => {
  if (!error) return null;
  const message =
    error.response?.data?.message ||
    "Une erreur s'est produite, veuillez réessayer !";
  return <Alert severity='error'>{message}</Alert>;
};

export default FormAlert;
