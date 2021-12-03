import { changePasswordUrl, getCurrentUserUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface UserRepository {
  getCurrentUser(): Promise<GetCurrentUserResponse | undefined>;
  changePassword(changePasswordDto: ChangePasswordDto): Promise<void>;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface GetCurrentUserResponse {
  businessName: string;
  id: string;
  createdAt: string;
  profile: {
    name: string;
    role: string;
    citizenNumber: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
}

export const userRepository: UserRepository = {
  async getCurrentUser() {
    try {
      const user = (
        await AxiosService.get<GetCurrentUserResponse>(getCurrentUserUrl)
      ).data;
      localStorage.setItem("role", user.profile.role);
      return user;
    } catch (error) {
      localStorage.setItem("token", "");
      window.location.pathname = "/login";
    }
  },
  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      await AxiosService.post(changePasswordUrl, changePasswordDto);
    } catch (error) {
      throw error;
    }
  },
};
