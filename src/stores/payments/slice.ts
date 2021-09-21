import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetPaymentsResponse,
  PaymentResponse,
} from "@repository/PaymentRepository";
import { PaymentState } from "@stores/stores";

const initialState: PaymentState = {
  payments: [] as Payment[],
};

export interface Payment extends PaymentResponse {
  key: string;
  index: number;
}

const slice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments(state, action: PayloadAction<GetPaymentsResponse>) {
      state.payments = action.payload.payments.map((payment, index) => ({
        key: `${payment.id}Rooms`,
        index: index,
        id: payment.id,
        roomNumber: payment.roomNumber,
        paidAt: payment.paidAt ?? "-",
        amount: payment.amount,
        type: payment.type,
        status: payment.status,
      }));
    },
  },
});

export default slice.reducer;
export const { setPayments } = slice.actions;
