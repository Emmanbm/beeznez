import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ChangeModeButton = ({ ...props }) => {
  const mode = useSelector((store) => store.app.mode);
  const dispatch = useDispatch();

  return (
    <Tooltip title='Changer de thème'>
      <IconButton
        aria-label='Changer de thème'
        color='primary'
        onClick={() => dispatch({ type: "app/toggleMode" })}
        {...props}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ChangeModeButton;
