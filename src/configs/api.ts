export const baseApiUrl = "https://rmp.ryuhub.dev/api";
// export const baseApiUrl = "http://localhost:1234/api";

// auth
export const loginUrl = "/auth";

// user
const baseUserUrl = "/users";
export const getCurrentUserUrl = baseUserUrl;

// accounts
const baseAccountUrl = "/accounts";
export const getAccountsUrl = baseAccountUrl;
export const addAccountUrl = baseAccountUrl;
export const getAccountUrl = (id: string) => `${baseAccountUrl}/${id}`;
export const updateAccountUrl = (id: string) =>
  `${baseAccountUrl}/${id}/update`;

// room
const baseRoomUrl = "/rooms";
export const getRoomsUrl = baseRoomUrl;
export const getRoomUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}`;
export const addRoomUrl = baseRoomUrl;
export const editRoomUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}/update`;
export const getRoomIDListUrl = "/rooms/id-list";

// room owner
export const addRoomOwnerUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}/owner`;
export const editRoomOwnerUrl = addRoomOwnerUrl;
export const deleteRoomOwnerUrl = addRoomOwnerUrl;

// report
const baseReportUrl = "/reports";
export const getReportsUrl = baseReportUrl;
export const getReportUrl = (reportId: string) =>
  `${baseReportUrl}/${reportId}`;
export const replyReportUrl = (reportId: string) =>
  `${baseReportUrl}/${reportId}/reply`;
export const resolveReportUrl = (reportId: string) =>
  `${baseReportUrl}/${reportId}/resolve`;

// package
const basePackageUrl = "/packages";
export const getPackagesUrl = basePackageUrl;
export const createPackageUrl = basePackageUrl;
export const getPackageUrl = (packageId: string) =>
  `${basePackageUrl}/${packageId}`;
export const updatePackageUrl = (packageId: string) =>
  `${basePackageUrl}/${packageId}/update`;
export const deletePackageUrl = (packageId: string) =>
  `${basePackageUrl}/${packageId}/delete`;
export const confirmPackageUrl = (packageId: string) =>
  `${basePackageUrl}/${packageId}/confirm`;
