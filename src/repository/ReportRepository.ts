import {
  getPendingCountUrl,
  getReportsUrl,
  getReportUrl,
  replyReportUrl,
  resolveReportUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface ReportRepository {
  getReports(
    tab: string,
    roomNumber?: string
  ): Promise<GetReportsResponse | undefined>;
  getReport(id: string): Promise<GetReportResponse | undefined>;
  replyReport(id: string, replyReportDto: ReplyReportDto): Promise<void>;
  resolveReport(id: string): Promise<void>;
  getPendingReportCount(): Promise<number | void>;
}

export interface ReplyReportDto {
  detail: string;
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

export interface GetReportResponse {
  id: string;
  content: {
    reportOwner: string;
    title: string;
    detail: string;
    respondDetail: string;
  };
  roomNumber: string;
  requestedDate: string;
  resolvedDate: string;
  status: string;
}

export interface GetReportCountResponse {
  count: number;
}

export const reportRepository: ReportRepository = {
  async getReports(tab: string, roomNumber?: string) {
    try {
      const reports = (
        await AxiosService.get<GetReportsResponse>(getReportsUrl, {
          params: {
            status: tab === "-" ? "" : tab,
            roomNumber: roomNumber,
          },
        })
      ).data;
      return reports;
    } catch (error) {
      throw error;
    }
  },
  async getReport(id: string) {
    try {
      const report = (
        await AxiosService.get<GetReportResponse>(getReportUrl(id))
      ).data;
      return report;
    } catch (error) {
      throw error;
    }
  },
  async replyReport(id: string, replyReportDto: ReplyReportDto) {
    try {
      await AxiosService.post(replyReportUrl(id), replyReportDto);
    } catch (error) {
      throw error;
    }
  },
  async resolveReport(id: string) {
    try {
      await AxiosService.post(resolveReportUrl(id));
    } catch (error) {
      throw error;
    }
  },
  async getPendingReportCount() {
    try {
      return (
        await AxiosService.get<GetReportCountResponse>(getPendingCountUrl)
      ).data.count;
    } catch (error) {}
  },
};
