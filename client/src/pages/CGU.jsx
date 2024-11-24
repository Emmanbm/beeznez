import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CGU = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Link to='/'>
        <Typography variant='body2' color='inherit'>
          Retour à la page d'accueil
        </Typography>
      </Link>
      <Typography variant='h4' gutterBottom>
        Conditions Générales d'Utilisation (CGU)
      </Typography>
      <Typography variant='body1'>
        Voici les conditions générales pour utiliser cette application...
      </Typography>
    </Box>
  );
};

export default CGU;
