import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ProtectedRoute from "../router/ProtectedRoute";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Bienvenue sur la Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Employés</Typography>
            <Typography variant='h4'>42</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Congés en attente</Typography>
            <Typography variant='h4'>5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Paiements</Typography>
            <Typography variant='h4'>€ 15,000</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
