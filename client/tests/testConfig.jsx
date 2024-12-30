import React from "react";
import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import { MemoryRouter } from "react-router-dom"; // Utilisé pour simuler un routeur
import store, { persistor } from "../src/redux/store";
import useCustomTheme from "../src/hooks/useCustomTheme";

// Un wrapper pour inclure toutes les configurations nécessaires
const ThemeWrapper = ({ children }) => {
  const theme = useCustomTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeWrapper>
      </PersistGate>
    </ReduxProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export { customRender as render };
