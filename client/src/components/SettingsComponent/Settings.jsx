import React, { useMemo } from "react";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { settingsOptions } from "./settingsOptions";
import SettingOption from "./SettingOption";
import UserAvatar from "../UserAvatar";

const Settings = () => {
  const open = useSelector((store) => store.tempData?.openSettings);
  const { firstName, lastName, email, role } = useSelector(
    (store) => store.user || {}
  );
  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );
  return (
    <Drawer variant='persistent' anchor='right' open={open}>
      <Toolbar />
      <List sx={{ width: { xs: "100vw", sm: "100vw", md: "25vw" } }}>
        <ListItem>
          <ListItemAvatar>
            <UserAvatar size={40} />
          </ListItemAvatar>
          <ListItemText
            primary={fullName}
            secondary={
              <>
                <Typography
                  component='span'
                  variant='body2'
                  sx={{ color: "text.primary", display: "inline" }}>
                  {role?.toLocaleUpperCase()}
                </Typography>
                {` - ${email}`}
              </>
            }
          />
        </ListItem>
        <Divider component='li' />
        {settingsOptions.map((option) => (
          <SettingOption key={option.id} {...option} />
        ))}
      </List>
    </Drawer>
  );
};

export default Settings;
