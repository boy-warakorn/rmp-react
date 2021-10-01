import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "@stores/stores";

const initialState: FilterState = {
  filterRoomNumber: undefined,
};

const slice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setFilterRoomNumber(state, action: PayloadAction<string>) {
      state.filterRoomNumber = action.payload;
    },
    clearFilter(state) {
      state.filterRoomNumber = undefined;
    },
  },
});

export default slice.reducer;
export const { setFilterRoomNumber, clearFilter } = slice.actions;
