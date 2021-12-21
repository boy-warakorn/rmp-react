import {
  getRecentPackageUrl,
  getRecentReportUrl,
  getRoomDashboardUrl,
  getSummaryUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface DashboardRepository {
  getSummary(): Promise<SummaryResponse | undefined>;
  getRecentPackages(): Promise<RecentPackagesResponse | undefined>;
  getRecentReports(): Promise<RecentReportsResponse | undefined>;
  getDashboardRoom(): Promise<DashboardRoomResponse | undefined>;
}

export interface SummaryResponse {
  count: {
    overdued: number;
    held: number;
    maintenance: number;
    complaint: number;
  };
}
export interface RecentPackagesResponse {
  packages: {
    id: string;
    arrivedAt: string;
    roomNumber: string;
    postalService: string;
    note: string;
  }[];
}
export interface RecentReportsResponse {
  reports: {
    id: string;
    roomNumber: string;
    title: string;
    requestedDate: string;
  }[];
}
export interface DashboardRoomResponse {
  count: {
    totalRoom: number;
    occupiedRoom: number;
  };
}

export const dashboardRepository: DashboardRepository = {
  async getSummary() {
    try {
      const result = await AxiosService.get<SummaryResponse>(getSummaryUrl);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  async getRecentPackages() {
    try {
      const result = await AxiosService.get<RecentPackagesResponse>(
        getRecentPackageUrl
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  async getRecentReports() {
    try {
      const result = await AxiosService.get<RecentReportsResponse>(
        getRecentReportUrl
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  async getDashboardRoom() {
    try {
      const result = await AxiosService.get<DashboardRoomResponse>(
        getRoomDashboardUrl
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
