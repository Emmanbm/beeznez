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
          main: "#0056D2",
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
          hover: "#0056D2",
        },
        gradient: "linear-gradient(90deg, #0055d2, #f5f5f5)",
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
          // paper: "#121212",
          paper: "#070707",
        },
        text: {
          primary: "#ffffff",
          secondary: "#bdbdbd",
        },
        action: {
          active: "#FFD700",
        },
        gradient: "linear-gradient(75deg, #ffd700, #121212)",
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
      MuiButton: {
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
      // fontFamily: "Roboto, Arial, sans-serif",
      // fontFamily: "OpenSans",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    },
  },
};

export default appConfig;
