import { AxiosService } from "@services/axios.config";

export interface RoomRepository {
  getRooms(tab: string): Promise<RoomResponse[]> | undefined;
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
export const roomRepository = {
  async getRooms(tab: string) {
    try {
      const rooms = (
        await AxiosService.get("/rooms", {
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
};
