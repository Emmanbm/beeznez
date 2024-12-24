import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        py: 3,
        mt: "auto",
        display: "flex",
        minWidth: "100%",
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#444444"}`,
      }}>
      <Container maxWidth='lg'>
        <Typography variant='body2' color='textSecondary' align='center'>
          &copy; {new Date().getFullYear()} <Link to='/blog'>BeeZnez</Link>.
          Tous droits réservés.
        </Typography>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
          <Link to='/rgpd'>
            <Typography variant='body2' color='inherit'>
              RGPD
            </Typography>
          </Link>
          <Link to='/cgu'>
            <Typography variant='body2' color='inherit'>
              CGU
            </Typography>
          </Link>
          <Link to='/contact'>
            <Typography variant='body2' color='inherit'>
              Contactez-nous
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
