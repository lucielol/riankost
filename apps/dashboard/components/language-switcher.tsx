"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { FlagGB, FlagID } from "@/components/flags";
import { useState, useEffect } from "react";

type Language = {
  code: "en" | "id";
  name: string;
  nativeName: string;
  flag: React.ReactNode;
};

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: <FlagGB /> },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: <FlagID /> },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (languageCode: "en" | "id") => {
    setLanguage(languageCode);
  };

  const currentLang = languages.find((lang) => lang.code === language) || languages[1];

  if (!mounted) {
    return (
      <Button variant="secondary" size="icon" className="h-9 w-9">
        <Globe className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="h-9 gap-2 rounded-full px-3 hover:bg-accent"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {currentLang.flag}
          </div>
          <span className="hidden sm:inline-block text-sm font-medium">
            {currentLang.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer py-2.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                {lang.flag}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
              </div>
            </div>
            {language === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
