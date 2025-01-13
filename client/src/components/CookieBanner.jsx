import React, { useMemo } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookie } from "../redux/app";

const CookieBanner = () => {
  const cookiesAccepted = useSelector((store) => store.app?.cookiesAccepted);
  const isBannerVisible = useMemo(
    () => !Boolean(cookiesAccepted),
    [cookiesAccepted]
  );
  const dispatch = useDispatch();
  const handleAcceptCookies = (cookie) => {
    dispatch(acceptCookie(cookie));
  };
  const theme = useTheme();

  return (
    isBannerVisible && (
      <Box
        sx={{
          position: "fixed",
          minHeight: 115,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.palette.gradient,
          color: theme.palette.text.primary,
          backdropFilter: "blur(25px)",
          padding: 2,
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1200,
        }}>
        <Typography variant='body1' sx={{ flex: 1, mr: 2 }}>
          Nous utilisons des cookies pour améliorer votre expérience. Consultez
          notre{" "}
          <Link to='/privacy-policy' target='_blank'>
            <b>politique de confidentialité</b>
          </Link>
          .
        </Typography>
        <Box display='flex' gap={1}>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => handleAcceptCookies("all")}>
            Accepter tous les cookies
          </Button>
          <Button
            size='small'
            variant='outlined'
            color='primary'
            onClick={() => handleAcceptCookies("essential")}>
            Accepter les essentiels
          </Button>
        </Box>
      </Box>
    )
  );
};

export default CookieBanner;
