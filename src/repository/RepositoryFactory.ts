import { UserRepository, userRepository } from "./UserRepository";
import { AuthRepository, authRepository } from "./AuthRepository";
import { roomRepository, RoomRepository } from "./RoomRepository";

interface Repositories {
  user: UserRepository;
  auth: AuthRepository;
  room: RoomRepository;
}

const repositories = {
  user: userRepository,
  auth: authRepository,
  room: roomRepository,
};

const repositoriesFactory = {
  get: (name: keyof Repositories) => repositories[name],
};

export default repositoriesFactory;
