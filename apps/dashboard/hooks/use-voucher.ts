import { useQuery } from "@tanstack/react-query";
import type { Voucher } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

interface VoucherResponse {
  vouchers: Voucher[];
}

export interface ActiveVoucher {
  id: string;
  username: string;
  address: string;
  "mac-address": string;
  uptime: string;
  "bytes-in": string;
  "bytes-out": string;
  "packets-in": string;
  "packets-out": string;
}

interface ActiveVoucherResponse {
  activeVouchers: ActiveVoucher[];
}

export function useVoucher() {
  const { data, isLoading, isError, refetch } = useQuery<VoucherResponse>({
    queryKey: ["vouchers"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/voucher`);
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }
      return response.json();
    },
  });

  return {
    vouchers: data?.vouchers || [],
    isLoading,
    isError,
    refetch,
  };
}

export function useActiveVoucher() {
  const { data, isLoading, isError, refetch } = useQuery<ActiveVoucherResponse>({
    queryKey: ["active-vouchers"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/voucher/active`);
      if (!response.ok) {
        throw new Error("Failed to fetch active vouchers");
      }
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return {
    activeVouchers: data?.activeVouchers || [],
    isLoading,
    isError,
    refetch,
  };
}
