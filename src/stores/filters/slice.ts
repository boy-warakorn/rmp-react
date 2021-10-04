import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "@stores/stores";

const initialState: FilterState = {
  filterRoomNumber: undefined,
  filterBuildingId: undefined,
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
    clearFilter(state) {
      state.filterRoomNumber = undefined;
      state.filterBuildingId = undefined;
    },
  },
});

export default slice.reducer;
export const { setFilterRoomNumber, clearFilter, setFilterBuildingId } =
  slice.actions;
