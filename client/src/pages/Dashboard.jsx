import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DashboardCard from "../components/Dashboard/DashboardCard";
import useServerApi from "../hooks/useServerApi";

const Dashboard = () => {
  const {
    id: userId,
    role,
    companyId,
    firstName,
  } = useSelector((store) => store.user || {});

  const [stats, setStats] = useState([]);
  const requestRef = useRef("allowed");

  const [{ loading, error }, refresh] = useServerApi(
    {
      url: "/auth/stats",
      method: "get",
    },
    { manual: true }
  );

  const getStats = async () => {
    try {
      const response = await refresh({ params: { userId, role, companyId } });
      setStats(response.data);
      requestRef.current = "allowed";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestRef.current === "allowed") {
      requestRef.current = "denied";
      if (userId && role) {
        getStats();
      }
    }
  }, [userId, role, companyId]);
  if (loading) return <Box>Chargement...</Box>;
  if (error) return <Box>Erreur: {error.message}</Box>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5' gutterBottom>
        Bienvenue sur la Dashboard, {firstName}
      </Typography>
      <Grid
        container
        padding={1}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {stats?.map((card, index) => (
          <DashboardCard key={index} card={card} />
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
