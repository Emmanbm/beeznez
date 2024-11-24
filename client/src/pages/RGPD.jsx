import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const RGPD = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Link to='/'>
        <Typography variant='body2' color='inherit'>
          Retour à la page d'accueil
        </Typography>
      </Link>
      <Typography variant='h4' gutterBottom>
        Règlement Général sur la Protection des Données (RGPD)
      </Typography>
      <Typography variant='body1'>
        Voici toutes les informations concernant vos données personnelles...
      </Typography>
    </Box>
  );
};

export default RGPD;
