import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    mode: "dark",
    openSidebar: true,
    openNotifications: false,
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
    toggleNotifications: (state) => {
      state.openNotifications = !state.openNotifications;
    },
  },
});

export const { toggleMode, toggleSidebar } = app.actions;

export default app.reducer;
