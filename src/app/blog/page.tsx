"use client"
import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "./components/Card"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── Snowfall ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()

    const pts = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      sx: (Math.random() - 0.5) * 0.35,
      sy: Math.random() * 0.55 + 0.2,
      o: Math.random() * 0.45 + 0.1,
    }))

    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x += p.sx; p.y += p.sy
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">

      {/* ── Canvas: snowfall ── */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* ── Ambient layers ── */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        {/* Fine grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize: "64px 64px"
        }} />
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%,transparent 30%,rgba(0,0,0,0.75) 100%)" }} />
        {/* Top-center red/orange bloom */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px]" style={{
          background: "radial-gradient(circle,rgba(220,38,38,0.22) 0%,rgba(234,88,12,0.08) 50%,transparent 70%)",
          filter: "blur(50px)"
        }} />
      </div>

      {/* ───────────────────────── CONTENT ───────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Nav ── */}
        <nav className="flex items-center justify-between px-6 sm:px-12 pt-6 pb-2">
          <Image src="/blog4.png" alt="Logo" width={140} height={140} loading="eager" className="opacity-80 hover:opacity-100 transition-opacity duration-300" />

          {/* Centre pill */}
          <div className="hidden sm:flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35">The Archive</span>
          </div>

          {/* Spacer — keeps logo + pill balanced */}
          <div className="w-[140px]" />
        </nav>

        {/* ── Corner Home badge — mirrors homepage Blog button, top-right ── */}
        <Link href="/" className="absolute top-0 right-0 z-50">
          <button className="bg-red-600 hover:bg-red-700 text-white px-14 py-5 rounded-full text-lg font-semibold transition-colors duration-300 transform hover:scale-100 absolute top-[calc(0%+0.8rem)] right-[calc(0%-1rem)] h-2 w-20 flex items-center justify-center">
            Home<span>&nbsp;</span>
          </button>
        </Link>

        {/* ── Hero ── */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-10 pb-14">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10" style={{ background: "linear-gradient(to right,transparent,rgba(220,38,38,0.7))" }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500/70">Knowledge Feed</span>
            <div className="h-px w-10" style={{ background: "linear-gradient(to left,transparent,rgba(220,38,38,0.7))" }} />
          </motion.div>

          {/* Masthead */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.85] tracking-[-0.04em] select-none mb-5"
            style={{ fontSize: "clamp(5.5rem, 20vw, 14rem)" }}
          >
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: "linear-gradient(170deg, #ffffff 0%, #e0e0e0 35%, #888 75%, #333 100%)"
            }}>
              BLOGS
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-64 h-px mb-7"
            style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.8),transparent)" }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base font-semibold tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Random Bits of Knowledge
          </motion.p>
        </section>

        {/* ── Divider strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex items-center gap-4 px-6 sm:px-12 mb-8"
        >
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/15">All Entries</span>
          <div className="h-px flex-1 bg-white/5" />
        </motion.div>

        {/* ── Blog Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-24"
        >
          {/* Glassy frame */}
          <div className="relative rounded-4xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.5)"
            }}
          >
            {/* top scan line */}
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.6),transparent)" }} />
            {/* bottom scan line */}
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.2),transparent)" }} />
            {/* Corner markers */}
            {[["top-4 left-4"], ["top-4 right-4"], ["bottom-4 left-4"], ["bottom-4 right-4"]].map(([pos], i) => (
              <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
                style={{ background: i < 2 ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.12)" }} />
            ))}

            <div className="p-6 sm:p-8 lg:p-10">
              <Card />
            </div>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <footer className="pb-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.08)" }}>
            © {new Date().getFullYear()} · All Rights Reserved
          </p>
        </footer>

      </div>
    </div>
  )
}
