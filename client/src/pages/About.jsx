import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container>
      <Typography variant='h3' gutterBottom align='center'>
        À propos de BeeZnez
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 180 }}>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Gestion des employés et freelances
              </Typography>
              <Typography>
                Gérez facilement vos collaborateurs, qu'ils soient permanents ou
                freelances, avec une vue d'ensemble claire de leurs informations
                et emplois du temps.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 180 }}>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Paiements sécurisés
              </Typography>
              <Typography>
                Effectuez des paiements sécurisés en toute transparence, entre
                vos employés et freelances, avec un suivi en temps réel des
                transactions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography component={Link} to='/' textAlign='center'>
            Page d'accueil
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
