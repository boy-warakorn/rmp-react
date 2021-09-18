import { getAccountsUrl } from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface AccountRepository {
  getAccounts(tab: string): Promise<AccountResponse[]> | undefined;
}

interface GetAccountsResponse {
  users: AccountResponse[];
}

export interface AccountResponse {
  userId: string;
  role: string;
  name: string;
  createdAt: string;
}

export const accountRepository = {
  async getAccounts(tab: string) {
    try {
      const users = (
        await AxiosService.get<GetAccountsResponse>(getAccountsUrl, {
          params: {
            role: tab === "-" ? "" : tab,
          },
        })
      ).data.users;
      return users;
    } catch (error) {}
  },
};
