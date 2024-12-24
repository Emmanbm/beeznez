import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    mode: "light",
    openSidebar: true,
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
  },
});

export const { toggleMode, toggleSidebar } = app.actions;

export default app.reducer;
