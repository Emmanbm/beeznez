import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChangeModeButton from "./ChangeModeButton";
import { useNavigate } from "react-router-dom";
import IconBeeZnez from "../assets/IconBeeZnez.svg";

const DefaultHeader = () => {
  const navigateTo = useNavigate();
  return (
    <AppBar position='stactic'>
      <Toolbar>
        <Box
          width='100%'
          display='flex'
          gap={2}
          alignItems='center'
          justifyContent='space-between'>
          <Box
            component='img'
            src={IconBeeZnez}
            onClick={() => navigateTo("/")}
            width={50}
          />
          <Stack direction='row' spacing={1}>
            <Tooltip title="Retour à la page d'accueil">
              <IconButton color='error' onClick={() => navigateTo("/")}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <ChangeModeButton color='error' />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DefaultHeader;
