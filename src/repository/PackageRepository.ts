import {
  confirmPackageUrl,
  createPackageUrl,
  deletePackageUrl,
  getPackagesUrl,
  getPackageUrl,
  updatePackageUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface PackageRepository {
  getPackages(
    tab: string,
    roomNumber?: string,
    buildingId?: string
  ): Promise<GetPackages | undefined>;
  createPackage(createPackageDto: CreatePackageDto): Promise<void>;
  getPackage(id: string): Promise<Package | undefined>;
  updatePackage(id: string, updatePackageDto: UpdatePackageDto): Promise<void>;
  deletePackage(id: string): Promise<void>;
  confirmPackage(id: string): Promise<void>;
}

export interface GetPackages {
  packages: Package[][];
  total: number;
  statusCount: PackageStatusCount;
}

export interface PackageStatusCount {
  all: number;
  inStorage: number;
  received: number;
}

export interface UpdatePackageDto {
  note: string;
  arrivedAt: string;
  postalService: string;
}

export interface CreatePackageDto extends UpdatePackageDto {
  roomNumber: string;
}

export interface GetPackagesResponse {
  packages: Package[];
  statusCount: PackageStatusCount;
}

export interface GetPackageResponse extends Package {}

export interface Package {
  id: string;
  roomNumber: string;
  roomOwner: string;
  note: string;
  arrivedAt: string;
  deliveredAt: string;
  status: string;
  postalService: string;
  imgList: string[];
}

export const packageRepository: PackageRepository = {
  async getPackages(tab: string, roomNumber?: string, buildingId?: string) {
    try {
      let result: any;

      result = (
        await AxiosService.get<GetPackagesResponse>(getPackagesUrl, {
          params: {
            status: tab === "-" ? "" : tab,
            roomNumber: roomNumber,
            buildingId: buildingId,
          },
        })
      ).data;

      const formattedPackages = Array.from(
        { length: Math.ceil(result.packages.length / 8) },
        (_, i) => {
          return result.packages.slice(i * 8, i * 8 + 8);
        }
      );

      return {
        packages: formattedPackages,
        total: result.packages.length,
        statusCount: result.statusCount,
      };
    } catch (error) {
      throw error;
    }
  },
  async createPackage(createPackageDto: CreatePackageDto) {
    try {
      await AxiosService.post(createPackageUrl, {
        ...createPackageDto,
        imgList: [],
      });
    } catch (error) {
      throw error;
    }
  },
  async getPackage(id: string) {
    try {
      const result = (await AxiosService.get<Package>(getPackageUrl(id))).data;
      return result;
    } catch (error) {
      throw error;
    }
  },
  async updatePackage(id: string, updatePackageDto: UpdatePackageDto) {
    try {
      await AxiosService.post(updatePackageUrl(id), updatePackageDto);
    } catch (error) {
      throw error;
    }
  },
  async deletePackage(id: string) {
    try {
      await AxiosService.delete(deletePackageUrl(id));
    } catch (error) {
      throw error;
    }
  },
  async confirmPackage(id: string) {
    try {
      await AxiosService.post(confirmPackageUrl(id));
    } catch (error) {
      throw error;
    }
  },
};
