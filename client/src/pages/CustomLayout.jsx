import { Box } from "@mui/material";
import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Footer from "../components/Footer";

const CustomLayout = () => {
  const sidebarIsOpen = useSelector((store) => store.app?.openSidebar);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
      }}>
      <Topbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: isMobile ? 0 : sidebarIsOpen ? "15vw" : 0,
            transition: "margin-left .4s ease-in-out",
          }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CustomLayout;
