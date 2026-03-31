// app/about/page.tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative w-full bg-[#faf9f7] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Montserrat', sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          animation: reveal 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .reveal-1 { animation-delay: 0.1s; }
        .reveal-2 { animation-delay: 0.3s; }
        .reveal-3 { animation-delay: 0.5s; }
        .reveal-4 { animation-delay: 0.7s; }
        .reveal-5 { animation-delay: 0.9s; }

        @keyframes reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .line-draw {
          width: 0;
          animation: draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
        }
        @keyframes draw {
          to { width: 100%; }
        }

        .hero-img-fade {
          opacity: 0;
          animation: imgFade 1.6s ease 0.2s forwards;
        }
        @keyframes imgFade {
          to { opacity: 1; }
        }

        .char-hover:hover { letter-spacing: 0.35em; transition: letter-spacing 0.6s ease; }
      `}</style>

      <Nav />

      {/* ── INTRO ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-24 py-24 md:py-36 grid md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <h2
            className="font-display reveal reveal-2 font-light text-[#1a1a1a] leading-tight mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            About Jean Pierre Khoury
          </h2>
          <p className="font-body reveal reveal-3 text-[#5a5a5a] text-sm leading-loose font-light max-w-md">
            Jean Pierre Khoury is a Lebanese fashion designer whose work
            reflects a deep commitment to craftsmanship, innovation, and bold
            self-expression. From an early age, he was drawn to the
            transformative power of fashion—its ability to shape identity, evoke
            emotion, and command presence. This instinct evolved into a clear
            creative vision: to design pieces that are not only visually
            striking, but that empower the individual wearing them. Rooted in
            the richness of Lebanese couture and guided by a global perspective,
            Jean Pierre Khoury has developed a distinctive aesthetic defined by
            sculptural silhouettes, intricate detailing, and a fearless approach
            to glamour. Each design is approached as a statement—balancing
            precision with artistry, and tradition with modernity. His work
            reflects an understanding of form, movement, and the relationship
            between garment and body, resulting in creations that feel both
            powerful and refined. As the brand continues to grow
            internationally, Jean Pierre Khoury has attracted a diverse
            clientele of artists, performers, and personalities who seek designs
            that stand out with intention. His creations have been worn on some
            of the world’s most visible stages, reinforcing his position as part
            of a new generation of designers shaping the future of couture.
            Today, Jean Pierre Khoury represents more than a label—he represents
            a vision of confidence, individuality, and contemporary luxury. With
            each collection, he continues to push boundaries, creating pieces
            designed not only to be seen, but to leave a lasting impression.
          </p>
        </div>

        {/* Decorative image block */}
        <div className="reveal reveal-4 relative">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            <img
              src="/images/logo/JPKhoury.jpeg"
              alt="Atelier detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH QUOTE ───────────────────────────────────── */}
      <section className="relative py-24 md:py-36 px-8 md:px-24 bg-[#1a1a1a] overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-display text-[#b8a98a] text-6xl leading-none block mb-4">
            "
          </span>
          <blockquote
            className="font-display font-light text-white leading-relaxed"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
          >
            Elegance is not about being noticed,
            <br />
            <em>it is about being remembered.</em>
          </blockquote>
          <p className="font-body text-white/40 tracking-[0.3em] text-xs mt-8 uppercase">
            — Jean Pierre Khoury
          </p>
        </div>
      </section>

      {/* ── CLOSING IMAGE ──────────────────────────────────────── */}
      <section className="relative bg-black/40 h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src="/images/logo/logo.png"
          alt="Jean Pierre Khoury"
          style={{ margin: "auto" }}
          className="w-[80%] h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-display font-light text-white text-center char-hover cursor-default tracking-[0.2em]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            <div className="relative w-148 h-48"></div>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
