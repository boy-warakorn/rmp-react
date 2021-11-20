import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "@stores/stores";

const initialState: FilterState = {
  filterRoomNumber: undefined,
  filterBuildingId: undefined,
  filterReportType: undefined,
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterRoomNumber(state, action: PayloadAction<string | undefined>) {
      state.filterRoomNumber = action.payload;
    },
    setFilterBuildingId(state, action: PayloadAction<string | undefined>) {
      state.filterBuildingId = action.payload;
    },
    setFilterReportType(state, action: PayloadAction<string | undefined>) {
      state.filterReportType = action.payload;
    },
    clearFilter(state) {
      state.filterRoomNumber = undefined;
      state.filterBuildingId = undefined;
      state.filterReportType = undefined;
    },
  },
});

export default slice.reducer;
export const {
  setFilterRoomNumber,
  clearFilter,
  setFilterBuildingId,
  setFilterReportType,
} = slice.actions;
