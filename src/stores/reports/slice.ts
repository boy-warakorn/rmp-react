import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetReportResponse,
  GetReportsResponse,
  ReportResponse,
  ReportStatusCount,
} from "@repository/ReportRepository";
import { ReportState } from "@stores/stores";

const initialState: ReportState = {
  reports: [] as Report[],
  currentReport: {} as ReportDetail,
  statusCount: {
    all: 0,
    pending: 0,
    resolved: 0,
    responded: 0,
  } as ReportStatusCount,
};

export interface Report extends ReportResponse {
  key: string;
  index: number;
}

export interface ReportDetail extends GetReportResponse {}

const slice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReports(state, action: PayloadAction<GetReportsResponse>) {
      state.reports = action.payload.reports.map((report, index) => ({
        key: `${report.id}Reports`,
        index: index,
        id: report.id,
        detail: report.detail,
        roomNumber: report.roomNumber,
        reportOwner: report.reportOwner,
        requestedDate: report.requestedDate,
        resolvedDate: !report.resolvedDate
          ? "Not Resolved"
          : report.resolvedDate,
        title: report.title,
        status: report.status,
        resolvedBy: report.resolvedBy,
        imgList: report.imgList,
        type: report.type,
      }));
    },
    setReport(state, action: PayloadAction<GetReportResponse>) {
      state.currentReport = action.payload;
    },
    setReportStatusCount(state, action: PayloadAction<ReportStatusCount>) {
      state.statusCount = action.payload;
    },
  },
});

export default slice.reducer;
export const { setReports, setReport, setReportStatusCount } = slice.actions;
