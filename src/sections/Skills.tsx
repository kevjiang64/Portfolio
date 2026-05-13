import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";
import { skillGroups } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".carousel-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.14,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="skills" className="section-padding overflow-hidden" ref={containerRef}>
      <div className="flex flex-col gap-14">
        <TitleHeader title="Technical Skills 🛠️" />

        <div className="flex flex-col gap-8">
          {skillGroups.map((group, groupIdx) => {
            const repeated = [...group.items, ...group.items, ...group.items, ...group.items];
            const direction = groupIdx % 2 === 0 ? "marquee-left" : "marquee-right";

            return (
              <div key={group.category} className="carousel-row opacity-0 flex flex-col gap-3">
                {/* Category label */}
                <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
                  {group.category}
                </p>

                {/* Scrolling strip */}
                <div className="marquee-row relative overflow-hidden py-2">
                  {/* Fade edges */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
                       style={{ background: "linear-gradient(to right, #080810, transparent)" }} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
                       style={{ background: "linear-gradient(to left, #080810, transparent)" }} />

                  <div className={`marquee-track ${direction}`} style={{ gap: "2rem" }}>
                    {repeated.map((skill, idx) => (
                      <div
                        key={`${skill.name}-${idx}`}
                        className="flex-shrink-0 flex flex-col items-center gap-2 group/logo"
                        title={skill.name}
                      >
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl
                                        bg-white/[0.05] border border-white/10
                                        group-hover/logo:border-indigo-500/40 group-hover/logo:bg-indigo-500/10
                                        transition-all duration-300 p-3">
                          {skill.iconPath && (
                            <img
                              src={skill.iconPath}
                              alt={skill.name}
                              className="w-full h-full object-contain
                                         opacity-90 group-hover/logo:opacity-100
                                         transition-opacity duration-300"
                            />
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-600 group-hover/logo:text-zinc-400
                                         transition-colors duration-300 font-medium">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
