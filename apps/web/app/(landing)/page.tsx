import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Gallery } from "@/components/landing/gallery";
import { Location } from "@/components/landing/location";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { FadeIn } from "@/components/landing/fade-in";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <Features />
      </FadeIn>
      <FadeIn>
        <Pricing />
      </FadeIn>
      <FadeIn>
        <Gallery />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <FadeIn>
        <FAQ />
      </FadeIn>
      <FadeIn>
        <Location />
      </FadeIn>
      <FadeIn>
        <CTA />
      </FadeIn>
    </main>
  );
}
