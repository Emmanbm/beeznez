import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const User = ({ user }) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={user?.email} />
    </ListItemButton>
  );
};

export default User;
