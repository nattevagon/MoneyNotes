import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="transform-gpu will-change-transform"
      style={{ transform: "translateZ(0)" }}
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -70, opacity: 0 }}
      transition={{
        x: {
          duration: 0.22,
          ease: [0.25, 1, 0.5, 1]
        },
        opacity: {
          duration: 0.08
        }
      }}
    >
      {children}
    </motion.div>
  );
}