import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Footer from "../components/Footer";
import Settings from "../components/SettingsComponent/Settings";
import UpdateUser from "../components/UpdateUser/UpdateUser";
import Sidebar from "../components/Sidebar/Sidebar";
import Notifications from "../components/NotificationsComponent/Notifications";

const CustomLayout = () => {
  const sidebarIsOpen = useSelector((store) => store.app?.openSidebar);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (isMobile) {
      dispatch({ type: "app/toggleSidebar", payload: false });
    }
  }, [isMobile]);

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
        <Notifications />
        <Settings />
        <UpdateUser />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: isMobile ? 0 : sidebarIsOpen ? "15vw" : 0,
            minWidth: sidebarIsOpen ? "calc(100% - 15vw)" : "100%",
            overflow: "auto",
            transition: "all .8s ease-in-out",
          }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CustomLayout;
