import React from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import RefreshIcon from "@mui/icons-material/Refresh";
import useServerApi from "../../hooks/useServerApi";
import { updateConnectedUser } from "../../redux/user";

const Notifications = () => {
  const open = useSelector((store) => store.tempData?.openNotifications);
  const notifications = useSelector((store) => store.user?.notifications || []);
  const dispatch = useDispatch();
  const [{ loading }, refresh] = useServerApi(
    {
      url: "/auth/notifications",
      method: "GET",
    },
    { manual: true }
  );
  const refreshNotifications = async () => {
    try {
      const response = await refresh();
      // console.log(response);
      const notifications = response.data;
      dispatch(updateConnectedUser({ notifications }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      variant='temporary'
      anchor='right'
      open={open}
      onClose={() => dispatch({ type: "tempData/toggleNotifications" })}>
      <Toolbar />
      <Stack width='100%' alignItems='flex-end'>
        <BtnRefresh
          refreshNotifications={refreshNotifications}
          loading={loading}
        />
      </Stack>

      <List sx={{ width: { xs: "100vw", sm: "100vw", md: "25vw" } }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Vous n'avez aucune notification" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

const BtnRefresh = ({ refreshNotifications, loading }) => {
  return (
    <Tooltip title='Appuyez pour recharger'>
      <IconButton onClick={refreshNotifications} disabled={loading}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Notifications;
