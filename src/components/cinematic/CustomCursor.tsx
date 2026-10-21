import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Dot + ring cursor that grows over interactive elements. Fine pointers only. */
const CustomCursor: React.FC = () => {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(
        !!(e.target as HTMLElement).closest?.("a, button, [data-cursor]"),
      );
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="fixed top-0 left-0 z-100 pointer-events-none -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="fixed top-0 left-0 z-100 pointer-events-none"
      >
        <motion.div
          animate={{ scale: active ? 1.8 : 1, opacity: active ? 0.9 : 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="-ml-5 -mt-5 w-10 h-10 rounded-full border border-accent"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;

