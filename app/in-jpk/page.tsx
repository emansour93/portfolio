import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function InJPKPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#0e0e0e] text-white overflow-hidden">
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

        .glow {
          text-shadow: 0 0 40px rgba(255,255,255,0.08);
        }
      `}</style>

      <Nav />

      <section className="flex items-center justify-center min-h-[calc(100vh-68px)] text-center px-6">
        <div>
          <h1 className="font-display text-5xl md:text-7xl font-light glow fade-in">
            IN JPK
          </h1>

          <p className="font-body text-sm md:text-base text-white/60 mt-6 tracking-widest uppercase fade-in fade-2">
            Coming Soon
          </p>

          <p className="font-body text-xs text-white/40 mt-4 max-w-md mx-auto leading-loose fade-in fade-3">
            A closer look into the universe of Jean Pierre Khoury — behind the
            atelier, the process, and the vision.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
