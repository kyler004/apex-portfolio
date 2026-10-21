import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";

/** Inertial scrolling (Lenis) driven by framer-motion's frame loop. */
const SmoothScroll: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    const update = ({ timestamp }: { timestamp: number }) =>
      lenis.raf(timestamp);
    frame.update(update, true);

    // Route in-page anchor links through Lenis so they glide.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = a?.getAttribute("href");
      if (!a || !hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40, duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;

