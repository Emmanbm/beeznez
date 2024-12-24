import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Typography variant='h1'>Erreur 404</Typography>
      <Typography component={Link} to='/'>
        Revenir à la page d'accueil
      </Typography>
    </>
  );
};

export default NotFound;
