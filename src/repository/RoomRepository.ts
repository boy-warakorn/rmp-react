import {
  addRoomOwnerUrl,
  addRoomUrl,
  editRoomOwnerUrl,
  editRoomUrl,
  getRoomsUrl,
  getRoomUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface RoomRepository {
  getRooms(tab: string): Promise<RoomResponse[] | undefined>;
  getRoom(roomNumber: string): Promise<GetRoomResponse | undefined>;
  editRoomOwner(
    editRoomOwnerDto: EditRoomOwnerDto,
    roomNumber: string
  ): Promise<void>;
  addRoomOwner(
    addRoomOwnerDto: AddRoomOwnerDto,
    roomNumber: string
  ): Promise<void>;
  deleteRoomOwner(roomNumber: string): Promise<void>;
  addRoom(addRoomDto: AddRoomDto): Promise<void>;
  editRoom(editRoomDto: EditRoomDto, roomNumber: string): Promise<void>;
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

export interface EditRoomOwnerDto {
  name: string;
  phoneNumber: string;
  citizenNumber: string;
}

export interface AddRoomOwnerDto extends EditRoomOwnerDto {
  email: string;
}

export interface EditRoomDto {
  size: string;
  unit: string;
  pricePerMonth: number;
  type: string;
  purchasePrice: number;
}

export interface AddRoomDto extends EditRoomDto {
  roomNumber: string;
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

export const roomRepository: RoomRepository = {
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
  async editRoomOwner(editRoomOwnerDto: EditRoomOwnerDto, roomNumber: string) {
    try {
      await AxiosService.patch(editRoomOwnerUrl(roomNumber), editRoomOwnerDto);
    } catch (error) {}
  },
  async addRoomOwner(addRoomOwnerDto: AddRoomOwnerDto, roomNumber: string) {
    try {
      await AxiosService.post(addRoomOwnerUrl(roomNumber), addRoomOwnerDto);
    } catch (error) {}
  },
  async deleteRoomOwner(roomNumber: string) {
    try {
      await AxiosService.delete(addRoomOwnerUrl(roomNumber));
    } catch (error) {}
  },
  async addRoom(addRoomDto: AddRoomDto) {
    try {
      await AxiosService.post(addRoomUrl, addRoomDto);
    } catch (error) {}
  },
  async editRoom(editRoomDto: EditRoomDto, roomNumber: string) {
    try {
      await AxiosService.post(editRoomUrl(roomNumber), editRoomDto);
    } catch (error) {}
  },
};
