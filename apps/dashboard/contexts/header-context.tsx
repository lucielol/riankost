"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface HeaderContextType {
  title: string | undefined;
  breadcrumbs: BreadcrumbItem[] | undefined;
  setHeaderData: (data: {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
  }) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(
    undefined
  );

  const setHeaderData = (data: {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
  }) => {
    setTitle(data.title);
    setBreadcrumbs(data.breadcrumbs);
  };

  return (
    <HeaderContext.Provider value={{ title, breadcrumbs, setHeaderData }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
