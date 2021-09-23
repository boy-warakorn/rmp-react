import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BaseContact,
  ContactResponse,
  GetContactsResponse,
} from "@repository/ContactRepository";
import { ContactState } from "@stores/stores";

const initialState: ContactState = {
  contacts: [] as Contact[],
  currentContact: {} as ContactResponse,
};

export interface Contact extends BaseContact {
  key: string;
  index: number;
}

export const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<GetContactsResponse>) {
      state.contacts = action.payload.contacts.map((contact, index) => ({
        key: `${contact.id}Contacts`,
        index: index,
        id: contact.id,
        name: contact.name,
        role: contact.role,
        phoneNumber: contact.phoneNumber,
      }));
    },
    setContact(state, action: PayloadAction<ContactResponse>) {
      state.currentContact = action.payload;
    },
  },
});

export default slice.reducer;
export const { setContact, setContacts } = slice.actions;
