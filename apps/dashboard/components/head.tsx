"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useHeader } from "@/contexts/header-context";

interface HeadProps {
  title?: string;
  breadcrumbs?: {
    title: string;
    href: string;
  }[];
}

export function Head({ title, breadcrumbs }: HeadProps) {
  const pathname = usePathname();
  const {
    title: contextTitle,
    breadcrumbs: contextBreadcrumbs,
    setHeaderData,
  } = useHeader();

  // If props are provided, update the context (Setter Mode)
  useEffect(() => {
    if (title || breadcrumbs) {
      setHeaderData({ title, breadcrumbs });
      if (title) {
        document.title = `${title} | Dashboard`;
      }
    }
  }, [title, breadcrumbs, setHeaderData]);

  // If props are provided, don't render anything (it's just a data setter)
  if (title || breadcrumbs) {
    return null;
  }

  // If no props, render the UI using context data (Consumer Mode)
  const displayBreadcrumbs = contextBreadcrumbs || [
    {
      title: "Dashboard",
      href: "/",
    },
    ...(pathname !== "/"
      ? [
        {
          title: pathname.split("/").filter(Boolean)[0],
          href: pathname,
        },
      ]
      : []),
  ];

  return (
    <>
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {displayBreadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className="hidden md:block">
                {index === displayBreadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="capitalize">
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} className="capitalize">
                    {item.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
