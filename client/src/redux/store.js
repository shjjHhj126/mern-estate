import { combineReducers, configureStore } from "@reduxjs/toolkit"; // helps manage the application's state in a global Redux store.
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist"; // persist the state across page reloads or browser sessions.
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
