import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const DashboardCard = ({ card }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid item md={4} sm={4} xs={2}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        <Typography variant={isMobile ? "h6" : "h5"} textAlign='center'>
          {card.title}
        </Typography>
        <Typography
          noWrap
          sx={{ flexGrow: 1 }}
          variant={isMobile ? "h4" : "h2"}
          //   variant={isMobile ? (card.isDate ? "h6" : "h4") : "h2"}
          textAlign='center'>
          {card.value}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default DashboardCard;
