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
  getPackages(tab: string): Promise<GetPackages | undefined>;
  createPackage(createPackageDto: CreatePackageDto): Promise<void>;
  getPackage(id: string): Promise<Package | undefined>;
  updatePackage(id: string, updatePackageDto: UpdatePackageDto): Promise<void>;
  deletePackage(id: string): Promise<void>;
  confirmPackage(id: string): Promise<void>;
}

export interface GetPackages {
  packages: Package[][];
  total: number;
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
}

export const packageRepository: PackageRepository = {
  async getPackages(tab: string) {
    try {
      const result = (
        await AxiosService.get<GetPackagesResponse>(getPackagesUrl, {
          params: { status: tab === "-" ? "" : tab },
        })
      ).data.packages;

      const formattedPackages = Array.from(
        { length: Math.ceil(result.length / 8) },
        (_, i) => {
          return result.slice(i * 8, i * 8 + 8);
        }
      );

      return {
        packages: formattedPackages,
        total: result.length,
      };
    } catch (error) {}
  },
  async createPackage(createPackageDto: CreatePackageDto) {
    try {
      await AxiosService.post(createPackageUrl, createPackageDto);
    } catch (error) {}
  },
  async getPackage(id: string) {
    try {
      const result = (await AxiosService.get<Package>(getPackageUrl(id))).data;
      return result;
    } catch (error) {}
  },
  async updatePackage(id: string, updatePackageDto: UpdatePackageDto) {
    try {
      await AxiosService.post(updatePackageUrl(id), updatePackageDto);
    } catch (error) {}
  },
  async deletePackage(id: string) {
    try {
      await AxiosService.delete(deletePackageUrl(id));
    } catch (error) {}
  },
  async confirmPackage(id: string) {
    try {
      await AxiosService.post(confirmPackageUrl(id));
    } catch (error) {}
  },
};
