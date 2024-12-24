import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const SettingOption = ({ label, icon, action }) => {
  const dispatch = useDispatch();
  return (
    <ListItemButton onClick={() => dispatch(action)}>
      <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SettingOption;
