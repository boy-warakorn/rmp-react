import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetPackages, Package } from "@repository/PackageRepository";
import { PackageState } from "@stores/stores";

const initialState: PackageState = {
  packages: {} as GetPackages,
  currentPackage: {} as Package,
};

const slice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackages(state, action: PayloadAction<GetPackages>) {
      state.packages = action.payload;
    },
    setPackage(state, action: PayloadAction<Package>) {
      state.currentPackage = action.payload;
    },
  },
});

export default slice.reducer;
export const { setPackages, setPackage } = slice.actions;
