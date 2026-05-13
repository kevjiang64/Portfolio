import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TitleHeaderProps {
  title: string;
  sub?: string;
}

const TitleHeader = ({ title }: TitleHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 20,
        },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 opacity-0">
      <h2 className="font-bold md:text-5xl text-3xl text-center tracking-tight">{title}</h2>
    </div>
  );
};

export default TitleHeader;
