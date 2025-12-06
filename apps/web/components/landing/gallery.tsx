import { FadeIn } from "@/components/landing/fade-in";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";

export function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1522771753035-4850d32f5d42?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-40891a913161?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
  ];

  return (
    <section className="py-20 bg-background">
      <FadeIn className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Galeri Kost</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Intip suasana nyaman dan bersih di Rian Kost Kasokandel.
          </p>
        </div>
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="relative aspect-video overflow-hidden rounded-2xl group border border-border">
                      <img
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </FadeIn>
    </section>
  );
}
