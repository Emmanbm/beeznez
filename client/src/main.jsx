import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import useCustomTheme from "./hooks/useCustomTheme.js";
import { ThemeProvider } from "@emotion/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store.js";
import { CssBaseline } from "@mui/material";

const ThemeWrapper = ({ children }) => {
  const theme = useCustomTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeWrapper>
        <CssBaseline />
        <App />
      </ThemeWrapper>
    </ReduxProvider>
  </StrictMode>
);
