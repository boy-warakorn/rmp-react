import {
  confirmPaymentUrl,
  getPaymentsUrl,
  getSpecificPaymentReceiptUrl,
  importPaymentsUrl,
  rejectPaymentUrl,
} from "@configs/api";
import { AxiosService } from "@services/axios.config";

export interface PaymentRepository {
  getPayments(
    tab: string,
    roomNumber?: string,
    buildingId?: string
  ): Promise<GetPaymentsResponse | undefined>;
  getSpecificPaymentReceipt(id: string): Promise<string | undefined>;
  confirmPayment(id: string): Promise<void>;
  rejectPayment(id: string): Promise<void>;
  importPayment(payments: ImportPaymentDto): Promise<void>;
}

export interface ImportPayment {
  type: string;
  roomNumber: string;
  amount: string;
}

export interface ImportPaymentDto {
  payments: ImportPayment[];
}

export interface GetPaymentsResponse {
  payments: PaymentResponse[];
  statusCount: PaymentStatusCount;
}

export interface PaymentStatusCount {
  all: number;
  active: number;
  pending: number;
  reject: number;
  complete: number;
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
  issuedAt: string;
  confirmedAt: string;
}

export const paymentRepository: PaymentRepository = {
  async getPayments(tab: string, roomNumber?: string, buildingId?: string) {
    try {
      const result = (
        await AxiosService.get<GetPaymentsResponse>(getPaymentsUrl, {
          params: {
            status: tab === "-" ? "" : tab,
            roomNumber: roomNumber,
            buildingId: buildingId,
          },
        })
      ).data;
      return result;
    } catch (error) {
      throw error;
    }
  },
  async importPayment(payments: ImportPaymentDto) {
    try {
      await AxiosService.post(importPaymentsUrl, payments);
    } catch (error) {}
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
  async rejectPayment(id: string) {
    try {
      await AxiosService.post(rejectPaymentUrl(id));
    } catch (error) {
      throw error;
    }
  },
};
