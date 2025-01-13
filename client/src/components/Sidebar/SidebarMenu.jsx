import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ label, icon, path }) => {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const handleClick = () => {
    navigateTo(path);
    if (isSmallScreen) dispatch({ type: "app/toggleSidebar" });
  };
  return (
    <ListItemButton onClick={handleClick} selected={pathname === path}>
      <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SidebarMenu;
