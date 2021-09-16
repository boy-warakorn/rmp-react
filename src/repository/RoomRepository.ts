import { getRoomsUrl, getRoomUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface RoomRepository {
  getRooms(tab: string): Promise<RoomResponse[]> | undefined;
  getRoom(roomNumber: string): Promise<GetRoomResponse> | undefined;
}

export interface RoomResponse {
  roomNumber: string;
  contractType: string;
  packages: number;
  paymentStatus: string;
  lastMoveAt: string;
  size: number;
  unit: string;
}

export interface GetRoomsResponse {
  rooms: RoomResponse[];
}

export interface GetRoomResponse {
  resident: {
    name: string;
    phoneNumber: string;
    citizenNumber: string;
  };
  room: {
    roomNumber: string;
    size: number;
    type: string;
    pricePerMonth: number;
    purchasePrice: number;
    unit: string;
    lastMoveAt: string;
  };
  status: string;
}

export const roomRepository = {
  async getRooms(tab: string) {
    try {
      const rooms = (
        await AxiosService.get<GetRoomsResponse>(getRoomsUrl, {
          params: {
            filter_tab: tab === "-" ? "" : tab,
          },
        })
      ).data.rooms;
      return rooms.map((room: any) => ({
        roomNumber: room.roomNumber,
        lastMoveAt: room.lastMoveAt,
        contractType: room.contractType,
        packages: 0,
        paymentStatus: "All Paid",
        size: room.size,
        unit: room.unit,
      }));
    } catch (error) {}
  },

  async getRoom(roomNumber: string) {
    try {
      const room = (
        await AxiosService.get<GetRoomResponse>(getRoomUrl(roomNumber))
      ).data;
      return room;
    } catch (error) {}
  },
};
