import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user";
import appReducer from "./app";
import tempData from "./tempData";

const userPersistConfig = {
  key: "__BEEZNEZ_USER__",
  storage,
  // transforms: [expireUser],
};

const appPersistConfig = {
  key: "__BEEZNEZ_APP__",
  storage,
  // transforms: [expireApp],
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
  // .concat((api) => (next) => (action) => {
  //   const state = api.getState();

  //   const userElapsedTime = state.user?.elapsedTime;
  //   const userExpirationTime = getExpirationTime({ s: 6 });
  //   const currentTime = Date.now();

  //   if (
  //     userElapsedTime &&
  //     currentTime - userElapsedTime > userExpirationTime
  //   ) {
  //     console.log(
  //       currentTime,
  //       userElapsedTime,
  //       userExpirationTime,
  //       currentTime - userElapsedTime
  //     );
  //     console.log(action);
  //     action.store = {
  //       ...state,
  //       user: userInitialState,
  //     };
  //   }
  //   next(action);
  // }),
});

export const persistor = persistStore(store);

export default store;
