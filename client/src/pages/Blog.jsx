import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CookieBanner from "../components/CookieBanner";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import IconBeeZnez from "../assets/IconBeeZnez.svg";

const Blog = () => {
  const navigateTo = useNavigate();
  const mode = useSelector((store) => store.app.mode);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        px: { sm: 1, xs: 1, md: 4 },
        minHeight: "100vh",
        position: "relative",
      }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={1}
        mb={1}
        alignItems={isMobile ? "auto" : "center"}>
        <Box
          component='img'
          src={IconBeeZnez}
          width={isMobile ? "25%" : "10vw"}
        />
        <Stack
          direction='row'
          px={1}
          flex={1}
          spacing={1}
          width='100%'
          justifyContent={isMobile ? "space-between" : "end"}>
          <Tooltip title='Changer de thème'>
            <IconButton
              aria-label='Changer de thème'
              color='primary'
              onClick={() => dispatch({ type: "app/toggleMode" })}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <Button
            size='small'
            variant='outlined'
            sx={{ textTransform: isMobile ? "none" : "auto" }}
            startIcon={<EmailIcon />}
            onClick={() => navigateTo("/contact")}>
            Nous contacter
          </Button>
          <Button
            size='small'
            variant='outlined'
            sx={{ textTransform: isMobile ? "none" : "auto" }}
            startIcon={<LoginIcon />}
            onClick={() => navigateTo("/login")}>
            Se connecter
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ padding: { sm: 1, xs: 1, md: 2 } }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component='h1'
          gutterBottom
          textAlign='center'>
          Bienvenue sur <span style={{ color: "#FFD700" }}>BeeZnez</span>
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          textAlign='center'
          color='text.secondary'>
          Simplifiez la gestion de vos employés, freelances et entreprises
        </Typography>

        <Paragraph>
          <strong>BeeZnez</strong> est une plateforme moderne et intuitive qui
          permet aux entreprises de gérer efficacement leurs employés, leurs
          freelances, et leurs tâches administratives. Que vous soyez une
          entreprise cherchant à centraliser vos processus RH ou un particulier
          souhaitant gérer son emploi du temps et ses paiements, BeeZnez est
          conçu pour répondre à vos besoins.
        </Paragraph>

        <Paragraph>
          Notre mission est de rendre la gestion des employés et des freelances
          plus fluide, tout en offrant une expérience utilisateur
          exceptionnelle. Avec des outils innovants et un design centré sur vos
          besoins, BeeZnez est votre compagnon idéal pour booster votre
          productivité.
        </Paragraph>

        <Paragraph>
          Rejoignez-nous dès aujourd'hui et découvrez comment BeeZnez peut
          transformer la façon dont vous travaillez. Qu'il s'agisse de créer un
          compte pour une entreprise ou pour un particulier, nous avons tout
          prévu pour vous accompagner dans vos objectifs.
        </Paragraph>
      </Box>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <CookieBanner />
        <Typography variant='h5' component='h2' gutterBottom>
          Prêt à commencer ?
        </Typography>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          Choisissez votre type de compte pour rejoindre la communauté BeeZnez.
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
                  aria-label='Button créer un compte particulier'
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
                <Typography variant='body1' gutterBottom>
                  Compte Entreprise
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Centralisez la gestion de vos employés, gérez vos freelances
                  et simplifiez vos tâches RH.
                </Typography>
                <Button
                  variant='contained'
                  color='secondary'
                  aria-label='Button créer un compte entreprise'
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
      variant='body1'
      paragraph
      sx={{ textAlign: { md: "auto", xs: "center", sm: "center" } }}>
      {children}
    </Typography>
  );
};

export default Blog;
