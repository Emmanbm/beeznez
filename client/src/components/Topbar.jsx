import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import SwitchMode from "./SwitchMode";
import UserAvatar from "./UserAvatar";
import BadgeNotifications from "./NotificationsComponent/BadgeNotifications";
import { useTheme } from "@emotion/react";

const Topbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleToggleSidebar = () => {
    if (isMobile) {
      dispatch({ type: "tempData/toggleAll", payload: false });
    }
    dispatch({ type: "app/toggleSidebar" });
  };
  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
      <Toolbar>
        {isAuthenticated && (
          <IconButton color='inherit' onClick={handleToggleSidebar}>
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
