import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RevealOptions extends gsap.TweenVars {
  from?: gsap.TweenVars;
}

/**
 * Attaches a ScrollTrigger-driven reveal animation to every element
 * matching `selector`. Each element fades and translates up into view.
 */
export function useReveal(selector: string, options: RevealOptions = {}) {
  const { from, ...tweenVars } = options;

  useGSAP(() => {
    gsap.utils.toArray<Element>(selector).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28, ...from },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
          ...tweenVars,
        }
      );
    });
  });
}
