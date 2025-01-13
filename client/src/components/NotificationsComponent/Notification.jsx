import { Box, Divider, ListItemButton, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { readNotification } from "../../redux/user";
import { useDispatch } from "react-redux";
import useServerApi from "../../hooks/useServerApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Error";
import ErrorIcon from "@mui/icons-material/Cancel";

const Notification = ({ notification }) => {
  // console.log(notification);
  const { _id, isRead, title, createdAt, message, type } = notification;
  const dispatch = useDispatch();
  const [, refresh] = useServerApi(
    {
      url: `/auth/notifications/${_id}`,
      method: "PUT",
    },
    { manual: true }
  );

  const icon = useMemo(() => {
    switch (type) {
      case "success":
        return <CheckCircleIcon color='success' />;
      case "warning":
        return <InfoIcon color='warning' />;
      case "error":
        return <ErrorIcon color='error' />;
      default:
        return <InfoIcon color='info' />;
    }
  }, [type]);
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
      <ListItemButton
        onClick={markAsRead}
        selected={!isRead}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}>
        <Stack
          width='100%'
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Typography
            variant='body1'
            // fontWeight={540}
            noWrap
            sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {icon}
        </Stack>
        <Typography variant='body2'>
          {new Date(createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          {message}
        </Typography>
      </ListItemButton>
      <Divider component='li' />
    </>
  );
};

export default Notification;
