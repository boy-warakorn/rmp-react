export const baseApiUrl = "http://localhost:1234/api";

// auth
export const loginUrl = "/auth";

// user
const baseUserUrl = "/users";
export const getCurrentUserUrl = baseUserUrl;

// room
const baseRoomUrl = "/rooms";
export const getRoomsUrl = baseRoomUrl;
export const getRoomUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}`;
export const addRoomUrl = baseRoomUrl;

// room owner
export const addRoomOwnerUrl = (roomNumber: string) =>
  `${baseRoomUrl}/${roomNumber}/owner`;
export const editRoomOwnerUrl = addRoomOwnerUrl;
export const deleteRoomOwnerUrl = addRoomOwnerUrl;
