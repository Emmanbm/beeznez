// src/components/Topbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/app";
import SwitchMode from "./SwitchMode";

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color='inherit' onClick={() => dispatch(toggleSidebar())}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
          BeeZnez
        </Typography>
        <Stack spacing={{ xs: 1, sm: 1, md: 2 }} direction='row'>
          <SwitchMode />
          <IconButton color='inherit'>
            <NotificationsIcon />
          </IconButton>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
