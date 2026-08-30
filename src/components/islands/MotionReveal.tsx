import { motion, useReducedMotion } from "motion/react";

export default function MotionReveal() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const settle = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.85, ease: [0.2, 0, 0, 1] as const };

  return (
    <div className="md-motion-reveal" aria-hidden="true">
      <motion.span
        className="md-motion-reveal__halo md-motion-reveal__halo--a"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 0.68, scale: 1 }}
        transition={settle}
      />
      <motion.span
        className="md-motion-reveal__halo md-motion-reveal__halo--b"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 20, y: -12 }}
        animate={{ opacity: 0.46, x: 0, y: 0 }}
        transition={{ ...settle, delay: shouldReduceMotion ? 0 : 0.12 }}
      />
      <motion.span
        className="md-motion-reveal__trace"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.35 }}
        animate={{ opacity: 0.72, scaleX: 1 }}
        transition={{ ...settle, delay: shouldReduceMotion ? 0 : 0.18 }}
      />
    </div>
  );
}
