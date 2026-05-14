import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";
import { projects } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="work" className="section-padding" ref={containerRef}>
      <div className="flex flex-col gap-16">
        <TitleHeader title="Coding Projects" sub="What I've Built" />

        <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card group opacity-0 glass-card overflow-hidden
                         flex flex-col md:flex-row gap-0
                         border border-white/[0.07] hover:border-indigo-500/30
                         transition-[border-color,box-shadow] duration-500"
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width  - 0.5;
                const y = (e.clientY - rect.top)  / rect.height - 0.5;
                e.currentTarget.style.transform =
                  `perspective(1100px) rotateX(${-y * 3.5}deg) rotateY(${x * 3.5}deg) translateZ(4px)`;
                e.currentTarget.style.transition = "transform 0.08s ease-out";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
                e.currentTarget.style.transition = "transform 0.55s ease-out";
              }}
            >
              {/* Screenshot or placeholder */}
              <div className="md:w-[45%] overflow-hidden flex-shrink-0 bg-white/[0.03] relative">
                {/* Live badge */}
                {project.liveUrl && (
                  <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5
                                   px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
                                   bg-green-500/15 border border-green-500/40 text-green-300 backdrop-blur-sm">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                      <span className="relative rounded-full w-1.5 h-1.5 bg-green-400" />
                    </span>
                    Live
                  </span>
                )}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="w-full h-52 md:h-full object-cover
                               group-hover:scale-[1.03] transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-52 md:h-full flex items-center justify-center relative overflow-hidden">
                    {/* Gradient orb */}
                    <div
                      className="absolute w-56 h-56 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle, #6366f1 0%, #9d4edd 100%)" }}
                    />
                    {/* Monogram */}
                    <span className="relative text-4xl font-bold tracking-tight bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent select-none">
                      {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8 flex-1">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                    {project.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{project.summary}</p>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full
                                 bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links — proper buttons with clear primary/secondary hierarchy */}
                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                                 bg-indigo-600 hover:bg-indigo-500
                                 text-white text-sm font-semibold
                                 active:scale-[0.97] transition-all duration-200"
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <ExternalLinkIcon />
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                                 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08]
                                 hover:border-white/30 text-zinc-300 hover:text-white
                                 text-sm font-semibold
                                 active:scale-[0.97] transition-all duration-200"
                      aria-label={`GitHub repository of ${project.title}`}
                    >
                      <GitHubIcon />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
