import { loginUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface AuthRepository {
  login(loginDto: LoginDto): Promise<void | undefined>;
}

export interface LoginDto {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authRepository: AuthRepository = {
  async login(loginDto: LoginDto) {
    try {
      const result = await AxiosService.post<LoginResponse>(loginUrl, loginDto);
      localStorage.setItem("token", result.data.token);
    } catch (error) {
      throw error;
    }
  },
};
