import { useQuery } from "@tanstack/react-query";
import type { WhatsappStatus } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export function useWhatsappStatus() {
  const status = useQuery<WhatsappStatus>({
    queryKey: ["whatsapp-status"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/status`);
      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
      return response.json();
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === "connected") {
        return 60000; // Slow poll if connected
      }
      return 3000; // Fast poll if connecting/disconnected
    },
  });

  return {
    status: status.data?.status || "disconnected",
    qrCode: status.data?.qrCode,
    user: status.data?.user,
    isLoading: status.isLoading,
    isError: status.isError,
    refetch: status.refetch,
  };
}
