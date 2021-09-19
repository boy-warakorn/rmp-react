import { getReportsUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface ReportRepository {
  getReports(tab: string): Promise<GetReportsResponse | undefined>;
}

export interface GetReportsResponse {
  reports: ReportResponse[];
}

export interface ReportResponse {
  id: string;
  roomNumber: string;
  reportOwner: string;
  requestedDate: string;
  resolvedDate: string;
  title: string;
  detail: string;
  status: string;
}

export const reportRepository: ReportRepository = {
  async getReports(tab: string) {
    try {
      const reports = (
        await AxiosService.get<GetReportsResponse>(getReportsUrl, {
          params: {
            status: tab === "-" ? "" : tab,
          },
        })
      ).data;
      return reports;
    } catch (error) {}
  },
};
