import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "@repository/AccountRepository";
import { AccountState } from "@stores/stores";

const initialState: AccountState = {
  accounts: [] as Account[],
};

export interface Account {
  userId: string;
  role: string;
  name: string;
  createdAt: string;
  key: string;
  index: number;
}

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<AccountResponse[]>) {
      state.accounts = action.payload.map((room, index) => ({
        key: `${room.userId}Rooms`,
        index: index,
        userId: room.userId,
        role: room.role,
        createdAt: room.createdAt,
        name: room.name,
      }));
    },
  },
});

export default slice.reducer;
export const { setAccounts } = slice.actions;
