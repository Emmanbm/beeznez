const appConfig = {
  name: "BeeZnez",
  version: "1.1.0",
  lang: "fr",
  languages: [
    {
      name: "français",
      code: "fr-FR",
    },
    {
      name: "english",
      code: "en-EN",
    },
  ],
  themes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#4CAF50",
        },
        background: {
          default: "#F5F5F5",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#000000",
          secondary: "#757575",
        },
        action: {
          hover: "#4CAF50",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#FFD700",
        },
        background: {
          default: "#000000",
          paper: "#121212",
        },
        text: {
          primary: "#ffffff",
          secondary: "#bdbdbd",
        },
        action: {
          active: "#FFD700",
        },
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:focus": {
              outline: "none",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  },
};

appConfig;

export default appConfig;
