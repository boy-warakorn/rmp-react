import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@stores/stores";

const initialState: UserState = {
  name: "",
  businessName: "",
  role: "",
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
      }>
    ) => {
      const { name, businessName, role } = action.payload;
      state.name = name;
      state.businessName = businessName;
      state.role = role;
    },
    clearUser: (state) => {
      state.businessName = "";
      state.name = "";
      state.role = "";
    },
  },
});

export default slice.reducer;
export const { setUser, clearUser } = slice.actions;
