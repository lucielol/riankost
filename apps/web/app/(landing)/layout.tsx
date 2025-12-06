import Header from "@/components/landing/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh">
      <Header />
      {children}
    </div>
  );
}
