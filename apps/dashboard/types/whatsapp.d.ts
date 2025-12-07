export interface WhatsappStatus {
  status: "connecting" | "connected" | "disconnected";
  qrCode?: string;
  user?: {
    id: string;
    name?: string;
  };
}

export interface WhatsappMessage {
  to: string;
  message: string;
  timestamp?: number;
}

export interface WhatsappContact {
  id: string;
  name?: string;
  number: string;
  isGroup?: boolean;
}

export interface BroadcastRequest {
  contacts: string[];
  message: string;
  delay?: number; // delay between messages in ms
}

export interface SendMessageRequest {
  to: string;
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface BroadcastResponse {
  success: boolean;
  sent: number;
  failed: number;
  errors?: Array<{ contact: string; error: string }>;
}

export interface PairResponse {
  code?: string;
  error?: string;
}

export interface ContactsResponse {
  contacts: WhatsappContact[];
}
