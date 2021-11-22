import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountResponse,
  AccountStatusCount,
  GetAccountResponse,
} from "@repository/AccountRepository";
import { AccountState } from "@stores/stores";

const initialState: AccountState = {
  accounts: [] as Account[],
  currentAccount: {} as AccountDetail,
  statusCount: {
    all: 0,
    admin: 0,
    resident: 0,
    personnel: 0,
  } as AccountStatusCount,
};

export interface Account {
  userId: string;
  role: string;
  name: string;
  createdAt: string;
  key: string;
  index: number;
}

export interface AccountDetail extends GetAccountResponse {}

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
    setAccount(state, action: PayloadAction<AccountDetail>) {
      state.currentAccount = action.payload;
    },
    setAccountStatusCount(state, action: PayloadAction<AccountStatusCount>) {
      state.statusCount = action.payload;
    },
  },
});

export default slice.reducer;
export const { setAccounts, setAccount, setAccountStatusCount } = slice.actions;
