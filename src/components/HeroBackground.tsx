import { useRef, useEffect } from "react";

const HeroBackground = () => {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth  - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (orb1.current) orb1.current.style.transform = `translate(${cx * -50}px, ${cy * -35}px)`;
      if (orb2.current) orb2.current.style.transform = `translate(${cx *  35}px, ${cy *  50}px)`;
      if (orb3.current) orb3.current.style.transform = `translate(${cx *  25}px, ${cy * -40}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient orbs — JS parallax via refs, no CSS animation */}
      <div
        ref={orb1}
        className="absolute rounded-full blur-[120px] opacity-30"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
        }}
      />
      <div
        ref={orb2}
        className="absolute rounded-full blur-[140px] opacity-20"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #9d4edd 0%, transparent 70%)",
          bottom: "0%",
          right: "15%",
        }}
      />
      <div
        ref={orb3}
        className="absolute rounded-full blur-[160px] opacity-15"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #4cc9f0 0%, transparent 70%)",
          top: "30%",
          right: "40%",
        }}
      />

      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[
          { cx: "72%", cy: "18%", r: 1.5, delay: "0s",   dur: "6s"  },
          { cx: "85%", cy: "42%", r: 1,   delay: "1.2s", dur: "8s"  },
          { cx: "78%", cy: "68%", r: 2,   delay: "2s",   dur: "7s"  },
          { cx: "62%", cy: "30%", r: 1,   delay: "0.5s", dur: "9s"  },
          { cx: "90%", cy: "55%", r: 1.5, delay: "3s",   dur: "6.5s"},
          { cx: "68%", cy: "80%", r: 1,   delay: "1.8s", dur: "10s" },
          { cx: "55%", cy: "50%", r: 1,   delay: "4s",   dur: "7.5s"},
          { cx: "93%", cy: "20%", r: 1.5, delay: "2.5s", dur: "8.5s"},
        ].map(({ cx, cy, r, delay, dur }, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.4)">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 6 -10; -4 8; 0 0"
              dur={dur}
              begin={delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2; 0.7; 0.2"
              dur={dur}
              begin={delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default HeroBackground;
