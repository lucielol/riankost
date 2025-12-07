import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SendMessageRequest, SendMessageResponse } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export function useWhatsappMessages() {
  const queryClient = useQueryClient();

  const sendMessage = useMutation<SendMessageResponse, Error, SendMessageRequest>({
    mutationFn: async ({ to, message }) => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, message }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }
      return response.json();
    },
  });

  return {
    sendMessage: sendMessage.mutateAsync,
    isSending: sendMessage.isPending,
    isError: sendMessage.isError,
    error: sendMessage.error,
  };
}
