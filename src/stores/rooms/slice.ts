import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomResponse } from "@repository/RoomRepository";
import { RoomState } from "@stores/stores";

const initialState: RoomState = {
  rooms: [] as Room[],
};

export interface Room {
  roomNumber: string;
  contractType: string;
  packages: number;
  paymentStatus: string;
  lastMoveAt: string;
  index: number;
  key: string;
  size: number;
  unit: string;
}

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomResponse[]>) {
      state.rooms = action.payload.map((room, index) => ({
        key: `${room.roomNumber}Rooms`,
        contractType: room.contractType,
        lastMoveAt: room.lastMoveAt,
        packages: room.packages,
        paymentStatus: room.paymentStatus,
        index: index,
        roomNumber: room.roomNumber,
        size: room.size,
        unit: room.unit,
      }));
    },
  },
});

export default slice.reducer;
export const { setRooms } = slice.actions;
