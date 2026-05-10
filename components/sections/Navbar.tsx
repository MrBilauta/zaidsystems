"use client";

import { motion } from "framer-motion";
import { Terminal, User, Code2, Cpu, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "#home", icon: Terminal },
  { name: "About", href: "#about", icon: User },
  { name: "Tech", href: "#tech", icon: Code2 },
  { name: "Systems", href: "#architecture", icon: Cpu },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full p-2 transition-all duration-300 ${
          scrolled ? "glass shadow-xl shadow-black/20" : "bg-transparent"
        }`}
      >
        {navItems.map((item) => {
          const isActive = active === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
