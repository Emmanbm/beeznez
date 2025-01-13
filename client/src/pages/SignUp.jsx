import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader";

const SignUp = () => {
  const navigateTo = useNavigate();
  return (
    <Box minHeight='100vh' width='100vw'>
      <DefaultHeader />
      <Toolbar />
      <Grid
        container
        flex={1}
        spacing={2}
        justifyContent='center'
        alignItems='center'>
        <Grid item>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 200,
              }}>
              <Typography variant='h6' gutterBottom>
                Joindre en tant que Particulier
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='center'>
                Gérez votre emploi du temps, suivez vos paiements et collaborez
                avec des entreprises en toute simplicité.
              </Typography>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => navigateTo("/register/user")}>
                Créer un compte Particulier
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent
              sx={{
                display: "flex",
                minHeight: 200,
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <Typography variant='h6' gutterBottom>
                Joindre en tant qu'Entreprise
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='center'>
                Centralisez la gestion de vos employés, gérez vos freelances et
                simplifiez vos tâches RH.
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => navigateTo("/register/user-and-company")}>
                Créer un compte Entreprise
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
