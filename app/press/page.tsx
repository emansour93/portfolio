import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PressPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#faf9f7] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Montserrat', sans-serif; }

        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeIn 1.2s ease forwards;
        }

        .fade-2 { animation-delay: 0.2s; }
        .fade-3 { animation-delay: 0.4s; }

        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Nav />

      <section className="flex items-center justify-center min-h-[calc(100vh-68px)] text-center px-6">
        <div>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[#1a1a1a] fade-in">
            Press
          </h1>

          <p className="font-body text-sm md:text-base text-[#6a6a6a] mt-6 tracking-widest uppercase fade-in fade-2">
            Coming Soon
          </p>

          <p className="font-body text-xs text-[#9a9a9a] mt-4 max-w-md mx-auto leading-loose fade-in fade-3">
            Exclusive coverage, editorials, and features showcasing the world of
            Jean Pierre Khoury will be unveiled here.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
