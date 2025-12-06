import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 bg-muted text-muted-foreground border-t border-border">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Rian Kost Kasokandel. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
