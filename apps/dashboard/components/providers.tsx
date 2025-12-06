"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@repo/ui/utils/trpc";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@repo/ui/components/sonner";
import { HeaderProvider } from "@/contexts/header-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeaderProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Toaster richColors />
      </HeaderProvider>
    </ThemeProvider>
  );
}
