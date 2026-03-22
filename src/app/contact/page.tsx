"use client"

import Contact from "../blog/components/contact"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0A0B] text-white selection:bg-white/10 selection:text-white relative flex flex-col items-center justify-center overflow-x-hidden">
      {/* Background Mask - Subtle Depth Only */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(24,24,27,0.4)_0%,transparent_50%)]" />

      {/* Simplified Navigation */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-3 px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Home</span>
        </Link>
      </div>

      <div className="w-full relative z-10">
        <Contact />
      </div>

      {/* Simple Footer Details */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 opacity-20 hidden lg:block">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 whitespace-nowrap">Portfolio 2026</span>
      </div>
    </main>
  )
}
