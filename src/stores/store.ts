import {
  getDefaultMiddleware,
  ThunkAction,
  Action,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { RootState } from "./stores";
import user from "./user/slice";
import room from "./rooms/slice";
import account from "./accounts/slice";
import report from "./reports/slice";
import postal from "./packages/slice";

const middleware = [...getDefaultMiddleware(), logger];

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    user,
    room,
    account,
    report,
    postal,
  },
  middleware,
});
