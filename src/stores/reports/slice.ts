import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetReportResponse,
  GetReportsResponse,
  ReportResponse,
} from "@repository/ReportRepository";
import { ReportState } from "@stores/stores";

const initialState: ReportState = {
  reports: [] as Report[],
  currentReport: {} as ReportDetail,
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
  },
});

export default slice.reducer;
export const { setReports, setReport } = slice.actions;
