import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionReducer from "./connectionSlice.js";
import requestReducer from "./requestSlice.js";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionReducer,
  request: requestReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "feed", "connection", "request"], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);
export default appStore;