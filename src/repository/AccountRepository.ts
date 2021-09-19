import {
  addAccountUrl,
  getAccountsUrl,
  getAccountUrl,
  updateAccountUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface AccountRepository {
  getAccounts(tab: string): Promise<AccountResponse[] | undefined>;
  getAccount(userId: string): Promise<GetAccountResponse | undefined>;
  addAccount(addAccountDto: AddAccountDto): Promise<void | undefined>;
  editAccount(
    editAccountDto: EditAccountDto,
    id: string
  ): Promise<void | undefined>;
}

interface GetAccountsResponse {
  users: AccountResponse[];
}

export interface GetAccountResponse {
  userId: string;
  profile: {
    name: string;
    role: string;
    username: string;
    citizenNumber: string;
    email: string;
    phoneNumber: string;
  };
  createdAt: string;
}

export interface AccountResponse {
  userId: string;
  role: string;
  name: string;
  createdAt: string;
}

export interface EditAccountDto {
  name: string;
  phoneNumber: string;
  role: string;
  citizenNumber: string;
}

export interface AddAccountDto extends EditAccountDto {
  username: string;
  email: string;
}

export const accountRepository: AccountRepository = {
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
  async getAccount(userId: string) {
    try {
      const user = (
        await AxiosService.get<GetAccountResponse>(getAccountUrl(userId))
      ).data;
      return user;
    } catch (error) {}
  },
  async addAccount(addAccountDto: AddAccountDto) {
    try {
      await AxiosService.post(addAccountUrl, addAccountDto);
    } catch (error) {}
  },
  async editAccount(editAccountDto: EditAccountDto, id: string) {
    try {
      await AxiosService.post(updateAccountUrl(id), editAccountDto);
    } catch (error) {}
  },
};
