import { Badge, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";

const BadgeNotifications = () => {
  const notifications = useSelector((store) => store.user?.notifications || []);
  // console.log(notifications);

  const dispatch = useDispatch();
  const nbrUnreadNotifications = useMemo(() => {
    return notifications.filter((notification) => notification.isRead === false)
      .length;
  }, [notifications]);
  return (
    <IconButton
      aria-label='notifications'
      onClick={() => dispatch({ type: "tempData/toggleNotifications" })}
      color='inherit'>
      <Badge badgeContent={nbrUnreadNotifications} color='success'>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default BadgeNotifications;
