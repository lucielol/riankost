"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Fasilitas", href: "/#features" },
    { name: "Galeri", href: "/#gallery" },
    { name: "Lokasi", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <Home className="w-6 h-6 text-primary" />
            <span>RIAN KOST</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href as Route}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild size="sm" variant="ghost">
            <Link href="http://localhost:3002/login?callbackURL=http://localhost:3001/">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={"#contact" as Route}>Hubungi Kami</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href as Route}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full" variant="outline">
              <Link href="http://localhost:3002/login?callbackURL=http://localhost:3001/" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href={"#contact" as Route} onClick={() => setIsMenuOpen(false)}>
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
