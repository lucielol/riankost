import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWhatsappStatus } from "./use-whatsapp-status";
import { useWhatsappMessages } from "./use-whatsapp-messages";
import { useWhatsappContacts } from "./use-whatsapp-contacts";
import { useWhatsappBroadcast } from "./use-whatsapp-broadcast";
import type { PairResponse } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

/**
 * Main WhatsApp hook that combines all specialized hooks
 * Provides a unified interface for WhatsApp functionality
 */
export function useWhatsapp() {
  const queryClient = useQueryClient();

  // Use specialized hooks
  const statusHook = useWhatsappStatus();
  const messagesHook = useWhatsappMessages();
  const contactsHook = useWhatsappContacts();
  const broadcastHook = useWhatsappBroadcast();

  // Connection management mutations
  const connect = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/connect`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to connect");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-status"] });
    },
  });

  const pairPhone = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/pair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      if (!response.ok) {
        throw new Error("Failed to pair phone");
      }
      return response.json() as Promise<PairResponse>;
    },
  });

  const disconnect = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/disconnect`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to disconnect");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["whatsapp-status"], { status: "disconnected" });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-status"] });
    },
  });

  return {
    // Status
    status: statusHook.status,
    qrCode: statusHook.qrCode,
    user: statusHook.user,
    isLoading: statusHook.isLoading,
    isError: statusHook.isError,

    // Connection management
    connect: connect.mutate,
    pairPhone: pairPhone.mutateAsync,
    disconnect: disconnect.mutate,

    // Messages
    sendMessage: messagesHook.sendMessage,
    isSendingMessage: messagesHook.isSending,

    // Broadcast
    sendBroadcast: broadcastHook.sendBroadcast,
    isSendingBroadcast: broadcastHook.isSending,
    broadcastResult: broadcastHook.data,

    // Contacts
    contacts: contactsHook.contacts,
    refetchContacts: contactsHook.refetch,
    isLoadingContacts: contactsHook.isLoading,
  };
}

// Re-export specialized hooks for direct use
export { useWhatsappStatus } from "./use-whatsapp-status";
export { useWhatsappMessages } from "./use-whatsapp-messages";
export { useWhatsappContacts } from "./use-whatsapp-contacts";
export { useWhatsappBroadcast } from "./use-whatsapp-broadcast";

