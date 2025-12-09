"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PopoverState {
  [key: string]: boolean;
}

interface PopoverContextType {
  openPopovers: PopoverState;
  setPopoverOpen: (id: string, open: boolean) => void;
  isPopoverOpen: (id: string) => boolean;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function PopoverProvider({ children }: { children: ReactNode }) {
  const [openPopovers, setOpenPopovers] = useState<PopoverState>({});

  const setPopoverOpen = (id: string, open: boolean) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [id]: open,
    }));
  };

  const isPopoverOpen = (id: string) => {
    return openPopovers[id] || false;
  };

  return (
    <PopoverContext.Provider value={{ openPopovers, setPopoverOpen, isPopoverOpen }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopoverState() {
  const context = useContext(PopoverContext);
  if (context === undefined) {
    throw new Error("usePopoverState must be used within a PopoverProvider");
  }
  return context;
}
