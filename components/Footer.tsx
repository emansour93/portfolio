// components/Footer.tsx
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-black text-white text-center py-6 px-4"
    >
      <p className="text-sm tracking-widest">
        © JPK Jean Pierre Khoury. Developed by Elias G Mansour.
      </p>
    </motion.footer>
  );
}
