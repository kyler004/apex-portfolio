import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PreloaderProps {
  onDone: () => void;
}

/** Title-card counter followed by a curtain lift that reveals the hero. */
const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduced ? 300 : 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-in-out so the counter lingers at the ends like a film leader
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("lenis-stopped");
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.classList.remove("lenis-stopped");
        onDone();
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-95 bg-slate-950 flex flex-col justify-between p-6 md:p-10"
        >
          <div className="flex justify-between text-xs tracking-[0.4em] uppercase text-slate-400">
            <span>APEX Studio</span>
            <span>Reel 2026</span>
          </div>

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="text-xs uppercase text-accent mb-6"
            >
              A creative agency presents
            </motion.p>
            <h1 className="font-display font-light text-6xl md:text-8xl text-slate-50">
              APEX<span className="text-accent">.</span>
            </h1>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-7xl md:text-9xl font-light tabular-nums leading-none text-slate-100">
              {String(count).padStart(3, "0")}
            </span>
            <div className="w-40 md:w-64 h-px bg-slate-700 overflow-hidden mb-3">
              <div
                className="h-full bg-accent"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

