import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export function Location() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Lokasi & Kontak</h2>
              <p className="text-muted-foreground text-lg">
                Kunjungi kami atau hubungi untuk informasi ketersediaan kamar.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
                  <p className="text-muted-foreground">
                    Jl. Raya Kasokandel, Kasokandel, Kabupaten Majalengka, Jawa Barat 45453
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp / Telepon</h3>
                  <p className="text-muted-foreground">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">info@riankost.com</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto">
              Hubungi via WhatsApp
            </Button>
          </div>

          <div className="h-[400px] bg-muted rounded-2xl overflow-hidden">
            {/* Placeholder for Google Maps Embed */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
              <span className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Peta Lokasi (Google Maps Embed)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
