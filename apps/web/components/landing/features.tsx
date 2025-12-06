import { Wifi, Car, Wind, ShieldCheck, MapPin, Zap } from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Koneksi internet cepat untuk kebutuhan kerja dan hiburan Anda.",
  },
  {
    icon: Wind,
    title: "Full AC",
    description: "Kamar sejuk dan nyaman dengan pendingin ruangan di setiap kamar.",
  },
  {
    icon: Car,
    title: "Parkir Luas",
    description: "Area parkir aman dan luas untuk kendaraan motor dan mobil Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan 24 Jam",
    description: "Lingkungan aman dengan pengawasan CCTV dan penjaga kost.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Dekat dengan kawasan industri, minimarket, dan akses jalan utama.",
  },
  {
    icon: Zap,
    title: "Listrik Token",
    description: "Bebas atur penggunaan listrik sendiri dengan sistem token.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Fasilitas Unggulan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan berbagai fasilitas terbaik untuk menunjang kenyamanan tinggal Anda di Rian Kost Kasokandel.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
