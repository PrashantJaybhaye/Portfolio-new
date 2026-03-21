"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface CardItem {
  title: string;
  src: string;
  slug: string;
  excerpt?: string;
}

// ── Single horizontal row card ────────────────────────────────
function ArticleRow({ card, index, hovered, setHovered }: {
  card: CardItem;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const active = hovered === index
  const dimmed = hovered !== null && !active

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="relative group"
      style={{
        opacity: dimmed ? 0.35 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      <Link href={`/blog/${card.slug}`}>
        <div
          className="relative flex flex-col sm:flex-row gap-0 overflow-hidden rounded-2xl cursor-pointer"
          style={{
            border: active
              ? "1px solid rgba(220,38,38,0.4)"
              : "1px solid rgba(255,255,255,0.06)",
            background: active
              ? "rgba(220,38,38,0.04)"
              : "rgba(255,255,255,0.02)",
            boxShadow: active ? "0 0 50px rgba(220,38,38,0.12)" : "none",
            transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* ── Image panel ── */}
          <div className="relative sm:w-[42%] aspect-[16/9] sm:aspect-auto sm:h-[240px] overflow-hidden flex-shrink-0">
            <motion.img
              src={card.src}
              alt={card.title}
              className="w-full h-full object-cover"
              animate={{ scale: active ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* dim layer */}
            <div className="absolute inset-0" style={{
              background: active
                ? "linear-gradient(135deg,rgba(220,38,38,0.25) 0%,rgba(0,0,0,0.4) 100%)"
                : "rgba(0,0,0,0.35)"
            }} />
            {/* Red vertical stripe on right edge */}
            <motion.div
              className="absolute inset-y-0 right-0 w-[3px]"
              animate={{ opacity: active ? 1 : 0 }}
              style={{ background: "linear-gradient(to bottom,transparent,#dc2626,transparent)" }}
            />
          </div>

          {/* ── Text panel ── */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 min-h-[160px]">
            <div>
              {/* Index + category row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                  style={{ color: "rgba(220,38,38,0.7)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 max-w-[40px]"
                  style={{ background: active ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.08)" }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.2)" }}>
                  Article
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-black leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.85)",
                  transition: "color 0.3s",
                }}
              >
                {card.title}
              </h2>

              {card.excerpt && (
                <p className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.25)" }}>
                  {card.excerpt}
                </p>
              )}
            </div>

            {/* Bottom row: CTA */}
            <div className="flex items-center justify-between mt-6">
              <motion.div
                animate={{
                  x: active ? 0 : -6,
                  opacity: active ? 1 : 0.4
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]"
                style={{ color: active ? "#dc2626" : "rgba(255,255,255,0.3)" }}
              >
                Read Article
                <motion.svg
                  animate={{ x: active ? 3 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.div>

              {/* Animated underline bar */}
              <motion.div
                animate={{ width: active ? "48px" : "20px" }}
                className="h-[2px] rounded-full"
                style={{ background: active ? "#dc2626" : "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Feed list ────────────────────────────────────────────────
export const FocusCards = ({ cards }: { cards: CardItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-4 w-full">
      {cards.map((card, i) => (
        <ArticleRow
          key={card.slug || i}
          card={card}
          index={i}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}

// Re-export Card alias for focus-cards internal use (not used externally)
export const Card = ArticleRow
