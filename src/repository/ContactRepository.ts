import {
  createContactUrl,
  deleteContactUrl,
  editContactUrl,
  getContactsUrl,
  getContactUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface ContactRepository {
  getContacts(): Promise<GetContactsResponse | undefined>;
  getContact(id: string): Promise<ContactResponse | undefined>;
  createContact(createContactDto: CreateContactDto): Promise<void>;
  deleteContact(id: string): Promise<void>;
  editContact(id: string, editContactDto: EditContactDto): Promise<void>;
}

export interface CreateContactDto {
  role: string;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface EditContactDto extends CreateContactDto {}

export interface GetContactsResponse {
  contacts: BaseContact[];
}

export interface BaseContact {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
}

export interface ContactResponse extends BaseContact {
  address: string;
  email: string;
}

export const contactRepository = {
  async getContacts() {
    try {
      const contacts = (
        await AxiosService.get<GetContactsResponse>(getContactsUrl)
      ).data;

      return contacts;
    } catch (error) {
      throw error;
    }
  },
  async createContact(createContactDto: CreateContactDto) {
    try {
      await AxiosService.post(createContactUrl, createContactDto);
    } catch (error) {
      throw error;
    }
  },
  async getContact(id: string) {
    try {
      const contact = (
        await AxiosService.get<ContactResponse>(getContactUrl(id))
      ).data;

      return contact;
    } catch (error) {
      throw error;
    }
  },
  async deleteContact(id: string) {
    try {
      await AxiosService.delete(deleteContactUrl(id));
    } catch (error) {
      throw error;
    }
  },
  async editContact(id: string, editContactDto: EditContactDto) {
    try {
      await AxiosService.post(editContactUrl(id), editContactDto);
    } catch (error) {
      throw error;
    }
  },
};
