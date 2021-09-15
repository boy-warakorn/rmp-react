import { UserRepository, userRepository } from "./UserRepository";
import { AuthRepository, authRepository } from "./AuthRepository";

interface Repositories {
  user: UserRepository;
  auth: AuthRepository;
}

const repositories = {
  user: userRepository,
  auth: authRepository,
};

export default {
  get: (name: keyof Repositories) => repositories[name],
};
