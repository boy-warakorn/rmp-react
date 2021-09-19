import { getCurrentUserUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface UserRepository {
  getCurrentUser(): Promise<GetCurrentUserResponse | undefined>;
}

interface GetCurrentUserResponse {
  businessName: string;
  profile: { name: string; role: string };
}

export const userRepository: UserRepository = {
  async getCurrentUser() {
    try {
      const user = (
        await AxiosService.get<GetCurrentUserResponse>(getCurrentUserUrl)
      ).data;
      return user;
    } catch (error) {
      localStorage.setItem("token", "");
      window.location.pathname = "/login";
    }
  },
};
