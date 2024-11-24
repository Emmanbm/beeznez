import { configureStore } from "@reduxjs/toolkit";
import app from "./app";
import user, { checkSession } from "./user";

const store = configureStore({
  reducer: { app, user },
});

store.dispatch(checkSession());

export default store;
