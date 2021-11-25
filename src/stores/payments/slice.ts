import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetPaymentsResponse,
  PaymentResponse,
  PaymentStatusCount,
} from "@repository/PaymentRepository";
import { PaymentState } from "@stores/stores";

const initialState: PaymentState = {
  payments: [] as Payment[],
  statusCount: {
    all: 0,
    pending: 0,
    active: 0,
    reject: 0,
    complete: 0,
  } as PaymentStatusCount,
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
        issuedAt: payment.issuedAt,
        confirmedAt: payment.confirmedAt,
        status: payment.status,
        duedAt: payment.duedAt,
      }));
    },
    setPaymentStatus(state, action: PayloadAction<PaymentStatusCount>) {
      state.statusCount = action.payload;
    },
  },
});

export default slice.reducer;
export const { setPayments, setPaymentStatus } = slice.actions;
