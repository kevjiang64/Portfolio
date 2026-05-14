import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";
import { expCards } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* Timeline line draws down as the section scrolls */
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      const entries = gsap.utils.toArray<HTMLElement>(".exp-entry");

      /* Set initial hidden state up front (JS-driven, not CSS) */
      gsap.set(entries, { opacity: 0, y: 30 });
      gsap.set(".exp-role",   { opacity: 0, y: 12 });
      gsap.set(".exp-period", { opacity: 0, x: 16 });
      gsap.set(".exp-bullet", { opacity: 0, y: 10 });

      /* Each entry reveals when scrolled into view */
      entries.forEach((el) => {
        const role    = el.querySelector<HTMLElement>(".exp-role");
        const period  = el.querySelector<HTMLElement>(".exp-period");
        const bullets = el.querySelectorAll<HTMLElement>(".exp-bullet");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.to(el,      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" })
          .to(role,    { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.4")
          .to(period,  { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, "<")
          .to(bullets, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.08 }, "-=0.2");
      });

      /* Recalculate trigger positions after fonts/images settle */
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 400);

      return () => {
        window.removeEventListener("load", refresh);
        clearTimeout(t);
      };
    },
    { scope: containerRef }
  );

  return (
    <section id="experience" className="section-padding" ref={containerRef}>
      <div className="flex flex-col gap-16">
        <TitleHeader title="Work Experience" sub="Where I've Been" />

        {/* Timeline */}
        <div className="max-w-3xl mx-auto w-full relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-0 top-2 bottom-0"
          />

          <div className="flex flex-col gap-12">
            {expCards.map((exp) => (
              <div
                key={exp.id}
                className="exp-entry relative rounded-xl p-4 -ml-4
                           border border-transparent
                           hover:border-indigo-500/20 hover:bg-indigo-500/[0.03]
                           transition-all duration-300 group/entry"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                  <div className="exp-role">
                    <h3 className="text-lg font-semibold text-white group-hover/entry:text-indigo-100 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-indigo-400 text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="exp-period text-xs font-medium text-zinc-500 uppercase tracking-wide whitespace-nowrap
                                   border border-white/[0.07] rounded-full px-3 py-1
                                   group-hover/entry:border-indigo-500/30 group-hover/entry:text-zinc-400
                                   transition-all duration-300">
                    {exp.period}
                  </span>
                </div>

                {/* Responsibilities */}
                <ul className="list-none flex flex-col gap-2">
                  {exp.responsibilities.map((item, idx) => (
                    <li
                      key={idx}
                      className="exp-bullet flex items-start gap-3 text-sm text-zinc-400 leading-relaxed
                                 group-hover/entry:text-zinc-300 transition-colors duration-300"
                    >
                      <span
                        className="mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0
                                   group-hover/entry:bg-indigo-400 transition-colors duration-300"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
