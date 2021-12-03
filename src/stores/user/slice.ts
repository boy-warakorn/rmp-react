import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCurrentUserResponse } from "@repository/UserRepository";
import { UserState } from "@stores/stores";

const initialState: UserState = {
  user: {
    businessName: "",
    id: "",
    createdAt: "",
    profile: {
      name: "",
      role: "",
      citizenNumber: "",
      username: "",
      email: "",
      phoneNumber: "",
    },
  } as GetCurrentUserResponse,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetCurrentUserResponse>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export default slice.reducer;
export const { setUser, clearUser } = slice.actions;
