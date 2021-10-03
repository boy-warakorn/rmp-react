import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BaseBuilding,
  GetBuildingResponse,
  GetBuildingsResponse,
  GetRoomsFromSpecificFloorAndBuildingResponse,
  RoomInBuilding,
} from "@repository/BuildingRepository";
import { BuildingState } from "@stores/stores";

const initialState: BuildingState = {
  buildings: [] as BaseBuilding[],
  currentBuilding: {} as GetBuildingResponse,
  currentFloorRooms: [] as FormattedRoomInBuilding[],
  currentFloor: "",
  currentBuildingId: "",
};

export interface FormattedRoomInBuilding extends RoomInBuilding {
  key: string;
  index: number;
}

const slice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setBuildings(state, action: PayloadAction<GetBuildingsResponse>) {
      state.buildings = action.payload.buildings;
    },
    setCurrentBuilding(state, action: PayloadAction<GetBuildingResponse>) {
      state.currentBuilding = action.payload;
    },
    setCurrentFloorRooms(
      state,
      action: PayloadAction<GetRoomsFromSpecificFloorAndBuildingResponse>
    ) {
      state.currentFloorRooms = action.payload.rooms.map((room, index) => ({
        key: `currentFloorRoom${index}`,
        index: index,
        size: room.size,
        costPerMonth: room.costPerMonth,
        purchasePrice: room.purchasePrice,
        type: room.type,
        roomNumber: room.roomNumber,
        contractType: room.contractType,
      }));
    },
    saveCurrentState(
      state,
      action: PayloadAction<{ currentFloor: string; currentBuildingId: string }>
    ) {
      state.currentFloor = action.payload.currentFloor;
      state.currentBuildingId = action.payload.currentBuildingId;
    },
    clearState(state) {
      state.currentFloor = "";
      state.currentBuildingId = "";
    },
  },
});

export default slice.reducer;
export const {
  setBuildings,
  setCurrentBuilding,
  setCurrentFloorRooms,
  saveCurrentState,
  clearState,
} = slice.actions;
