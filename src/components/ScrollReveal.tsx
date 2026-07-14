"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "w-full" | "w-auto";
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  margin?: string;
}

export default function ScrollReveal({ 
  children, 
  width = "w-full",
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  margin = "-50px"
}: ScrollRevealProps) {
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      variants={direction === "none" ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: margin as any }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`${width} ${className}`}
    >
      {children}
    </motion.div>
  );
}
