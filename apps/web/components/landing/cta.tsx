import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { FadeIn } from "@/components/landing/fade-in";

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <FadeIn className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Siap untuk Pindah?
        </h2>
        <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Jangan sampai kehabisan kamar. Hubungi kami sekarang untuk survey lokasi atau booking kamar impian Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="#contact">Hubungi Kami Sekarang</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link href="#pricing">Lihat Harga</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
