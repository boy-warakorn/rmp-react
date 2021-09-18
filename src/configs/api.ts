// export const baseApiUrl = "https://rmp.ryuhub.dev/api";
export const baseApiUrl = "http://localhost:1234/api";

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

// room owner
export const addRoomOwnerUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}/owner`;
export const editRoomOwnerUrl = addRoomOwnerUrl;
export const deleteRoomOwnerUrl = addRoomOwnerUrl;
