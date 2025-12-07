import { useQuery } from "@tanstack/react-query";
import type { Voucher } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

interface VoucherResponse {
  vouchers: Voucher[];
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
