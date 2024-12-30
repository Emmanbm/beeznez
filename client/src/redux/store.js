import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user";
import appReducer from "./app";
import tempData from "./tempData";

const userPersistConfig = {
  key: "__BEEZNEZ_USER__",
  storage,
};

const appPersistConfig = {
  key: "__BEEZNEZ_APP__",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  app: persistReducer(appPersistConfig, appReducer),
  tempData,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
