import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Footer from "@/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  });

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={barRef}
        className="fixed top-0 left-0 z-[200] h-[2px] w-full origin-left scale-x-0"
        style={{ background: "linear-gradient(90deg, #6366f1, #9d4edd)" }}
        aria-hidden="true"
      />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-6 z-[150] w-11 h-11 rounded-full
                    flex items-center justify-center
                    bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30
                    border border-indigo-500/50
                    transition-all duration-300 cursor-pointer
                    ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"
             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Footer />
    </>
  );
};

export default App;
