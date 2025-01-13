import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    mode: "light",
    openSidebar: true,
    cookiesAccepted: null,
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    toggleSidebar: (state, action) => {
      const newState = action.payload;
      if (typeof newState === "boolean") {
        state.openSidebar = newState;
      } else {
        state.openSidebar = !state.openSidebar;
      }
    },
    acceptCookie: (state, action) => {
      state.cookiesAccepted = action.payload;
    },
  },
});

export const { toggleMode, toggleSidebar, acceptCookie } = app.actions;

export default app.reducer;
