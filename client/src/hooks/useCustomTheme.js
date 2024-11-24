import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useAutoMode from "./useAutoMode";
import { useLayoutEffect } from "react";
import appConfig from "../configs/app-config";

const useCustomTheme = () => {
  const autoMode = useAutoMode();
  const appMode = useSelector((store) => store.app.mode);
  const mode = useMemo(
    () => (appMode === "auto" ? autoMode : appMode),
    [appMode, autoMode]
  );

  const muiTheme = useMemo(() => {
    const appTheme = appConfig.themes[mode];
    appTheme.components = appConfig.themes.components;
    appTheme.typography = appConfig.themes.typography;
    return createTheme(appTheme);
  }, [mode]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = muiTheme.palette.background.default;
    document.body.style.color = muiTheme.palette.text.primary;
    document.body.style.fontFamily = muiTheme.typography.fontFamily;
    document.querySelector("html").lang = appConfig.lang;
  }, [mode, muiTheme]);

  return muiTheme;
};

export default useCustomTheme;
