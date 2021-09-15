import {
  getDefaultMiddleware,
  ThunkAction,
  Action,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { RootState } from "./stores";
import userReducer from "./user/slice";

const middleware = [...getDefaultMiddleware(), logger];

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware,
});
