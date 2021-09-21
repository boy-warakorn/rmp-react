import {
  confirmPaymentUrl,
  getPaymentsUrl,
  getSpecificPaymentReceiptUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface PaymentRepository {
  getPayments(
    tab: string,
    roomNumber: string
  ): Promise<GetPaymentsResponse | undefined>;
  getSpecificPaymentReceipt(id: string): Promise<string | undefined>;
  confirmPayment(id: string): Promise<void>;
}

export interface GetPaymentsResponse {
  payments: PaymentResponse[];
}

export interface GetReceiptResponse {
  receiptUrl: string;
}

export interface PaymentResponse {
  id: string;
  roomNumber: string;
  paidAt: string;
  amount: number;
  type: string;
  status: string;
}

export const paymentRepository: PaymentRepository = {
  async getPayments(tab: string, roomNumber: string) {
    try {
      let result: any;
      if (tab) {
        result = (
          await AxiosService.get<GetPaymentsResponse>(getPaymentsUrl, {
            params: {
              status: tab === "-" ? "" : tab,
            },
          })
        ).data;
      } else {
        result = (
          await AxiosService.get<GetPaymentsResponse>(getPaymentsUrl, {
            params: {
              roomNumber: roomNumber,
            },
          })
        ).data;
      }
      return result;
    } catch (error) {
      throw error;
    }
  },
  async getSpecificPaymentReceipt(id: string) {
    try {
      return (
        await AxiosService.get<GetReceiptResponse>(
          getSpecificPaymentReceiptUrl(id)
        )
      ).data.receiptUrl;
    } catch (error) {
      throw error;
    }
  },
  async confirmPayment(id: string) {
    try {
      await AxiosService.post(confirmPaymentUrl(id));
    } catch (error) {
      throw error;
    }
  },
};
