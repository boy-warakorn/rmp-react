import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetPackages,
  Package,
  PackageStatusCount,
} from "@repository/PackageRepository";
import { PackageState } from "@stores/stores";

const initialState: PackageState = {
  packages: {} as GetPackages,
  currentPackage: {} as Package,
  statusCount: { all: 0, inStorage: 0, received: 0 } as PackageStatusCount,
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
    setPackageStatusCount(state, action: PayloadAction<PackageStatusCount>) {
      state.statusCount = action.payload;
    },
  },
});

export default slice.reducer;
export const { setPackages, setPackage, setPackageStatusCount } = slice.actions;
