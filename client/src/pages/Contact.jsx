import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ContactForm from "../components/ContactForm";
import AnimationBeeZnez from "../assets/AnimationBeeZnez.gif";
import AnimationBeeZnezWhite from "../assets/AnimationBeeZnezWhite.gif";
import Footer from "../components/Footer";

const Contact = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      minWidth='100vw'
      minHeight='100vh'
      display='flex'
      flexDirection='column'
      alignItems='space-between'
      pt={5}>
      <Box px={2} mb={2}>
        <Typography variant='h3' component='h1' gutterBottom textAlign='center'>
          Contactez-nous
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          gutterBottom>
          Vous avez une question, une demande de service ou tout simplement
          besoin d'aide ? N'hésitez pas à nous contacter.
        </Typography>
        <Stack direction='row' width='100%' justifyContent='center' spacing={2}>
          <ContactForm />
          {isDesktop && (
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Box
                component='img'
                aria-label='Animation BeeZnez'
                borderRadius={2}
                src={
                  theme.palette.mode === "light"
                    ? AnimationBeeZnezWhite
                    : AnimationBeeZnez
                }
                width='60%'
              />
            </Box>
          )}
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Contact;
