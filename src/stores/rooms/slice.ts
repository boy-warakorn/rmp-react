import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetRoomResponse, RoomResponse } from "@repository/RoomRepository";
import { RoomState } from "@stores/stores";

const initialState: RoomState = {
  rooms: [] as Room[],
  currentRoom: {} as RoomDetail,
  roomIdList: [] as string[],
};

export interface Room {
  id: string;
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

export interface RoomDetail extends GetRoomResponse {}

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomResponse[]>) {
      state.rooms = action.payload.map((room, index) => ({
        id: room.id,
        key: `${room.id}Rooms`,
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
    setCurrentRoom(state, action: PayloadAction<RoomDetail>) {
      state.currentRoom = action.payload;
    },
    setRoomIDs(state, action: PayloadAction<string[]>) {
      state.roomIdList = action.payload;
    },
  },
});

export default slice.reducer;
export const { setRooms, setCurrentRoom, setRoomIDs } = slice.actions;
