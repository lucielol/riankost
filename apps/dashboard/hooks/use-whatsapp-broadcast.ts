import { useMutation } from "@tanstack/react-query";
import type { BroadcastRequest, BroadcastResponse } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export function useWhatsappBroadcast() {
  const broadcast = useMutation<BroadcastResponse, Error, BroadcastRequest>({
    mutationFn: async ({ contacts, message, delay = 1000 }) => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/broadcast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts, message, delay }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send broadcast");
      }
      return response.json();
    },
  });

  return {
    sendBroadcast: broadcast.mutateAsync,
    isSending: broadcast.isPending,
    isError: broadcast.isError,
    error: broadcast.error,
    data: broadcast.data,
  };
}
