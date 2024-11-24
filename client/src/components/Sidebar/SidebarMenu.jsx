import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ label, icon, path }) => {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  return (
    <ListItemButton
      onClick={() => navigateTo(path)}
      selected={pathname === path}>
      <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SidebarMenu;
