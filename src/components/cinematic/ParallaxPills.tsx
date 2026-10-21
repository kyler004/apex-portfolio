import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface Pill {
  label: string;
  /** Position inside the field, in percent. */
  x: number;
  y: number;
  /** Parallax depth: higher drifts further and feels closer. */
  depth: number;
  /** Filled accent pill instead of outlined. */
  accent?: boolean;
}

const PillItem: React.FC<{
  pill: Pill;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
}> = ({ pill, index, px, py }) => {
  // px/py are the cursor offset from the field centre in -1..1.
  const range = 46 * pill.depth;
  const x = useTransform(px, (v) => v * -range);
  const y = useTransform(py, (v) => v * -range);

  return (
    <motion.div
      style={{ left: `${pill.x}%`, top: `${pill.y}%`, x, y }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      {/* entrance: bounce in. idle: slow bob so it feels alive without a cursor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 12,
          delay: index * 0.07,
        }}
      >
        <motion.span
          animate={{ y: [0, -6 * pill.depth - 2, 0] }}
          transition={{
            duration: 4 + (index % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          whileHover={{ scale: 1.12, rotate: index % 2 ? 3 : -3 }}
          data-cursor
          className={`block whitespace-nowrap rounded-full border px-5 py-2.5 text-sm md:text-base tracking-wide backdrop-blur-md ${
            pill.accent
              ? "bg-accent border-accent text-slate-950 font-medium"
              : "bg-slate-900/60 border-slate-700 text-slate-200"
          }`}
          style={{ scale: 0.85 + pill.depth * 0.25 }}
        >
          {pill.label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

/** Bouncy labelled pills that drift against the cursor at different depths. */
const ParallaxPills: React.FC<{ pills: Pill[]; className?: string }> = ({
  pills,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 14, mass: 0.6 });
  const py = useSpring(my, { stiffness: 90, damping: 14, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const leave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [mx, my]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {pills.map((pill, i) => (
        <PillItem key={pill.label} pill={pill} index={i} px={px} py={py} />
      ))}
    </div>
  );
};

export default ParallaxPills;

