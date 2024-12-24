import { Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { readNotification } from "../../redux/user";
import { useDispatch } from "react-redux";
import useServerApi from "../../hooks/useServerApi";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  const [, refresh] = useServerApi(
    {
      url: `/auth/notifications/${notification._id}`,
      method: "PUT",
    },
    { manual: true }
  );
  const markAsRead = async () => {
    try {
      await refresh();
      dispatch(readNotification(notification));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ListItemButton onClick={markAsRead} selected={!notification.isRead}>
        <ListItemText
          primary={notification.title}
          secondary={notification.message}
        />
      </ListItemButton>
      <Divider component='li' />
    </>
  );
};

export default Notification;
