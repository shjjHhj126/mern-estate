import { combineReducers, configureStore } from "@reduxjs/toolkit"; // helps manage the application's state in a global Redux store.
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist"; // persist the state across page reloads or browser sessions.
import storage from "redux-persist/lib/storage";

// combineReducers() : turns an object whose values are different "slice reducer" functions into a single combined reducer function you can pass to Redux Toolkit's configureStore
const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root", // is used to identify the persisted state in the storage.
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, //persistedReducer: a reducer that has been enhanced with persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
