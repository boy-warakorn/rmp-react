import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@stores/stores";

const initialState: UserState = {
  name: "",
  businessName: "",
  role: "",
  userId: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        businessName: string;
        role: string;
        userId: string;
      }>
    ) => {
      const { name, businessName, role, userId } = action.payload;
      state.name = name;
      state.businessName = businessName;
      state.role = role;
      state.userId = userId;
    },
    clearUser: (state) => {
      state.businessName = "";
      state.name = "";
      state.role = "";
      state.userId = "";
    },
  },
});

export default slice.reducer;
export const { setUser, clearUser } = slice.actions;
