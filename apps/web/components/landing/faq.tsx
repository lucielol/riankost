import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";

const faqs = [
  {
    question: "Apakah ada jam malam?",
    answer: "Kami menerapkan sistem akses 24 jam untuk penghuni dengan kunci gerbang masing-masing, namun diharapkan tetap menjaga ketenangan di atas jam 10 malam.",
  },
  {
    question: "Apakah boleh membawa tamu menginap?",
    answer: "Tamu lawan jenis dilarang masuk kamar. Tamu menginap diperbolehkan (sesama jenis) maksimal 2x24 jam dengan melapor ke penjaga kost.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Pembayaran dilakukan setiap awal bulan via transfer bank atau tunai. Ada deposit jaminan kunci di awal masuk.",
  },
  {
    question: "Apakah biaya listrik sudah termasuk?",
    answer: "Belum. Setiap kamar menggunakan listrik token (prabayar) sehingga Anda bisa mengatur pemakaian sendiri.",
  },
  {
    question: "Apakah ada dapur umum?",
    answer: "Ya, kami menyediakan dapur umum sederhana yang bisa digunakan bersama untuk memasak ringan.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Pertanyaan Umum</h2>
          <p className="text-muted-foreground">
            Hal-hal yang sering ditanyakan oleh calon penghuni.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
