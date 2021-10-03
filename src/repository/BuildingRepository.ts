import {
  createBuildingUrl,
  getBuildingsUrl,
  getBuildingUrl,
  getSpecificRoomInBuildingAndFloorUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface BuildingRepository {
  createBuilding(
    createBuildingDto: CreateBuildingDto
  ): Promise<void | undefined>;
  getBuildings(): Promise<GetBuildingsResponse | undefined>;
  getBuilding(id: string): Promise<GetBuildingResponse | undefined>;
  getRoomsFromSpecificFloorAndBuilding(
    id: string,
    floor: string
  ): Promise<GetRoomsFromSpecificFloorAndBuildingResponse | undefined>;
}

export interface CreateBuildingDto {
  buildingName: string;
  defaultCostPerMonth: number;
  baseCommonCharge: number;
  address: string;
  roomPrefix: string;
  floors: number;
  rooms: RoomDto[];
}

export interface RoomDto {
  floor: number;
  roomNumber: string;
  size: number;
  type: string;
  costPerMonth: number;
  unit: string;
}

export interface GetBuildingsResponse {
  buildings: BaseBuilding[];
}

export interface BaseBuilding {
  buildingName: string;
  id: string;
}

export interface GetBuildingResponse {
  id: string;
  buildingName: string;
  roomPrefix: number;
  baseCommonCharge: number;
  address: string;
  floors: number;
  totalRoom: number;
  totalOccupiedRoom: number;
}

export interface GetRoomsFromSpecificFloorAndBuildingResponse {
  rooms: RoomInBuilding[];
}

export interface RoomInBuilding {
  roomNumber: string;
  size: number;
  type: string;
  costPerMonth: number;
  purchasePrice: number;
  contractType: string;
}

export const buildingRepository: BuildingRepository = {
  async createBuilding(createBuildingDto: CreateBuildingDto) {
    try {
      await AxiosService.post(createBuildingUrl, createBuildingDto);
    } catch (error) {
      throw error;
    }
  },
  async getBuildings() {
    const result = (
      await AxiosService.get<GetBuildingsResponse>(getBuildingsUrl)
    ).data;
    return result;
  },
  async getBuilding(id: string) {
    const result = (
      await AxiosService.get<GetBuildingResponse>(getBuildingUrl(id))
    ).data;
    return result;
  },
  async getRoomsFromSpecificFloorAndBuilding(id: string, floor: string) {
    const result = (
      await AxiosService.get<GetRoomsFromSpecificFloorAndBuildingResponse>(
        getSpecificRoomInBuildingAndFloorUrl(id, floor)
      )
    ).data;

    return result;
  },
};
