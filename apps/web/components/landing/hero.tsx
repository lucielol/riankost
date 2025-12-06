import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20" />
      <div className="container relative z-10 px-4 md:px-6 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
          RIAN KOST KASOKANDEL
        </h1>
        <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
          Hunian nyaman, strategis, dan terjangkau di Kasokandel. Fasilitas lengkap untuk kenyamanan istirahat Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="#contact">Pesan Sekarang</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Lihat Fasilitas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
