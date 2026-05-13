import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const barRef = useRef<HTMLDivElement>(null);

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
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
