import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Rizki",
    role: "Karyawan Pabrik",
    content: "Kostnya bersih dan tenang. Sangat cocok untuk istirahat setelah pulang kerja shift malam. Parkiran juga aman.",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Mahasiswi",
    content: "Lokasinya strategis banget, dekat sama minimarket dan tempat makan. Ibu kostnya juga ramah banget.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Wiraswasta",
    content: "Internetnya kenceng, lumayan buat kerja remote sesekali. Fasilitas sesuai dengan harga.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Kata Penghuni</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Apa kata mereka yang sudah tinggal di Rian Kost Kasokandel?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                      }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
