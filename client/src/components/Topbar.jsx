import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import SwitchMode from "./SwitchMode";
import UserAvatar from "./UserAvatar";
import BadgeNotifications from "./BadgeNotifications";

const Topbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // backgroundColor: (theme) => theme.palette.background.default,
      }}>
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color='inherit'
            onClick={() => dispatch({ type: "app/toggleSidebar" })}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
          BeeZnez
        </Typography>
        <Stack
          spacing={{ xs: 1, sm: 1, md: 2 }}
          direction='row'
          alignItems='center'>
          <SwitchMode />
          {isAuthenticated && (
            <>
              <BadgeNotifications />
              <IconButton
                color='inherit'
                onClick={() => dispatch({ type: "tempData/toggleSettings" })}>
                <UserAvatar />
              </IconButton>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
