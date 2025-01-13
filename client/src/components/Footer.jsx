import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import IconBeeZnez from "../assets/IconBeeZnez.svg";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        py: 1.5,
        // bottom: 0,
        mt: "auto",
        display: "flex",
        minWidth: "100vw",
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === "light" ? "#e0e0e0" : "#444444"}`,
      }}>
      <Container maxWidth='lg'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          spacing={2}>
          <Link to='/'>
            <Box component='img' src={IconBeeZnez} width={30} />
          </Link>
          <Typography variant='body2' color='textSecondary' align='center'>
            &copy; {new Date().getFullYear()} <Link to='/'>BeeZnez</Link>. Tous
            droits réservés.
          </Typography>
        </Stack>
        <Box
          sx={{ mt: 0.5, display: "flex", justifyContent: "center", gap: 2 }}>
          <Typography
            variant='body2'
            component={Link}
            to='/privacy-policy'
            target='_blank'
            color='inherit'>
            Politique de confidentialité
          </Typography>
          <Typography
            variant='body2'
            component={Link}
            to='/about'
            color='inherit'>
            À Propos
          </Typography>
          <Typography
            variant='body2'
            component={Link}
            to='/contact'
            color='inherit'>
            Contactez-nous
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
