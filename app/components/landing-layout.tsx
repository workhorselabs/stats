import { Navbar } from "./landing-navigation";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Navbar />
        {children}
      </section>
    </main>
  );
}
