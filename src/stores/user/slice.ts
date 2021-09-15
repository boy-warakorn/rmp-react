import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  businessName: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; businessName: string }>
    ) => {
      const { name, businessName } = action.payload;
      state.name = name;
      state.businessName = businessName;
    },
    clearUser: (state) => {
      state.businessName = "";
      state.name = "";
    },
  },
});

export default slice.reducer;
export const { setUser, clearUser } = slice.actions;
