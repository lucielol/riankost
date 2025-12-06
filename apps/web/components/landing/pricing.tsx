import { Check } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

const plans = [
  {
    name: "Kamar Standard",
    price: "Rp 600.000",
    period: "/bulan",
    description: "Pilihan hemat dengan fasilitas memadai untuk istirahat nyaman.",
    features: [
      "Kasur Single",
      "Kipas Angin",
      "Lemari Pakaian",
      "Kamar Mandi Luar",
      "Free WiFi",
      "Listrik Token",
    ],
    cta: "Pilih Standard",
    popular: false,
  },
  {
    name: "Kamar VIP",
    price: "Rp 1.200.000",
    period: "/bulan",
    description: "Kenyamanan maksimal dengan fasilitas lengkap dan kamar mandi dalam.",
    features: [
      "Kasur Queen Size",
      "AC (Air Conditioner)",
      "Lemari Pakaian Besar",
      "Kamar Mandi Dalam",
      "Meja & Kursi Kerja",
      "Free WiFi High Speed",
      "Listrik Token",
    ],
    cta: "Pilih VIP",
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Pilihan Kamar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sesuaikan dengan kebutuhan dan budget Anda. Semua kamar dirancang untuk kenyamanan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-6 rounded-2xl border ${plan.popular
                ? "border-primary shadow-lg scale-105 z-10 bg-card"
                : "border-border bg-card/50"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Paling Laris
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                asChild
              >
                <Link href="#contact">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
