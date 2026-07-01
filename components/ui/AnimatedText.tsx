"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsTyping(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, isTyping]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block h-[1em] w-[2px] bg-primary"
      />
    </span>
  );
}
