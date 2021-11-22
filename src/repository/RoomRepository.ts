import {
  addRoomOwnerUrl,
  addRoomUrl,
  deleteRoomUrl,
  editRoomOwnerUrl,
  editRoomUrl,
  forceDeleteRoomOwnerUrl,
  getRoomIDListUrl,
  getRoomsUrl,
  getRoomUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface RoomRepository {
  getRooms(
    tab: string,
    roomNumber?: string,
    buildingId?: string
  ): Promise<RoomResponse[] | undefined>;
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
  forceDeleteRoomOwner(roomNumber: string): Promise<void>;
  addRoom(addRoomDto: AddRoomDto): Promise<void>;
  editRoom(editRoomDto: EditRoomDto, roomNumber: string): Promise<void>;
  getRoomIDList(
    allRoom?: boolean,
    buildingId?: string
  ): Promise<string[] | undefined>;
  deleteRoom(roomNumber: string): Promise<void>;
}

export interface RoomResponse {
  id: string;
  roomNumber: string;
  contractType: string;
  packages: number;
  paymentStatus: string;
  lastMoveAt: string;
  size: number;
  unit: string;
  paymentDues?: number;
  packageRemaining?: number;
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
  async getRooms(tab: string, roomNumber?: string, buildingId?: string) {
    try {
      const rooms = (
        await AxiosService.get<GetRoomsResponse>(getRoomsUrl, {
          params: {
            filter_tab: tab === "-" ? "" : tab,
            roomNumber: roomNumber,
            buildingId: buildingId,
          },
        })
      ).data.rooms;
      return rooms.map((room: RoomResponse) => ({
        id: room.id,
        roomNumber: room.roomNumber,
        lastMoveAt: room.lastMoveAt,
        contractType: room.contractType,
        packages: room.packageRemaining!,
        paymentStatus:
          room.paymentDues! > 0
            ? `${room.paymentDues} Payment Dues`
            : "All Paid",
        size: room.size,
        unit: room.unit,
      }));
    } catch (error) {
      throw error;
    }
  },
  async getRoom(roomNumber: string) {
    try {
      const room = (
        await AxiosService.get<GetRoomResponse>(getRoomUrl(roomNumber))
      ).data;
      return room;
    } catch (error) {
      throw error;
    }
  },
  async editRoomOwner(editRoomOwnerDto: EditRoomOwnerDto, roomNumber: string) {
    try {
      await AxiosService.patch(editRoomOwnerUrl(roomNumber), editRoomOwnerDto);
    } catch (error) {
      throw error;
    }
  },
  async addRoomOwner(addRoomOwnerDto: AddRoomOwnerDto, roomNumber: string) {
    try {
      await AxiosService.post(addRoomOwnerUrl(roomNumber), addRoomOwnerDto);
    } catch (error) {
      throw error;
    }
  },
  async deleteRoomOwner(roomNumber: string) {
    try {
      await AxiosService.delete(addRoomOwnerUrl(roomNumber));
    } catch (error) {
      throw error;
    }
  },
  async forceDeleteRoomOwner(roomNumber: string) {
    try {
      await AxiosService.delete(forceDeleteRoomOwnerUrl(roomNumber));
    } catch (error) {
      throw error;
    }
  },
  async addRoom(addRoomDto: AddRoomDto) {
    try {
      await AxiosService.post(addRoomUrl, addRoomDto);
    } catch (error) {
      throw error;
    }
  },
  async editRoom(editRoomDto: EditRoomDto, roomNumber: string) {
    try {
      await AxiosService.post(editRoomUrl(roomNumber), editRoomDto);
    } catch (error) {
      throw error;
    }
  },
  async getRoomIDList(allRoom: boolean, buildingId?: string) {
    try {
      return (
        await AxiosService.get<{ roomNumbers: string[] }>(getRoomIDListUrl, {
          params: { allRoom: allRoom, buildingId: buildingId },
        })
      ).data.roomNumbers;
    } catch (error) {}
  },
  async deleteRoom(roomNumber: string) {
    try {
      await AxiosService.delete(deleteRoomUrl(roomNumber));
    } catch (error) {
      throw error;
    }
  },
};
