import { en } from "@/lang/en";
import { id } from "@/lang/id";

export type Language = "en" | "id";

export const translations = {
  en,
  id,
} as const;

export type TranslationKey = keyof typeof en;
