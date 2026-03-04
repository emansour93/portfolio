"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    ["COLLECTIONS", "/collections"],
    ["IN JPK", "/in-jpk"],
    ["PRESS", "/press"],
    ["ABOUT", "/about"],
    ["CONTACT", "/contact"],
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 text-white bg-black/40 backdrop-blur">
        {/* Left: Burger always visible */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="z-50"
        >
          <Menu size={24} />
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 w-48 h-16 z-50">
          <Link href="/" className="relative block w-full h-full">
            <Image
              src="/images/logo/logo.png"
              alt="Couture dress by Jean Pierre Khoury"
              fill
              priority
              sizes="192px"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right: WhatsApp icon */}
        <a
          href="https://wa.me/+96171033111"
          target="_blank"
          aria-label="WhatsApp"
          className="z-50"
        >
          <MessageCircle size={22} />
        </a>
      </nav>

      {/* OVERLAY */}
      <motion.div
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{
          opacity: open ? 0.6 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black"
        onClick={() => setOpen(false)}
      />

      {/* SLIDE MENU */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-50 h-full w-72 bg-black text-white"
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <span className="tracking-widest text-sm">MENU</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Menu items with stagger */}
        <nav className="flex flex-col gap-6 px-6 mt-10 text-sm tracking-widest">
          {menuItems.map(([label, href], i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="hover:opacity-60 transition"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
