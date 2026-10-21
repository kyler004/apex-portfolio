import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShaderBackground from "./cinematic/ShaderBackground";

interface HeroProps {
  /** Becomes true once the preloader curtain has lifted. */
  ready: boolean;
}

const ease = [0.76, 0, 0.24, 1] as const;

/** One line of headline text, revealed upward from behind a mask. */
const MaskLine: React.FC<{
  children: React.ReactNode;
  delay: number;
  ready: boolean;
  className?: string;
}> = ({ children, delay, ready, className = "" }) => (
  <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
    <motion.span
      initial={{ y: "110%", rotate: 2 }}
      animate={ready ? { y: 0, rotate: 0 } : undefined}
      transition={{ duration: 1.2, delay, ease }}
      className={`block origin-left ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

const Hero: React.FC<HeroProps> = ({ ready }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Slow push-in on the backdrop, content drifts up and fades as you leave.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const barH = useTransform(scrollYProgress, [0, 0.5], ["7vh", "0vh"]);

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-170 overflow-hidden flex flex-col justify-center"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <ShaderBackground />
      </motion.div>

      {/* Letterbox bars slide away as the film "opens up" */}
      <motion.div
        style={{ height: barH }}
        className="absolute top-0 inset-x-0 bg-black z-20 pointer-events-none"
      />
      <motion.div
        style={{ height: barH }}
        className="absolute bottom-0 inset-x-0 bg-black z-20 pointer-events-none"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-xs md:text-sm uppercase tracking-[0.5em] text-accent mb-8"
        >
          Creative Studio — Est. 2026
        </motion.p>

        <h1 className="font-display font-light text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] text-slate-50">
          <MaskLine delay={0.3} ready={ready}>
            We make
          </MaskLine>
          <MaskLine delay={0.45} ready={ready} className="italic text-accent">
            bold experiences
          </MaskLine>
          <MaskLine delay={0.6} ready={ready}>
            worth watching.
          </MaskLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <p className="text-lg md:text-xl text-slate-300 max-w-md font-light leading-relaxed">
            A creative agency that turns ambitious ideas into digital products
            people remember.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 bg-accent text-slate-950 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors duration-500"
            >
              Start Your Project
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#work"
              className="px-8 py-4 border border-slate-600 rounded-full font-medium text-center hover:border-accent hover:text-accent transition-colors duration-500"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-[9vh] left-6 md:left-10 z-30 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-slate-400"
      >
        <span className="relative block w-px h-12 bg-slate-700 overflow-hidden">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-accent"
          />
        </span>
        Scroll
      </motion.div>
    </section>
  );
};

export default Hero;
