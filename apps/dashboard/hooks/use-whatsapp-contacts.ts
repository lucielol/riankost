import { useQuery } from "@tanstack/react-query";
import type { ContactsResponse } from "@/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export function useWhatsappContacts() {
  const contacts = useQuery<ContactsResponse>({
    queryKey: ["whatsapp-contacts"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/api/whatsapp/contacts`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch contacts");
      }
      return response.json();
    },
    // Only fetch when WhatsApp is connected
    enabled: false, // Will be enabled manually when needed
  });

  return {
    contacts: contacts.data?.contacts || [],
    isLoading: contacts.isLoading,
    isError: contacts.isError,
    error: contacts.error,
    refetch: contacts.refetch,
  };
}
