import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroBackground from "@/components/HeroBackground";

const GitHubIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ROLES = ["Full-Stack Developer", "React Engineer", "TypeScript Enthusiast"];


const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Typewriter ──────────────────────────────────────────────────────────
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);
  const [cursorOn, setCursorOn]   = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const role  = ROLES[roleIdx];
    const speed = deleting ? 40 : 75;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = role.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === role) setTimeout(() => setDeleting(true), 2000);
      } else {
        const next = role.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  // ── GSAP entrance ───────────────────────────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
          ".hero-title .line",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
        )
        .fromTo(".hero-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-socials",{ opacity: 0 },         { opacity: 1, duration: 0.5 },       "-=0.2");
    },
    { scope: containerRef }
  );

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-10 lg:px-20 py-32 md:py-40 flex flex-col items-center text-center gap-8">

        {/* Name + typewriter role */}
        <div className="hero-title flex flex-col gap-3">
          <div className="line opacity-0">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] bg-gradient-to-r from-white via-zinc-100 to-indigo-300 bg-clip-text text-transparent">
              Kevin Jiang
            </h1>
          </div>
          <div className="line opacity-0 min-h-[2rem] md:min-h-[2.5rem]">
            <p className="text-xl md:text-2xl text-zinc-400 font-medium">
              {displayed}
              <span
                className="inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle transition-opacity duration-75"
                style={{ opacity: cursorOn ? 1 : 0 }}
              />
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="hero-sub opacity-0 text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
          I build performant, accessible web applications with clean architecture and
          delightful user experiences. Passionate about TypeScript, React, and
          distributed systems.
        </p>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => scrollTo("#work")}
            className="px-7 py-3.5 rounded-xl bg-white text-black text-sm font-semibold
                       hover:bg-zinc-100 active:scale-[0.97] transition-colors duration-200 cursor-pointer"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - r.left - r.width  / 2) * 0.25;
              const y = (e.clientY - r.top  - r.height / 2) * 0.25;
              e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
              e.currentTarget.style.transition = "transform 0.1s ease-out";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
              e.currentTarget.style.transition = "transform 0.45s ease-out";
            }}
          >
            View Projects
          </button>
          <a
            href="/CV_Kevin.pdf"
            download
            className="px-7 py-3.5 rounded-xl border border-white/20 text-white text-sm
                       font-semibold hover:border-white/40 hover:bg-white/5
                       active:scale-[0.97] transition-colors duration-200"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - r.left - r.width  / 2) * 0.25;
              const y = (e.clientY - r.top  - r.height / 2) * 0.25;
              e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
              e.currentTarget.style.transition = "transform 0.1s ease-out";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
              e.currentTarget.style.transition = "transform 0.45s ease-out";
            }}
          >
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="hero-socials opacity-0 flex items-center justify-center gap-5">
          <a
            href="https://github.com/kevjiang64"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            aria-label="GitHub profile"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-jiang-6009/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
          </a>
          <span className="block w-12 h-px bg-white/10" aria-hidden="true" />
          <span className="text-zinc-600 text-xs font-medium tracking-widest uppercase">
            Montreal, QC
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080810)" }}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
