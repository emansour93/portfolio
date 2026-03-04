// app/about/page.tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative w-full h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Background image */}
        <div className="hero-img-fade absolute inset-0">
          <img
            src="/images/about-hero.jpg"
            alt="Jean Pierre Khoury Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        </div>

        {/* Decorative vertical text */}
        <div
          className="font-body absolute right-8 top-1/2 -translate-y-1/2 text-white/30 tracking-[0.4em] text-xs hidden md:block"
          style={{ writingMode: "vertical-rl" }}
        >
          MAISON JEAN PIERRE KHOURY
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-8 md:px-24 w-full">
          <p className="font-body reveal reveal-1 text-white/60 tracking-[0.3em] text-xs mb-4 uppercase">
            Est. Lebanon
          </p>
          <h1
            className="font-display reveal reveal-2 text-white font-light leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            The Art of
            <br />
            <em>Couture</em>
          </h1>
          <div className="line-draw h-px bg-white/40 mt-8 mb-0 max-w-xs" />
        </div>
      </section>

      {/* ── INTRO ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-24 py-24 md:py-36 grid md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <p className="font-body reveal reveal-1 text-[#b8a98a] tracking-[0.25em] text-xs uppercase mb-6">
            Our Philosophy
          </p>
          <h2
            className="font-display reveal reveal-2 font-light text-[#1a1a1a] leading-tight mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Where fabric
            <br />
            <em>becomes poetry</em>
          </h2>
          <p className="font-body reveal reveal-3 text-[#5a5a5a] text-sm leading-loose font-light max-w-md">
            Every garment that leaves our atelier is a testament to the belief
            that clothing is not merely worn — it is felt. We work with the
            finest materials, guided by an obsession with detail that borders on
            the meditative.
          </p>
        </div>

        {/* Decorative image block */}
        <div className="reveal reveal-4 relative">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            <img
              src="/images/about-hero.jpg"
              alt="Atelier detail"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Offset decorative border */}
          <div
            className="absolute border border-[#b8a98a]/40 pointer-events-none"
            style={{
              inset: "-16px -16px auto auto",
              width: "70%",
              height: "70%",
            }}
          />
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

      {/* ── STORY ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-24 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-[#b8a98a] tracking-[0.25em] text-xs uppercase mb-6">
            Our Story
          </p>

          {/* Large editorial layout */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-5">
              <h2
                className="font-display font-light text-[#1a1a1a] leading-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                Born from a
                <br />
                love of craft
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-6 justify-center">
              <p className="font-body text-[#5a5a5a] text-sm leading-loose font-light">
                The house of Jean Pierre Khoury was founded on a singular
                vision: to create garments that transcend trend, season, and
                time. Each piece is conceived in our Beirut atelier, where
                tradition meets modernity in every hand-placed stitch.
              </p>
              <p className="font-body text-[#5a5a5a] text-sm leading-loose font-light">
                Our collections draw from the rich cultural tapestry of the
                Levant — its colors, textures, and ancient sense of beauty —
                reinterpreted for the contemporary woman who moves through the
                world with intention and grace.
              </p>
            </div>
          </div>

          {/* Three values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e4de] mt-20">
            {[
              {
                number: "01",
                title: "Craftsmanship",
                body: "Every seam, every bead, every fold is placed with purpose. Our artisans bring decades of mastery to each creation.",
              },
              {
                number: "02",
                title: "Intention",
                body: "We design for women who know who they are. Our garments are a dialogue, not a statement imposed from outside.",
              },
              {
                number: "03",
                title: "Timelessness",
                body: "We resist the ephemeral. A JPK piece is not for a season — it is for a life, meant to be cherished and passed on.",
              },
            ].map((v) => (
              <div key={v.number} className="bg-[#faf9f7] p-10 md:p-12">
                <p className="font-body text-[#b8a98a] text-xs tracking-[0.3em] mb-6">
                  {v.number}
                </p>
                <h3 className="font-display text-[#1a1a1a] text-2xl font-light mb-4">
                  {v.title}
                </h3>
                <p className="font-body text-[#7a7a7a] text-sm leading-loose font-light">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING IMAGE ──────────────────────────────────────── */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="Jean Pierre Khoury"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-display font-light text-white text-center char-hover cursor-default tracking-[0.2em]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            Maison Jean Pierre Khoury
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
