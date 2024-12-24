import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconBeeZnez from "../assets/IconBeeZnez.svg";
import { useSelector } from "react-redux";

const Blog = () => {
  const navigateTo = useNavigate();
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);

  return (
    <Box sx={{ padding: { sm: 1, xs: 1, md: 4 }, minHeight: "100vh" }}>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 1,
          justifyContent: "space-between",
        }}>
        <Box component='img' src={IconBeeZnez} width={50} />
        <Box>
          <Button
            variant='contained'
            size='small'
            onClick={() => navigateTo("/login")}>
            {!isAuthenticated ? "Se connecter" : "Dashboard"}
          </Button>
        </Box>
      </AppBar>
      <Toolbar />
      <Box sx={{ padding: { sm: 1, xs: 1, md: 2 } }}>
        <Typography variant='h3' component='h1' gutterBottom textAlign='center'>
          Bienvenue sur <span style={{ color: "#FFD700" }}>BeezNez</span>
        </Typography>
        <Typography
          variant='h5'
          gutterBottom
          textAlign='center'
          color='text.secondary'>
          Simplifiez la gestion de vos employés, freelances et entreprises
        </Typography>

        <Paragraph>
          <strong>BeezNez</strong> est une plateforme moderne et intuitive qui
          permet aux entreprises de gérer efficacement leurs employés, leurs
          freelances, et leurs tâches administratives. Que vous soyez une
          entreprise cherchant à centraliser vos processus RH ou un particulier
          souhaitant gérer son emploi du temps et ses paiements, BeezNez est
          conçu pour répondre à vos besoins.
        </Paragraph>

        <Paragraph>
          Notre mission est de rendre la gestion des employés et des freelances
          plus fluide, tout en offrant une expérience utilisateur
          exceptionnelle. Avec des outils innovants et un design centré sur vos
          besoins, BeezNez est votre compagnon idéal pour booster votre
          productivité.
        </Paragraph>

        <Paragraph>
          Rejoignez-nous dès aujourd'hui et découvrez comment BeezNez peut
          transformer la façon dont vous travaillez. Qu'il s'agisse de créer un
          compte pour une entreprise ou pour un particulier, nous avons tout
          prévu pour vous accompagner dans vos objectifs.
        </Paragraph>
      </Box>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Prêt à commencer ?
        </Typography>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          Choisissez votre type de compte pour rejoindre la communauté BeezNez.
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent='center'
          sx={{ marginTop: 2 }}>
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
                  Compte Particulier
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Gérez votre emploi du temps, suivez vos paiements et
                  collaborez avec des entreprises en toute simplicité.
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
                  Compte Entreprise
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Centralisez la gestion de vos employés, gérez vos freelances
                  et simplifiez vos tâches RH.
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
    </Box>
  );
};

const Paragraph = ({ children }) => {
  return (
    <Typography
      variant='h6'
      paragraph
      sx={{ textAlign: { md: "auto", xs: "center", sm: "center" } }}>
      {children}
    </Typography>
  );
};

export default Blog;
